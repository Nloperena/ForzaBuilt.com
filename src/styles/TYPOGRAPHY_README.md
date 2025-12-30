# Centralized Typography System

All heading font sizes are now managed from a single location: `src/styles/typography.ts`

## Usage

### In React Components

```typescript
import { getFontSize, getFontSizeValue } from '@/styles/typography';

// For inline styles (returns { fontSize: 'clamp(...)' })
<h1 style={getFontSize('hero')}>Hero Title</h1>

// For style objects (returns just the string value)
<h2 style={{ fontSize: getFontSizeValue('sectionHeading'), color: 'blue' }}>
  Section Title
</h2>
```

### Available Font Size Types

- `hero` - Main homepage hero heading (Mobile: 24px, Desktop: 56px)
- `sectionHeading` - Standard section titles (Mobile: 22px, Desktop: 44px)
- `industriesHeading` - Industries We Serve section (Mobile: 32px, Desktop: 44px)
- `pageHeading` - Page-level titles (Mobile: 20px, Desktop: 40px)
- `subsectionHeading` - Smaller section titles (Mobile: 24px, Desktop: 32px)
- `industryPageHeading` - Industry-specific page titles (Mobile: 22px, Desktop: 44px)
- `bannerText` - Large display text (Mobile: 18px, Desktop: 64px)

## Changing Font Sizes Globally

To change font sizes across the entire site, edit `src/styles/typography.ts`:

```typescript
export const typography = {
  hero: {
    fontSize: 'clamp(1.5rem, 2.5vw + 0.5rem, 3.5rem)', // Edit this value
  },
  sectionHeading: {
    fontSize: 'clamp(22px, 2vw + 0.5rem, 44px)', // Edit this value
  },
  // ... etc
};
```

## CSS Custom Properties

Font sizes are also available as CSS custom properties in `src/styles/globalStyles.css`:

```css
:root {
  --forza-font-size-hero: clamp(1.5rem, 2.5vw + 0.5rem, 3.5rem);
  --forza-font-size-section-heading: clamp(22px, 2vw + 0.5rem, 44px);
  /* ... etc */
}
```

Use in CSS:
```css
.my-heading {
  font-size: var(--forza-font-size-section-heading);
}
```

## Migration Guide

### Before
```typescript
<h1 style={{ fontSize: 'clamp(28px, 2.5vw + 0.5rem, 56px)' }}>
  Title
</h1>
```

### After
```typescript
import { getFontSize } from '@/styles/typography';

<h1 style={getFontSize('sectionHeading')}>
  Title
</h1>
```

## Benefits

1. **Single Source of Truth** - All font sizes defined in one place
2. **Easy Global Updates** - Change one value to update everywhere
3. **Type Safety** - TypeScript ensures correct usage
4. **Consistency** - Prevents font size inconsistencies across components
5. **Maintainability** - Easy to find and update typography values

