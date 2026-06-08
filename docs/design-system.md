# NimbleJudge Design System

## Identity

NimbleJudge is dark-first, precise, fast, and professional. The interface should feel like a focused developer cockpit rather than a marketing toy: dense where it helps, calm where users need to think, and polished enough to impress engineers immediately.

## Color System

| Token | Hex | Usage |
| --- | --- | --- |
| `ink-950` | `#07090d` | App background |
| `ink-900` | `#0b0f14` | Panels and editor background |
| `ink-850` | `#10151d` | Raised surfaces |
| `ink-800` | `#151b24` | Controls and secondary panels |
| `mint-300` | `#76f7d1` | Primary accent, success, focus |
| `mint-400` | `#35dfb5` | Primary actions |
| `amberline-300` | `#ffd36f` | Warnings, contest energy |
| `amberline-400` | `#ffb84d` | Highlights and rankings |
| `coral-400` | `#ff7676` | Errors, danger, failed verdicts |
| `white/72` | `rgba(255,255,255,.72)` | Body text |
| `white/46` | `rgba(255,255,255,.46)` | Muted metadata |

Use glassmorphism only for high-value product panels, previews, and compact repeated cards. Avoid turning every page section into a floating card.

## Typography

- Primary: Inter
- Monospace: JetBrains Mono
- H1: 56-72px, semibold, tight line height
- Section titles: 36-48px, semibold
- Panel titles: 18-24px, semibold
- Body: 16-18px, relaxed line height
- Metadata: 12-14px, normal letter spacing

No negative letter spacing. Avoid viewport-scaled font sizes.

## Spacing

Base unit: 4px.

| Token | Size | Usage |
| --- | --- | --- |
| `2` | 8px | Small gaps |
| `3` | 12px | Inline controls |
| `4` | 16px | Card padding on mobile |
| `5` | 20px | Compact panel padding |
| `6` | 24px | Standard card padding |
| `8` | 32px | Section content gap |
| `12` | 48px | Major grid gap |
| `24` | 96px | Section vertical rhythm |

## Buttons

- Radius: 6px
- Height: 36, 44, 48px
- Primary: white background, ink text, mint hover
- Secondary: translucent panel, white border, mint hover border
- Ghost: transparent, muted text, subtle hover fill
- Use icons for commands: run, submit, save, download, settings, reset, copy.

## Cards And Panels

- Radius: 6px
- Border: `white/10`
- Background: `white/[0.045]` or `ink-850`
- Elevated panels may use blur and soft shadows.
- Cards are for repeated items and framed tools only.

## Animation

- Page entrance: opacity + 16-24px vertical movement
- Duration: 180-700ms depending on surface size
- Easing: `easeOut`
- Hover: border/background/color changes under 200ms
- Avoid animation that moves code, scoreboards, or editor text while users are reading.

## Icons

Use Lucide icons. Icons should be 16px for toolbar controls, 20px for feature cards, and 24px only when a section needs emphasis. Every unfamiliar icon-only button needs a tooltip in production.

## Accessibility

- Preserve keyboard focus rings with mint accent.
- Keep contrast above WCAG AA for text.
- Never rely on color alone for verdicts.
- Use stable dimensions for scoreboards, editor panes, and problem grids.
- Mobile layouts should reduce columns before reducing text size.
