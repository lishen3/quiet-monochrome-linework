# Cat linework for Mini Program UI

Use this reference when a Mini Program needs a coherent black-and-white cat illustration and icon family. It captures high-level visual rules only; never reproduce a reference image's exact cat, pose, prop, layout, caption, or signature.

## Choose one cat family

### A. Loose contour doodle

- Use one uneven black line with rounded turns, occasional open contours, and tiny motion ticks.
- Build cats from soft bean, pear, loaf, tube, or puddle shapes. Bodies may stretch, squash, curl, lean, or become comically long.
- Keep faces extremely small: dot eyes, a dark nose, a short mouth, two or three whiskers, and optional sparse stripe marks.
- Let pose carry the emotion: lazy stretch, belly-up roll, hunched sit, curled sleep, reaching paw, or awkward run.
- Preserve accidental charm. One ear may tilt, paws need not match, and the tail can become a single expressive curve.

### B. Flat ink silhouette

- Use an irregular pure-black body with white cutout eyes and only a few white facial or whisker marks.
- Favor large round or oval eyes, pointed ears, exaggerated tails, and strange but readable body proportions.
- Black shapes may be round, long, arched, fuzzy-edged, or compressed. Avoid anatomical realism.
- Do not add internal fur rendering or gray volume. The image reads through the outer silhouette and white cutouts.

Choose one family for an icon set, page illustration group, or character state sequence. Do not mix a filled black mascot with delicate contour cats inside one small control group.

Keep one recognizable base cat within the selected family, but allow elastic poses. Consistency comes from eye construction, ear shape, line behavior, and attitude—not rigid body proportions.

## Functional cats and small motifs

Fuse the cat with one ordinary object instead of placing unrelated stickers beside it:

- Record: cat holding or peeking over an open notebook.
- Ledger: cat beside one coin, receipt, or small abacus.
- Timer: curled cat following one circular clock or record groove.
- Plan: cat reaching toward one check mark or short list.
- Calendar: cat ears integrated into the top edge of a calendar page.
- Note: a paper rectangle whose folded corners or upper corners imply cat ears.
- Friends/message: cat face integrated with one envelope or speech bubble.
- Profile: a simple cat-face bust; do not use a human portrait as the default motif.

Use a single focal object. If the icon needs more than one prop to explain itself, simplify the concept.

Not every pictogram needs a full cat. Build a supporting motif library from simple everyday forms: star, sparkle, heart, flower, leaf, bow, cup, bowl, spoon, fork, cake, gift, camera, calendar, notebook, envelope, yarn, fish, umbrella, balloon, house, and short motion marks. Give one small cue of the cat world when useful: ears on a calendar, tail-shaped steam, paw-shaped flower center, or a cat peeking from a cup.

Motifs must look hand-drawn and slightly uneven. Avoid generic emoji symbols, perfect geometric clip art, stock outline icons, and dense decorative sticker sheets inside the working UI.

## Line and fill behavior

- Primary contour: ink black `#171717`, visually equivalent to about `2–3rpx` at normal Mini Program display scale.
- Secondary detail: `1–2rpx`, never lighter than the meaningful-stroke contrast floor.
- In loose-contour mode, prefer open contours and breathing room; use black fill only for eyes, nose, small patches, or a state badge.
- In ink-silhouette mode, large solid-black bodies are intentional. Keep edges crisp or dry-ink irregular, with white cutout eyes; never simulate volume with gradients or gray shading.
- Avoid fuzzy graphite masses, photoreal fur, drop shadows, glowing edges, airbrush shading, and faux brush calligraphy.
- Raster icons should use a transparent background. UI containers supply warm paper `#F7F4EC`; do not bake an off-white square into the icon.
- Small icons must not use graphite shading, cross-hatching, glossy eyes, or repeated contour outlines. These details turn muddy after downscaling.
- Loose contour work may include short fur, stripe, shake, or action marks, but each mark must clarify texture or motion.
- Use one confident contour pass. Handmade wobble is welcome; uncontrolled doubled edges and muddy antialiasing are not.

## Composition and sizing

- Design tab icons for recognition at `24–32px`, even if generated at a larger source size. Remove details that disappear at target size.
- Keep a `12–18%` transparent safe margin around raster icons. The silhouette should occupy roughly `62–76%` of the square.
- Inside action cards, place the cat mark at the leading edge, then the action title and helper copy. Do not center every action like a sticker gallery.
- Use two-column action cards on ordinary phone widths only when title and helper copy remain readable. Collapse to one column around `340px` or under text-enlargement pressure.
- Reserve large cat scenes for empty states or onboarding. They must not push real content or the main action below the first viewport.
- Small decorative motifs may orbit a heading or empty state, but use at most `2–4` nearby marks. A reference sheet may be dense; a working UI should not become a sticker sheet.

## Mood faces

Use one consistent cat face from the chosen family with six clearly different expressions. Distinguish them through geometry, not color:

- Happy: open or upward mouth curve, relaxed round eyes.
- Calm: short horizontal mouth, neutral eyes.
- Sad: downward mouth curve and slightly lowered ears.
- Angry: inward eye angle and compact mouth; avoid flames or red fill.
- Tired: lowered eyelids and a shallow wavering mouth.
- Hopeful: lifted eyes and a small upward mouth.

At thumbnail size, test the faces without labels. If two expressions are confused, change eye or ear geometry rather than adding decoration. Keep the text label in the actual UI for accessibility.

## Implementation choice

- Prefer WXSS-drawn line components for small repeated icons, mood faces, borders, and note ornaments when they can be expressed with stable geometry. This keeps them crisp and avoids local-resource failures.
- Use generated transparent PNGs for native tab-bar icons or richer empty-state scenes that cannot be expressed reliably in WXSS.
- Use `<image mode="aspectFit">` for line artwork. Never reference local images with `background-image: url(...)` in WXSS.
- Keep generated source assets in the project and optimize exported tab icons to a practical size. Do not leave project-referenced files only in a generator cache.

## Generation workflow for raster icons

Use this only when code-native geometry cannot serve the target:

1. Choose `loose contour doodle` or `flat ink silhouette`. Define the base cat in words: body elasticity, ear shape, eye construction, nose, whiskers, tail behavior, and line/fill rule.
2. Generate one icon at a time. Keep the prompt to one cat, one action, and at most one prop.
3. Demand transparent background and pure black/white artwork. For contour mode: no shading, no doubled outline, only sparse action marks. For silhouette mode: one flat black shape, white cutout eyes, no interior gray texture.
4. Inspect the large output for unwanted complexity, then inspect the actual exported `24–32px` preview.
5. Reject the image if recognition depends on details lost at target size. Do not try to rescue a bad silhouette by sharpening it.
6. Compare the new icon beside the existing family. Reject changes to eye construction, ear language, line/fill mode, or overall attitude. Elastic body proportion is allowed when it strengthens the action.

For a native tab icon, favor a bold-simple contour or silhouette over a miniature story scene. “Cat holding a detailed notebook” is usually too complex; “cat ears and eyes emerging from one open-page shape” is safer.

## Production prompt vocabulary

Use concrete visual language instead of vague requests such as “cute hand-drawn cat.” Include the selected family and its constraints.

Loose contour example:

> Original black-and-white cat doodle, one loose uneven monoline, elastic bean-shaped body in a lazy stretching pose, tiny dot eyes and nose, sparse whiskers and motion ticks, deliberately awkward proportions, transparent background, no shading, no gray, no text, no watermark, not vector-perfect, not mascot-logo polish.

Flat ink silhouette example:

> Original odd little black cat pictogram, one irregular flat-black silhouette with pointed ears, exaggerated long tail, two large white cutout eyes, playful off-balance pose, transparent background, pure black and white only, no fur rendering, no gradients, no text, no watermark, not a copied character or composition.

## Cat-specific quality gate

Fail or revise the result when any condition is true:

- The cat becomes an indistinct blob at `24–32px`.
- Different icons look like unrelated cat characters.
- A prop is more visually dominant than the action or cat silhouette.
- Ear, eye, whisker, or mouth details merge after downscaling.
- The icon contains a baked white square, colored pixels, fake text, a signature, or a watermark.
- Cute decoration competes with content, duplicates labels without adding recognition, or reduces a frequent tap target below `80rpx`.
- Selected and unselected states rely only on tiny facial changes; use border, fill reversal, weight, or label treatment as well.
- The output looks like generic clip art, a polished mascot logo, a glossy children's sticker, or a shaded pencil drawing instead of spontaneous ink doodling.
- A small contour icon requires more than roughly `12–18` meaningful strokes to understand; silhouette icons may use fewer but bolder shapes.
- The cat is anatomically polished, symmetrically cute, or expressionless; the target needs elastic, awkward, action-led charm.
- A dense reference-sheet composition has been copied directly into the UI instead of extracting one useful motif.

For generated assets, inspect alpha, edge cleanliness, pixel dimensions, byte size, target-size legibility, and in-page contrast before replacing the existing icon.
