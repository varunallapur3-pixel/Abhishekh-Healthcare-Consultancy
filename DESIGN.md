---
name: Clinical Integrity
colors:
  surface: '#f6f9ff'
  surface-dim: '#c8ddf0'
  surface-bright: '#f6f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ebf5ff'
  surface-container: '#e0f0ff'
  surface-container-high: '#d6ebff'
  surface-container-highest: '#d0e5f9'
  on-surface: '#071d2c'
  on-surface-variant: '#43474d'
  inverse-surface: '#1e3241'
  inverse-on-surface: '#e6f2ff'
  outline: '#73777e'
  outline-variant: '#c3c7ce'
  surface-tint: '#46617d'
  primary: '#001b31'
  on-primary: '#ffffff'
  primary-container: '#12304a'
  on-primary-container: '#7d98b7'
  inverse-primary: '#adc9ea'
  secondary: '#006a6a'
  on-secondary: '#ffffff'
  secondary-container: '#84f1f1'
  on-secondary-container: '#006e6e'
  tertiary: '#001e1a'
  on-tertiary: '#ffffff'
  tertiary-container: '#00352e'
  on-tertiary-container: '#00a897'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cfe5ff'
  primary-fixed-dim: '#adc9ea'
  on-primary-fixed: '#001d34'
  on-primary-fixed-variant: '#2d4964'
  secondary-fixed: '#87f4f3'
  secondary-fixed-dim: '#69d7d7'
  on-secondary-fixed: '#002020'
  on-secondary-fixed-variant: '#004f50'
  tertiary-fixed: '#62fae3'
  tertiary-fixed-dim: '#3cddc7'
  on-tertiary-fixed: '#00201c'
  on-tertiary-fixed-variant: '#005047'
  background: '#f6f9ff'
  on-background: '#071d2c'
  surface-variant: '#d0e5f9'
typography:
  display:
    fontFamily: Inter
    fontSize: 3.5rem
    fontWeight: '700'
    lineHeight: 4rem
    letterSpacing: -0.025em
  display-mobile:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  title-md:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an authoritative yet human visual framework for healthcare consultancy. The aesthetic marries corporate strategic consulting with empathetic clinical clarity. The visual tone is structured, reassuring, forward-looking, and pristine.

- **Design Philosophy**: Modern Corporate Healthcare. Built upon architectural discipline, high legibility, airy compositions, and calibrated depth. Surfaces feel soft, clinical, and tactile without sterile intimidation.
- **Emotional Intent**: Radiates unwavering clinical competence, institutional trust, clarity in complex regulatory and technological landscapes, and an inviting, partner-oriented warmth.
- **Target Audience**: Hospital C-suites, healthcare network operators, biotech founders, public health administrators, and institutional investors seeking strategic navigation.

## Colors

The palette relies on deep oceanic navy grounding elements, complemented by vibrant medical teal and light aqua accents to guide visual hierarchy and interactions.

- **Primary (`#12304A`)**: Authoritative deep maritime navy. Governs major headlines, primary callouts, executive brand markers, and foundational navigation bars.
- **Secondary (`#159A9A`)**: Clinical teal. Powers primary interactive surfaces, successful conversion paths, data highlights, and strategic callouts.
- **Tertiary / Accent (`#2DD4BF`)**: Luminous aqua. Applied sparingly to metrics, status chips, focused states, and interactive accents. Its lighter variant (`#E0F7F6`) serves as the base for active badges, alerts, and subtle pill fills.
- **Neutral (`#5A6E7F`)**: Balanced slate grey. Anchors secondary copy, subtle borders, and structural metadata without high-contrast visual vibration.
- **Base Canvas**: Pristine Pure White (`#FFFFFF`) paired with Soft Clinical Grey (`#F5F8FA`) for canvas segmentation, card backings, and dashboard modules.

## Typography

The typographic system utilizes **Inter** across all structural tiers to deliver maximum typographic clarity, clinical exactness, and international compliance.

- **Headlines**: Weighted at Semi-Bold (600) and Bold (700) with slight negative tracking to produce tight, commanding editorial anchors.
- **Body Copy**: Set with open line heights (`1.5` to `1.65`) for effortless scanning of dense analytical, regulatory, and healthcare briefs.
- **Labels & Overlines**: Use medium to semi-bold weights with subtle positive letter spacing (`0.01em` to `0.04em`) to establish crisp metadata, status indicators, and form affordances.

## Layout & Spacing

A structured 12-column responsive fluid grid governs page architecture across devices, balancing high information density with open, executive-level breathing room.

- **Desktop (1200px+)**: 12 columns with `1.5rem` gutters and outer canvas margins of `3rem` (max-width bounded at `1360px`).
- **Tablet (768px - 1199px)**: 8 columns with `1.25rem` gutters and `2rem` outer margins. Multi-column cards collapse to 2-up configurations.
- **Mobile (< 768px)**: 4 columns with `1rem` gutters and `1.25rem` outer margins. Content groups stack sequentially with uniform vertical rhythms (`space-lg`).
- **Spatial Rhythm**: All layout offsets and component spacing conform strictly to an 8pt architectural rhythm, utilizing the defined spacing tokens for gaps, card padding, and contextual groupings.

## Elevation & Depth

Visual hierarchy uses a refined combination of soft multi-stop ambient shadows and delicate container borders, avoiding stark drop-shadows to preserve a clinical, modern touch.

- **Level 0 (Flat)**: Background `#FFFFFF` or `#F5F8FA` with a subtle boundary border (`1px solid rgba(18, 48, 74, 0.08)`).
- **Level 1 (Card & Module Default)**: `box-shadow: 0 2px 8px -2px rgba(18, 48, 74, 0.04), 0 8px 16px -4px rgba(18, 48, 74, 0.06);` along with a crisp hairline border (`rgba(18, 48, 74, 0.06)`).
- **Level 2 (Hover / Elevated Cards)**: `box-shadow: 0 8px 24px -4px rgba(18, 48, 74, 0.08), 0 16px 32px -8px rgba(18, 48, 74, 0.06);` with a translateY(-2px) transition.
- **Level 3 (Modals & Flyouts)**: `box-shadow: 0 16px 40px -8px rgba(18, 48, 74, 0.14), 0 24px 48px -12px rgba(18, 48, 74, 0.08);`.

## Shapes

The design system adopts **Level 2 (Rounded)** shape geometry. Surfaces emphasize a balance of professional architecture and human empathy through distinct radiuses:

- **Base Radius (`0.5rem` / `8px`)**: Applied to buttons, form fields, table containers, and interactive controls.
- **Large Radius (`1rem` / `16px`)**: Applied to analytical cards, strategic service pods, callout banners, and modal containers.
- **Extra Large Radius (`1.5rem` / `24px`)**: Applied to hero panels, full-section feature cards, and visual callouts.
- **Pill (`9999px`)**: Reserved exclusively for status chips, tags, and category indicators.

## Components

- **Buttons**:
  - *Primary*: Background `#159A9A`, text `#FFFFFF`, radius `0.5rem`, horizontal padding `1.5rem`, vertical padding `0.75rem`. Hover state deepens to `#0E7777`.
  - *Secondary / Corporate*: Background `#12304A`, text `#FFFFFF`. Hover state lightens to `#1B4265`.
  - *Outline*: 1.5px border in `#12304A`, background transparent, text `#12304A`. Hover shifts background to `#F5F8FA`.
  - *Subtle*: Background `#E0F7F6`, text `#159A9A`, hover background `#CCF0EE`.

- **Cards**:
  - Constructed using `#FFFFFF` fill on `#F5F8FA` surfaces (or `#F5F8FA` fill on pure white canvases).
  - Encased in a `1px` border of `rgba(18, 48, 74, 0.06)` with `rounded-lg` (`1rem`) geometry.
  - Padding defaults to `space-lg` (`1.5rem`) on mobile and `space-xl` (`2rem`) on desktop.
  - Hover states subtly elevate using Level 2 elevation and border transition to `#159A9A` at `25%` opacity.

- **Chips & Status Indicators**:
  - Compact height (`28px`), `rounded-full` (`9999px`), `0.75rem` lateral padding.
  - Active/Positive chips: `#E0F7F6` surface with `#0E7777` label.
  - Neutral chips: `#F5F8FA` surface, `1px` border `rgba(18, 48, 74, 0.1)`, with `#12304A` label.

- **Input Fields**:
  - Border: `1.5px solid rgba(18, 48, 74, 0.16)`, background `#FFFFFF`, text `#12304A`, radius `0.5rem`.
  - Focus state: Border transitions to `#159A9A` with an ambient ring: `0 0 0 3px rgba(21, 154, 154, 0.15)`.

- **Checkboxes & Radios**:
  - `1.25rem` square/circle, `1.5px` border `#5A6E7F`.
  - Checked state: Filled with `#159A9A` featuring a pure white glyph, accompanied by an animated scale transform.

- **Executive KPI & Metric Tiles**:
  - Specialized components for consultative outcomes: prominent bold metric (`display-mobile` size in `#12304A`), paired with a top-aligned secondary teal trend badge and a short clinical descriptor (`body-sm` in `#5A6E7F`).