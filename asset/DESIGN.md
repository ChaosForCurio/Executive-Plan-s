# Design System Specification

## 1. Overview & Creative North Star: "The Digital Curator"

This design system is built to bridge the gap between traditional editorial craft and modern digital fluidity. It moves away from the rigid, clinical "SaaS" look in favor of a **Creative North Star we call "The Digital Curator."**

The system mimics the tactile experience of a high-end physical portfolio or a boutique literary journal. It favors intentional asymmetry, a "parchment and ink" color story, and a mix of raw, hand-drawn character with sophisticated typographic scales. The goal is to make every page feel like a bespoke composition rather than a repetitive grid. We break the "template" look by using organic edge treatments (like the hand-torn paper effect seen in the reference) and by treating typography as a primary visual element, not just a vessel for information.

---

## 2. Colors

The palette is anchored in high-contrast "Forest and Cream" tones, providing a warm, humanistic backdrop that is easier on the eyes than pure white.

### Palette Strategy
- **Background (`#fff8f2`):** The primary canvas. Use this as the base for all main content areas to establish the "parchment" feel.
- **Primary (`#00272a`) & Primary Container (`#0a3e42`):** Our signature forest greens. Use these for high-impact sections, large editorial blocks, and primary CTAs.
- **Surface Tiers:** Use `surface_container_low` through `highest` to define hierarchy.

### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders for sectioning are strictly prohibited. Boundaries must be defined through background color shifts or tonal transitions. To separate a secondary module from the main body, transition from `surface` to `surface_container_low`. 

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. An inner card (`surface_container_highest`) should sit inside a section (`surface_container_low`), which sits on the global `background`. This creates "nested" depth that feels architectural rather than flat.

### Signature Textures & Glassmorphism
- **The "Glass & Gradient" Rule:** Floating elements (like navigation bars or mobile menus) should utilize `surface` colors at 80% opacity with a `20px` backdrop-blur. 
- **Subtle Gradients:** For main CTAs, use a linear gradient from `primary` to `primary_container` at a 135-degree angle. This adds a "silk-screened" depth that flat hex codes cannot achieve.

---

## 3. Typography

The typographic soul of this system lies in the interplay between the sophisticated **Newsreader (Serif)** and the functional **Inter (Sans-Serif)**.

- **Display & Headlines (Newsreader):** These are your "Editorial" voices. They should be used with tight letter-spacing and generous line-height to feel authoritative and creative.
- **Body & Labels (Inter):** These handle the heavy lifting. They provide a modern, "Swiss" contrast to the organic serif headlines.

| Token | Font | Size | Intent |
| :--- | :--- | :--- | :--- |
| **display-lg** | Newsreader | 3.5rem | Hero statements, limited to < 10 words. |
| **headline-md** | Newsreader | 1.75rem | Section headers. |
| **title-lg** | Inter | 1.375rem | Sub-headers or strong introductory text. |
| **body-lg** | Inter | 1.0rem | Standard reading text. |
| **label-md** | Inter | 0.75rem | Captions, metadata, and small UI details. |

---

## 4. Elevation & Depth

We eschew traditional "box-shadows" in favor of **Tonal Layering**. Depth is a result of color proximity, not artificial lighting.

- **The Layering Principle:** Place a `surface_container_lowest` card on a `surface_container_low` section to create a soft lift.
- **Ambient Shadows:** If a floating element (like a modal) requires a shadow, it must be highly diffused. Use a blur of `40px-60px` with an opacity of `6%`. The shadow color should be a tinted version of `on_surface` (`#201b12`) to ensure it looks like a natural environmental reflection.
- **The "Ghost Border" Fallback:** If a container lacks sufficient contrast against its background, use the `outline_variant` token at **15% opacity**. Never use 100% opaque borders.
- **Edge Treatments:** Where possible, replicate the "torn paper" or "organic edge" found in the reference images when transitioning between high-contrast sections (e.g., Cream to Forest Green).

---

## 5. Components

### Buttons
- **Primary:** Rounded `full` (pill shape). Background: `primary` gradient; Text: `on_primary`. 
- **Secondary:** Transparent background with a "Ghost Border" (15% opacity `outline`).
- **Interaction:** On hover, primary buttons should slightly "grow" (scale 1.02) rather than just changing color.

### Input Fields
- Avoid the "boxed" look. Use a `surface_container_high` background with a bottom-only border using the `outline_variant` at 20% opacity. Labels should always use `label-md` in `secondary` color.

### Cards
- **Rule:** No dividers. 
- Separate internal content using the **Spacing Scale** (vertical white space). If content needs to be grouped within a card, use a subtle background shift to `surface_container_highest`.

### Signature Component: The "Doodle-Overlay"
To maintain the "quirky" personality of the design system, specific components (like Testimonial cards or Hero images) should feature hand-drawn SVG illustrations that "break" the container edges. These should be colored in `primary` or `surface_tint`.

---

## 6. Do's and Don'ts

### Do
- **Do** use large amounts of white space. The "Curator" style thrives on breathing room.
- **Do** lean into asymmetry. Images and text blocks should not always align to a rigid 12-column grid; offset them to create visual interest.
- **Do** use `Newsreader` for any text that carries "emotional" weight.

### Don't
- **Don't** use pure black (#000000) for body text. Use `on_surface` (`#201b12`) to maintain the warm, editorial feel.
- **Don't** use standard Material Design drop-shadows. They feel too "app-like" and ruin the parchment aesthetic.
- **Don't** use 1px solid dividers. Use a 24px or 48px gap instead.
- **Don't** use sharp corners. Always apply at least the `md` (`0.375rem`) roundedness scale to keep the UI feeling approachable.