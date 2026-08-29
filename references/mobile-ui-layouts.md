# Mobile UI layout system

Read this reference before redesigning a Mini Program page. It defines layout decisions, not a decorative visual template. Reference galleries are taste evidence only; never reproduce a screen's exact structure, copy, imagery, or component arrangement.

## Start with the page job

Write one sentence: “This screen helps the user ___.” Select one archetype below. A screen may have secondary functions, but only one primary job controls the first viewport.

### Today or dashboard

Use for a home page, daily overview, plan summary, or money summary.

1. Compact context row: date, mode, or account—not a decorative hero.
2. One dominant current-state block: today's records, today's plan progress, or this month's balance.
3. One primary action next to or immediately below the state.
4. Frequent destinations as a short list or restrained grid.
5. Recent content before settings, education, slogans, or illustration.

Do not place a large welcome card above the actual state. Do not give four equal modules the same visual weight.

### Feed or history

Use for records, notes, bills, memories, or messages.

1. Compact mode/filter controls.
2. Primary create action visible without covering content.
3. Chronological content with one repeated row grammar.
4. Date and metadata quieter than title/content.
5. Empty state occupies the content region without increasing header height.

Prefer a vertical reading rhythm. Use a two-column grid only for image collections or very short, symmetric choices.

### Form or editor

Use for adding a record, plan, note, or bill.

1. Short context/title row with a clear close or back action.
2. Main input first and visually largest.
3. Supporting choices grouped below in the order users need them.
4. Image selection shows visible thumbnails and removal state.
5. Cancel and save stay reachable above the safe area and keyboard.

Do not scatter fields into independent decorative cards. Use spacing and short dividers to express groups.

### Calendar plus day detail

1. Month/year controls in one compact toolbar.
2. Seven-column calendar grid with stable cell height.
3. Mark recorded/completed dates with a small ink dot or ring, not decorative stickers.
4. Selected-day details follow immediately below the grid.
5. Future dates are visibly disabled when business rules prohibit future entry.

The calendar remains the dominant object; illustrations stay outside the grid.

### Profile and settings

1. One compact identity row.
2. Grouped text rows with consistent leading marks and trailing values/arrows.
3. Destructive or account actions separated at the end.

Do not turn every menu item into a floating card. Do not use decorative profile art larger than the identity information.

### Empty or onboarding

1. One small line illustration.
2. One plain-language explanation.
3. One primary next action.

Keep the group within the content region. An empty state must not look like a promotional poster.

## Mobile grid and spacing

- Page horizontal inset: usually `24–32rpx`; use one value consistently per journey.
- Baseline spacing: multiples of `8rpx`; common gaps are `8`, `16`, `24`, `32`, `40`, and `48rpx`.
- Section gap must be larger than item gap. A useful pattern is `16rpx` within a group and `40rpx` between groups.
- Align title, body, list rows, and primary actions to one left edge whenever possible.
- Use no more than two corner radii in one page family: a small control radius and a modest panel radius.
- Limit simultaneous container styles. Prefer one panel treatment plus one plain list treatment.
- Avoid fixed-height containers for user text, records, notes, captions, and image collections.

## Hierarchy rules

- One dominant heading level per viewport. Other headings are smaller or quieter, not equally bold.
- One primary button per decision area. Secondary actions use text or outline treatment.
- Real data is visually stronger than helper copy, illustration, labels, and decorative English captions.
- Use borders selectively. A page where every region has a full outline feels fragmented and fails this system.
- Use whitespace to group content before adding cards, fills, or dividers.
- Avoid repeating the same meaning as icon, title, subtitle, badge, and arrow. Keep only what aids recognition or action.

## Responsive rules

- At `320px`, reduce columns before reducing readable type or touch size.
- Two-column functional cards require enough width for icon, title, and helper copy. Otherwise switch to one-column rows.
- Test maximum Chinese copy, three-digit counts, long dates, and enlarged system text.
- Bottom sheets and fixed actions include `env(safe-area-inset-bottom)` and remain usable with the keyboard open.

## Layout rejection gate

Reject and redesign when any statement is true:

- The first viewport is mostly welcome copy, illustration, or empty paper.
- Three or more modules compete as equal focal points.
- Every section is boxed, shadowed, or rounded.
- A two-column layout forces truncated Chinese labels or tiny helper text.
- The primary action is separated from the content it changes.
- Decorative English labels outnumber useful state labels.
- The page looks balanced only when populated with ideal short demo data.
- Removing the cat artwork improves clarity or reveals broken spacing.

After implementation, inspect the page without artwork, with artwork, with empty data, and with dense data. Approve the illustrated version only when usability remains equal or better.
