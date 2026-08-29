#!/usr/bin/env node
const fs = require("fs")
const path = require("path")

const root = path.resolve(process.argv[2] || process.cwd())
const jsonMode = process.argv.includes("--json")
const issues = []
const add = (severity, file, line, rule, message, fix) => issues.push({ severity, file: path.relative(root, file).replace(/\\/g, "/"), line, rule, message, fix })
const lineOf = (text, index) => text.slice(0, index).split(/\r?\n/).length

function walk(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (["node_modules", ".git", "docs", ".skill-build"].includes(entry.name)) return []
    const full = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(full) : [full]
  })
}

function luminance(hex) {
  let value = hex.replace("#", "")
  if (value.length === 3) value = value.split("").map((c) => c + c).join("")
  const rgb = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16) / 255).map((v) => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4))
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

function auditWxss(file, text) {
  for (const match of text.matchAll(/url\(\s*['"]?\/?images\//g)) add("P0", file, lineOf(text, match.index), "wxss-local-image", "WXSS cannot reliably load a local Mini Program image.", "Render the asset with an <image> node or embed a small base64 resource.")
  for (const match of text.matchAll(/font-size\s*:\s*(\d+)rpx/g)) if (Number(match[1]) < 20) add("P1", file, lineOf(text, match.index), "tiny-text", `Font size ${match[1]}rpx is below the readable helper-text floor.`, "Use at least 20–24rpx for helper text and 26–32rpx for body copy.")
  for (const match of text.matchAll(/(?:width|max-width)\s*:\s*(7\d\d|[89]\d\d|\d{4,})rpx/g)) add("P1", file, lineOf(text, match.index), "fixed-wide", `Fixed width ${match[1]}rpx may overflow narrow devices.`, "Use width:100%, max-width, flex/grid, or calc() with page padding.")
  for (const match of text.matchAll(/((?:button|btn|action|tab|link)[^{,]*)\{([^{}]*)\}/gi)) {
    if (/(?:icon|img|image)/i.test(match[1])) continue
    const height = match[2].match(/(?:min-)?height\s*:\s*(\d+)rpx/)
    if (height && Number(height[1]) < 80) add("P1", file, lineOf(text, match.index), "touch-target", `Interactive selector has a ${height[1]}rpx height.`, "Raise the hit area to at least 80rpx, preferably 88rpx.")
  }
  for (const match of text.matchAll(/([^{}]+)\{([^{}]+)\}/g)) {
    const fg = match[2].match(/(?:^|;)\s*color\s*:\s*(#[0-9a-f]{3,6})\b/i)
    const bg = match[2].match(/background(?:-color)?\s*:\s*(#[0-9a-f]{3,6})\b/i)
    if (fg && bg) {
      const ratio = contrast(fg[1], bg[1])
      if (ratio < 4.5) add("P1", file, lineOf(text, match.index), "contrast", `Foreground ${fg[1]} on ${bg[1]} is approximately ${ratio.toFixed(2)}:1.`, "Choose tokens that reach 4.5:1 for normal text or prove this is large/non-text content meeting 3:1.")
    }
  }
}

function auditWxml(file, text) {
  for (const match of text.matchAll(/<image\b([^>]*)>/g)) {
    if (!/\bmode=/.test(match[1])) add("P2", file, lineOf(text, match.index), "image-mode", "Image has no explicit rendering mode.", "Set aspectFit for complete artwork or aspectFill for intentional crops.")
  }
  for (const match of text.matchAll(/<[^>]+\bbindtap=[^>]*>/g)) {
    if (!/\bclass=/.test(match[0])) add("P2", file, lineOf(text, match.index), "tap-affordance", "Tap target has no class for sizing and visible state review.", "Add a semantic class and verify its hit area and active/disabled appearance.")
  }
}

const files = walk(root)
for (const file of files) {
  const ext = path.extname(file)
  if (![".wxss", ".wxml"].includes(ext)) continue
  const text = fs.readFileSync(file, "utf8")
  if (ext === ".wxss") auditWxss(file, text)
  else auditWxml(file, text)
}

const severityOrder = { P0: 0, P1: 1, P2: 2 }
issues.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])
const counts = issues.reduce((all, item) => ({ ...all, [item.severity]: (all[item.severity] || 0) + 1 }), {})
if (jsonMode) console.log(JSON.stringify({ root, counts, issues }, null, 2))
else {
  const shown = process.argv.includes("--all") ? issues : issues.slice(0, 50)
  console.log(`Mini Program UI source audit: ${issues.length} issue(s) — P0 ${counts.P0 || 0}, P1 ${counts.P1 || 0}, P2 ${counts.P2 || 0}`)
  shown.forEach((item) => console.log(`\n${item.severity} ${item.rule} — ${item.file}:${item.line}\n${item.message}\nFix: ${item.fix}`))
  if (shown.length < issues.length) console.log(`\nShowing first ${shown.length}. Re-run with --all or --json for the complete report.`)
  console.log("\nSource checks are not rendered visual proof. Inspect representative devices and states before approval.")
}
process.exitCode = issues.some((item) => item.severity === "P0") ? 2 : issues.some((item) => item.severity === "P1") ? 1 : 0
