# Design Inspiration: Muradov.design Analysis

This document outlines key design elements, color palettes, typography, and component styles extracted from the analysis of `https://www.muradov.design/` to serve as inspiration for the Plutus website.

## 1. Overall Aesthetic & Feel

* **Theme:** Predominantly dark theme[cite: 18].
* **Style:** Modern, clean, professional, with high-quality visual presentation[cite: 2].
* **Interactivity:** Subtle transitions, scroll-triggered animations, and interactive elements like sliders[cite: 5, 10, 47, 55].

## 2. Color Palette

The site utilizes a sophisticated dark theme palette with carefully chosen accent colors.

* **Primary Background:** Black (e.g., `rgba(0, 0, 0, 1)` for body[cite: 18], `var(--main--black)` [cite: 5]).
* **Primary Text & Light Elements:** White / Off-white (e.g., `var(--main--white)`[cite: 5], `#f8f7f4` [cite: 5] often used with transparency).
* **Key Accent Colors:**
    * Blues: `rgb(88, 47, 205)` (defined as `var(--main--palatinate-blue)` [cite: 5]), `#007aff`[cite: 5], `#0082f3`[cite: 5].
    * Vibrant Green/Yellow: `#c3fb5e`[cite: 5].
* **Supporting Colors:**
    * Various grays and semi-transparent whites/blacks for text, borders, and layered backgrounds (e.g., `rgba(248, 247, 244, 0.15)` for borders/backgrounds[cite: 30, 31, 34, 35], `rgba(248, 247, 244, 0.6)` for text [cite: 30, 38]).
    * CSS variables are used extensively for colors (e.g., `var(--secondary--white-10)`, `var(--secondary--white-5)`)[cite: 5, 6].

## 3. Typography

* **Main Body Font:** `Telegraf, sans-serif`[cite: 5, 18].
* **Caption/Mono Font:** `Fraktion Mono, sans-serif` (used for class `.caption-m`, often uppercase)[cite: 5, 9, 38].
* Consider these as primary fonts for Plutus, with appropriate fallbacks.

## 4. Key UI Component Styles

### Buttons (`.button` styling from logs [cite: 6, 7, 8])

* **Shape:** Very rounded, pill-shaped (`border-radius: 34.1333rem`).
* **Background:** Light, semi-transparent (`var(--secondary--white-5)`).
* **Hover Background:** Slightly less transparent light (`var(--secondary--white-10)`).
* **Text Color:** White (`var(--main--white)`).
* **Border:** `1px solid var(--secondary--white-10)`.
* **Layout:** `display: flex`, `justify-content: center`, `align-items: center`.
* **Padding:** Approx. `0.625rem 3rem`.
* **Transition:** `background-color 0.2s`.

### Cards (Portfolio, About, Services)

* **General Card Features:** Rounded corners (e.g., `1rem` or `16.4375px` for portfolio cards[cite: 10, 26], `20.5469px` for about/services cards [cite: 31, 35]), often use `display: flex`.
* **Portfolio Cards (`.card--portfolio` [cite: 10, 25, 26]):**
    * Background: Dark (`var(--main--black)` or `rgba(0, 0, 0, 1)`).
    * `overflow: hidden`.
* **About/Services Cards (`.card--home--about`, `.card--home--services` [cite: 29, 30, 31, 34, 35]):**
    * Background: Layered, semi-transparent gradients (e.g., `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), linear-gradient(rgba(248,247,244,0.15), rgba(248,247,244,0.15))`).
    * Border: Thin, light, semi-transparent (e.g., `1px solid rgba(248, 247, 244, 0.15)`).
    * Text Color: Light, semi-transparent (e.g., `rgba(248, 247, 244, 0.6)`).

## 5. Layout Principles

* **Section-based design:** Clear thematic sections (Hero, Work, About, Services identified)[cite: 13].
* **Sticky Elements:** Some sections or wrappers appear to use `position: sticky` for scroll effects (e.g., footer, portfolio wrap)[cite: 36, 41].
* **Hero Section Layout:** Flexbox used to align content towards the bottom (`justify-content: flex-end`)[cite: 22].
* Consider use of CSS Grid where appropriate (implied by `.grid-item` class usage [cite: 12, 16, 24, 26]).

## 6. Animations & Interactions

* **Keyframe Animations:** `spin`, `splide-loading`, `swiper-preloader-spin` (likely for loaders/sliders, may not be directly needed for Plutus unless sliders are used)[cite: 5].
* **CSS Transitions:** Used for hover effects on buttons (background color) and cards (opacity)[cite: 8, 10].
* **Scroll-Triggered Animations:**
    * Hero text changes y-position and fades/slides out[cite: 51, 53, 54, 55].
    * 'About' and 'Services' cards are initially not visible, suggesting they animate in on scroll[cite: 49].

This document should serve as a reference for AI when generating UI components and styling for the Plutus website. Refer to specific screenshots from the `muradov_design` analysis for visual context.