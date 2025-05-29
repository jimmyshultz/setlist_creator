# Setlist Sequence Brand Colors

This document outlines the brand color system for Setlist Sequence and how to use it consistently across the application.

## Brand Color Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Primary Blue** | `#0029FF` | Interactive elements, buttons, links, checkmarks |
| **Secondary Yellow** | `#F9E793` | Background accents, highlights, hover states |
| **Tertiary Brown** | `#7F4A16` | Text, borders, grounding elements |

## How to Use Brand Colors

### 1. Tailwind CSS Classes (Recommended)

The colors are defined in `tailwind.config.js` and can be used as utility classes:

```jsx
// Backgrounds
<div className="bg-brand-primary">       // Blue background
<div className="bg-brand-secondary">     // Yellow background  
<div className="bg-brand-tertiary">      // Brown background

// Text
<h1 className="text-brand-primary">      // Blue text
<p className="text-brand-secondary">     // Yellow text
<span className="text-brand-tertiary">   // Brown text

// Borders
<div className="border-brand-primary">   // Blue border
<div className="border-brand-secondary"> // Yellow border
<div className="border-brand-tertiary">  // Brown border

// With opacity (Tailwind's opacity modifier)
<p className="text-brand-tertiary/70">   // 70% opacity brown text
<div className="bg-brand-secondary/30">  // 30% opacity yellow background
```

### 2. CSS Custom Properties

Use the CSS variables defined in `src/styles/brand-colors.css`:

```css
.my-component {
  background-color: var(--brand-primary);
  color: var(--brand-tertiary);
  border: 2px solid var(--color-border);
}

/* Semantic aliases for common usage */
.interactive-button {
  background-color: var(--color-interactive);
  color: white;
}

.text-primary {
  color: var(--color-text-primary);
}

.text-secondary {
  color: var(--color-text-secondary);
}
```

### 3. JavaScript/TypeScript Constants

Import from `src/utils/colors.ts`:

```typescript
import { BRAND_COLORS, BRAND_COLORS_WITH_OPACITY } from '@/utils/colors';

// In React components
const buttonStyle = {
  backgroundColor: BRAND_COLORS.PRIMARY,
  color: 'white',
  border: `2px solid ${BRAND_COLORS.TERTIARY}`
};

// With opacity
const overlayStyle = {
  backgroundColor: BRAND_COLORS_WITH_OPACITY.SECONDARY_30
};
```

## Color Usage Guidelines

### Text Hierarchy

1. **Dark Brown** (`#7F4A16`) - Main headings, titles, important text
2. **Medium Brown** (`#7F4A16` at 70% opacity) - Body text, descriptions
3. **Light Brown** (`#7F4A16` at 60% opacity) - Secondary details, captions

### Interactive Elements

- **Blue** (`#0029FF`) - Primary buttons, links, interactive icons
- **Brown** (`#7F4A16`) - Borders, hover states for blue elements
- **Yellow** (`#F9E793`) - Background highlights, accent hover states

### Backgrounds

- **Yellow gradients** - Page backgrounds, section highlights
- **White** - Content areas, cards
- **Brown** - Footer, grounding sections

## Examples

### Button Variations
```jsx
// Primary button
<button className="bg-brand-primary text-white border-2 border-brand-tertiary">
  Get Started
</button>

// Secondary button  
<button className="border-2 border-brand-primary text-brand-primary hover:bg-brand-secondary/30">
  Learn More
</button>
```

### Text Hierarchy
```jsx
<h1 className="text-brand-tertiary">Main Heading</h1>
<p className="text-brand-tertiary/70">Body text description</p>
<small className="text-brand-tertiary/60">Additional details</small>
```

### Layout Sections
```jsx
<section className="bg-gradient-to-br from-brand-secondary/20 via-white to-brand-secondary/10">
  <div className="border border-brand-tertiary bg-white">
    Content with brown border
  </div>
</section>
```

## Files Containing Brand Colors

- `tailwind.config.js` - Tailwind utility classes
- `src/styles/brand-colors.css` - CSS custom properties
- `src/utils/colors.ts` - JavaScript/TypeScript constants
- `src/app/globals.css` - Imports brand colors CSS
- `src/app/page.tsx` - Homepage implementation example 