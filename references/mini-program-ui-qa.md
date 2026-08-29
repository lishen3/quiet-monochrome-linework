# Mini Program visual QA

Use this checklist after implementation. Visual evidence outranks source-code confidence.

## Hard gates

Fail the page when any of these occur:

- The primary task or real content is pushed below a decorative header without product reason.
- A route, tap, modal, picker, upload, preview, scroll, or save flow is broken.
- Text, images, controls, sheets, or tab content clip, overlap, overflow, or disappear.
- Normal text contrast is below `4.5:1`, or large text and meaningful UI strokes are below `3:1`.
- A frequent control has a hit area below `80rpx`; target `88rpx` where layout permits.
- Meaning exists only in color, or disabled and active states are indistinguishable.
- Local images are referenced through WXSS `url()`, cloud file IDs are treated as relative paths, or required images have no loading/failure behavior.
- The page passes only with ideal demo copy; dense real data, long Chinese text, or an empty state breaks its hierarchy.
- Illustration determines the layout instead of fitting a content-first layout.

## Visual-first review order

1. Primary job: can a new user identify and begin it within the first viewport?
2. Content hierarchy: real data and actions before atmosphere; one dominant heading level; secondary metadata stays quiet.
3. Composition: alignment, spacing rhythm, white-space intent, density, and absence of decorative competition.
4. Typography: readable Chinese sizes, stable wrapping, line height, weight, and numeric alignment.
5. Interaction: obvious tap affordance; pressed, active, disabled, loading, success, empty, and error states.
6. Media: all selected images represented; correct crop mode; full-screen preview when detail matters; no layout jump.
7. Brand: warm paper, ink linework, restrained gray, original illustration, and consistent corner/line treatment.
8. Simplification: remove artwork temporarily and confirm the content hierarchy still works; restore only artwork that improves recognition or warmth without shifting the task.

## Representative inspection matrix

Inspect at least:

- `320×568`: narrow legacy phone and enlarged-text pressure test.
- `375×667`: common compact phone.
- `390×844`: current mainstream phone.
- `430×932`: wide/tall phone.

For each affected journey exercise relevant states:

- empty, one item, many items;
- maximum-length Chinese text and mixed Chinese/numbers;
- zero, one, and maximum image count;
- loading, network/cloud failure, success, validation error;
- modal/bottom sheet open, keyboard open, safe-area bottom;
- logged out and logged in when the route is gated;
- single and pair/user variants when the product supports both.

## Mini Program implementation checks

- Registered pages have `.js`, `.json`, `.wxml`, and `.wxss` files.
- Tab pages use `wx.switchTab`; ordinary pages use `wx.navigateTo`; tab URLs do not depend on query parameters.
- Repeated WXML nodes have stable `wx:key`; nested loops use explicit item names.
- User-generated text and images do not rely on fixed-height containers.
- `scroll-view` has a constrained scroll axis and does not trap the page unintentionally.
- Bottom actions include `env(safe-area-inset-bottom)` when fixed or sheet-based.
- Images declare dimensions and `mode`; photo collections expose `wx.previewImage`.
- Cloud images resolve to usable temporary URLs when direct `cloud://` rendering is unreliable.
- No stale routes, missing assets, replacement characters, or deleted cloud-function calls remain.

## Issue format

Use one issue per block:

```text
P1 — Primary record content begins below a decorative 330rpx hero
Evidence: 375×667 screenshot; only the hero and mode tabs are visible
Location: pages/record/record.wxml:2, record.wxss:1
Target: primary summary and quick-record actions visible in the first viewport
Fix: remove the hero node and set `.space-tabs { margin-top: 0; }`
```

When the user asked for implementation, make the fix and rerun the affected checks. When they asked only for an audit, report findings without editing.
