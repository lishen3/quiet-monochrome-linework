# Quiet Monochrome Linework

一个用于设计、实现和检查微信小程序 UI 的 Codex Skill。它以暖纸色、黑色线条、克制留白和统一的小猫图形语言为基础，同时把页面的主要任务、信息层级和移动端可用性放在装饰之前。

## 项目解决什么问题

黑白手绘风格的小程序容易出现两个问题：视觉元素彼此不统一，或为了氛围牺牲首屏内容、文字可读性和触控体验。本项目提供一套可复用的设计约束、页面布局选择方法和检查流程，帮助 Codex 在保留现有业务行为的前提下完成风格一致、内容优先的微信小程序界面。

它不是组件库，也不会独立运行或替代微信开发者工具。它是一组供 Codex 使用的技能说明、参考规范和一个零依赖的静态审计脚本。

## 主要功能

- 规定暖纸色与黑、灰为主的视觉系统、排版、线条、留白和原创性边界。
- 按页面主要任务选择首页、历史列表、表单、日历、设置和空状态等移动端布局。
- 指导微信小程序 WXML、WXSS 与交互实现，包括字号、触控尺寸、图片、键盘和安全区处理。
- 提供统一的小猫线稿与小图标规则，覆盖功能图标、情绪、空状态和标签栏资源。
- 支持根据需求编写可直接用于图像生成的黑白线稿提示词。
- 使用 `scripts/audit_miniprogram_ui.js` 检查部分常见问题，包括本地图片的 WXSS 引用、过小字号、固定宽度、触控尺寸、对比度、图片模式和缺少样式类的点击目标。
- 要求在静态检查后继续进行真机尺寸或模拟器渲染检查，避免把源码检查误当成视觉验证。

## 安装方法

### Codex

将仓库克隆到 Codex 的技能目录：

```powershell
git clone https://github.com/lishen3/quiet-monochrome-linework.git "$HOME\.codex\skills\quiet-monochrome-linework"
```

macOS 或 Linux：

```bash
git clone https://github.com/lishen3/quiet-monochrome-linework.git "${CODEX_HOME:-$HOME/.codex}/skills/quiet-monochrome-linework"
```

重新启动 Codex 或开启新任务，使技能目录被重新发现。

静态审计脚本需要 Node.js，除此之外项目没有运行时依赖。完整的视觉检查仍需要能够打开小程序的微信开发者工具、模拟器或真实截图。

## 使用方法

在请求中显式引用技能，并给出项目目录、目标页面、主要任务和需要保留的交互。例如：

```text
Use $quiet-monochrome-linework to redesign the record editor in this WeChat Mini Program.
Keep the existing save behavior, make the text input the first-viewport focus,
and verify the result at compact and mainstream phone sizes.
```

仅运行静态审计：

```bash
node scripts/audit_miniprogram_ui.js ./my-miniprogram
node scripts/audit_miniprogram_ui.js ./my-miniprogram --all
node scripts/audit_miniprogram_ui.js ./my-miniprogram --json
```

审计脚本在发现 P0 问题时返回退出码 `2`，发现 P1 问题时返回 `1`，只有 P2 或没有问题时返回 `0`。审计结果只是线索，最终仍应检查实际渲染页面。

## 输入输出示例

### 示例一：界面改造

输入：

```text
使用 $quiet-monochrome-linework 调整记账日历。保留按日期查看明细的功能，
让日历成为首屏主体，收入显示为“+”，支出显示为“-”，整体采用黑白线条风。
```

输出通常包括：

- 对目标页面及相邻页面、全局样式和交互处理的检查；
- 与现有项目结构匹配的 WXML、WXSS 或 JavaScript 修改；
- 静态审计结果，以及实际检查过的页面尺寸和状态；
- 无法使用模拟器或截图时明确标注未完成的视觉验证。

### 示例二：静态审计

输入：

```bash
node scripts/audit_miniprogram_ui.js ./my-miniprogram --json
```

输出示例：

```json
{
  "root": "<resolved-project-root>",
  "counts": {
    "P1": 1
  },
  "issues": [
    {
      "severity": "P1",
      "file": "pages/example/example.wxss",
      "line": 12,
      "rule": "tiny-text",
      "message": "Font size 18rpx is below the readable helper-text floor.",
      "fix": "Use at least 20–24rpx for helper text and 26–32rpx for body copy."
    }
  ]
}
```

具体文件名、行号和问题数量取决于被检查的小程序项目。

## 项目结构

```text
quiet-monochrome-linework/
├── SKILL.md
├── agents/openai.yaml
├── references/
│   ├── cat-linework-ui.md
│   ├── mini-program-ui-qa.md
│   └── mobile-ui-layouts.md
└── scripts/audit_miniprogram_ui.js
```

## 许可证

本项目使用 [MIT License](LICENSE)。
