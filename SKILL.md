---
name: quiet-monochrome-linework
description: Design, implement, and visually audit WeChat Mini Program UI using an original black-and-white line-illustration system with warm paper, editorial whitespace, literary typography, hand-drawn ink texture, and a coherent cute cat motif system. Also creates matching UI artwork, tab icons, empty states, mood faces, and small functional pictograms. Use for mini-program UI design, redesign, implementation, or visual QA; do not use for photorealistic, colorful, 3D, or dense enterprise interfaces.
---

# Quiet Monochrome Linework

Design a usable WeChat Mini Program interface first, then give it an original quiet black-and-white line-art identity. Preserve the system below across screens and subjects. Visual hierarchy and the user's primary task take priority over decorative illustration.

## Fixed visual system

- Palette: warm paper `#F7F4EC`, ink black `#171717`, charcoal `#494743`, and sparing mist gray `#C9C7C1`. Keep at least 90% of the image within this palette. Do not introduce an accent color unless the user explicitly asks.
- Line: choose either loose black monoline with visible hand wobble or a flat irregular ink silhouette with white cutout details. Both should feel quick, intentional, and playful—never like polished vector logos or shaded pencil rendering.
- Tone: use white space, black/white reversal, and line density before gray. Flat black shapes are welcome in the ink-silhouette family; gradients, soft shading, and airbrushed volume are not.
- Texture: clean matte paper with extremely subtle fiber or grain. Avoid stains, heavy distress, torn-paper collages, watercolor blooms, glossy rendering, and plastic AI smoothness.
- Mood: intimate, playful, slightly odd, and gently cute. Cuteness comes from elastic body shapes, awkward gestures, round eyes, and ordinary objects—not candy color, glossy mascot polish, or infantile typography.

## Composition invariants

- Reserve roughly 60–75% of the canvas as breathing room.
- Use one clear focal subject occupying about 25–42% of the frame; two or three tiny supporting marks may create rhythm but must not compete.
- Prefer asymmetrical editorial balance: place the focal subject near a third, edge, or lower field, and let empty space actively frame it.
- Build a deliberate silhouette that remains readable at thumbnail size. Use overlaps sparingly.
- Never fill empty areas merely for decoration. Every line, caption, dot, or object must clarify subject, scale, direction, or emotion.
- Avoid centered logo-like icons, stock illustration grids, symmetric sticker sheets, busy scenes, ornamental borders, and generic poster templates unless the requested format truly requires them.

## Typography

Text is optional. If the user provides exact copy, preserve it verbatim and keep it secondary to the drawing.

- Main Chinese title: restrained high-contrast Song-style serif or an elegant bookish serif; medium weight, generous tracking, no bubbly or bold display face.
- Small Chinese note: neat pencil handwriting or quiet Kaiti-like handwriting.
- English caption: small uppercase literary serif with wide tracking.
- Use one title plus at most one caption. Align type to an implied editorial grid, usually top-left, bottom-left, or beside the focal subject.
- Never generate filler text, fake Chinese, watermarks, signatures, brand marks, or illegible decorative lettering. If text accuracy is unreliable, generate a text-free image with intentional space reserved for later typesetting.

## Mini Program UI mode

When the deliverable is UI rather than a standalone illustration:

- Before styling, classify the screen and read [references/mobile-ui-layouts.md](references/mobile-ui-layouts.md). Select one layout archetype from the screen's primary job; do not improvise a collage of unrelated cards.
- Inspect the affected page, neighboring pages, `app.json`, shared WXSS, existing assets, data states, and interaction handlers before designing.
- State the screen's single primary job. The first viewport must expose that job or its main content; do not place a decorative hero, illustration, slogan, or oversized welcome card ahead of it.
- Use line illustration as structure: navigation motif, empty state, category mark, divider, small scene, or quiet background anchor. Illustration must not reduce legibility, obscure controls, or consume the working area.
- Keep the UI mostly warm paper and ink. Use mist gray for disabled or secondary states. If state meaning requires color, use one restrained semantic accent and do not let it become a new palette.
- Reuse a small token set: spacing in `8rpx` steps where practical; body `26–32rpx`; helper text `20–24rpx`; section title `34–44rpx`; minimum interactive height `80rpx`, preferably `88rpx`; rounded corners should come from one compact scale rather than arbitrary values.
- Prefer flow layout, flex, and grid. Avoid fixed heights for content containing user text or images. Account for long Chinese copy, image lists, keyboard appearance, navigation bars, tab bars, and `env(safe-area-inset-bottom)`.
- Use `<image>` for local mini-program assets. Never load a local image from `url()` in WXSS. Specify `mode`; use `aspectFit` when the whole asset must remain visible and provide `wx.previewImage` when users need to inspect full photographs.
- Preserve the existing framework and working behavior. Do not add packages, cloud collections, or features merely to achieve the visual style.

The layout pass comes before illustration generation. First produce a readable content hierarchy with plain boxes and text. Only after the first viewport, long-copy behavior, and frequent actions work may cat artwork be added. If removing the illustrations makes the page clearer, the illustration placement failed.

For a UI build, complete the implementation instead of returning only a mockup or image prompt. Generate raster artwork only when the screen genuinely needs a new bitmap asset.

## Cat motif mode

When cats are the product's recurring visual subject, read [references/cat-linework-ui.md](references/cat-linework-ui.md). Apply it to tab icons, function entries, mood marks, empty states, note ornaments, dialog motifs, and other small UI artwork. Keep one recognizable cat construction across the product while changing only the action, prop, or expression needed to explain the function.

Do not place a cat on every available surface. Use a cat motif only when it improves recognition, warmth, state communication, or brand continuity. Real content and frequent actions remain visually dominant.

For small icons, code-native linework is the default. Generate a raster cat only when native tab bars or a richer empty-state illustration require it. Never accept a generated icon merely because it is technically valid; reject over-detailed, dark, generic, inconsistent, or target-size-illegible outputs.

Do not force every illustration into the same refined contour style. Select exactly one cat family for a screen or asset set—loose contour doodle or flat ink silhouette—and keep that family consistent across the set.

## Adapt the subject

Translate any requested theme into its simplest emotionally specific visual metaphor. Keep identifying structures and the action clear, but reduce secondary objects. For abstract themes, use an ordinary object, gesture, natural form, or small spatial relationship rather than symbols piled together.

Choose the aspect ratio from the deliverable:

- `3:4` for covers, editorial posters, and social graphics.
- `1:1` for icons, avatars, or square cards.
- `4:3` or `16:9` for UI backgrounds and scenes.
- Preserve a safe empty zone around edges and around any future UI controls.

## Originality boundary

References are evidence of high-level taste only. Extract palette restraint, line behavior, negative-space ratio, typographic mood, and compositional rhythm. Do not reproduce a reference's exact character, pose, objects, spatial arrangement, text, signature, distinctive motif, or recognizable composition. Change at least the subject interpretation, viewpoint, focal placement, object relationship, and line rhythm. Do not name or imitate a living artist in the prompt.

## Production prompt

When generating an image, build the prompt in this order:

1. Deliverable and aspect ratio.
2. Requested subject, action, and emotional beat.
3. Focal placement and negative-space plan.
4. Fixed palette, line, paper, and tonal treatment.
5. Exact text and typography only when requested.
6. Exclusions: no photorealism, 3D, saturated color, gradients, thick cartoon outlines, dense decoration, fake text, watermark, signature, or copied composition.

Use the available image-generation tool for a final bitmap. If the user asks only for a prompt or generation specification, return a production-ready prompt without generating.

## Quality gate

Quality is visual-first. A page that compiles but hides the primary content, clips copy, makes controls hard to tap, or looks inconsistent fails.

For standalone artwork, verify the original image invariants above. For Mini Program UI, read [references/mini-program-ui-qa.md](references/mini-program-ui-qa.md) and perform both layers:

1. Run `node scripts/audit_miniprogram_ui.js <project-root>` for deterministic source checks. Treat its output as leads, not proof of rendered quality.
2. Render and inspect the changed journey at representative phone sizes and states. If a simulator or screenshot is unavailable, say so and never claim visual verification from source inspection alone.

Fix in-scope failures before delivery. Stop after one clean rendered pass following the last fix; do not iterate endlessly on subjective preferences.

Report QA in this compact form:

- `PASS/FAIL` and the screen's primary job.
- Issues ordered `P0` broken, `P1` harms task or readability, `P2` polish.
- For each issue: visible symptom, file and line, measured/current value, target, and concrete code change.
- Viewports and states actually inspected, plus any unverified limitation.
