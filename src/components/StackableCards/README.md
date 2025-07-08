# StackableCards Component

A fully reusable, industry-agnostic component for creating scroll-based stacking card animations. This component can be used for any industry or content type with customizable themes, layouts, and styling.

## Features

- ✅ **Industry Agnostic**: Works with any industry or content type
- ✅ **Theme System**: Pre-built themes for different industries (marine, construction, automotive, aerospace)
- ✅ **Flexible Layouts**: Support for default, reversed, and centered layouts
- ✅ **Customizable**: Fully customizable styling and content
- ✅ **Scroll Animations**: Smooth scroll-based stacking animations
- ✅ **Responsive**: Fully responsive design
- ✅ **TypeScript**: Fully typed with TypeScript interfaces

## Quick Start

### Basic Usage

```tsx
import StackableCards from '@/components/StackableCards/StackableCards';
import { GenericCardData } from '@/components/StackableCards/GenericCard';

const myCards: GenericCardData[] = [
  {
    id: 'card-1',
    title: 'My Solution',
    description: 'Description of the solution',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    buttonText: 'Learn More',
    imageUrl: '/path/to/image.jpg',
    theme: 'marine',
    layout: 'default'
  }
];

function MyComponent() {
  return (
    <StackableCards
      cards={myCards}
      title="My Solutions"
      subtitle="Custom solutions for your needs"
    />
  );
}
```

### Industry-Specific Usage

```tsx
import { MarineStackableCards } from '@/components/StackableCards/IndustryStackableCards';

function MarinePage() {
  const handleCardClick = (cardId: string) => {
    console.log('Card clicked:', cardId);
  };

  return (
    <MarineStackableCards onCardClick={handleCardClick} />
  );
}
```

## Card Data Structure

```tsx
interface GenericCardData {
  id: string;                    // Unique identifier
  title: string;                 // Main title
  subtitle?: string;             // Optional subtitle
  description?: string;          // Optional description
  features?: string[];           // Array of features/benefits
  imageUrl?: string;             // Optional image URL
  icon?: string;                 // Optional emoji icon
  badge?: string;                // Optional badge text
  buttonText?: string;           // CTA button text
  buttonLink?: string;           // CTA button link
  layout?: 'default' | 'reversed' | 'centered';
  theme?: 'marine' | 'construction' | 'automotive' | 'aerospace' | 'custom';
  customStyles?: {
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
  };
}
```

## Available Themes

### Marine Theme
- **Colors**: Blue to teal gradient
- **Accent**: Orange
- **Use Case**: Marine industry solutions

### Transportation Theme
- **Colors**: Gray to slate gradient
- **Accent**: Red
- **Use Case**: Transportation industry solutions

### Construction Theme
- **Colors**: Orange to red gradient
- **Accent**: Blue
- **Use Case**: Construction industry solutions

### Industrial Theme
- **Colors**: Gray to slate gradient
- **Accent**: Red
- **Use Case**: Industrial manufacturing solutions

### Foam Theme
- **Colors**: Orange to red gradient
- **Accent**: Blue
- **Use Case**: Foam bonding solutions

### Composites Theme
- **Colors**: Indigo to purple gradient
- **Accent**: Blue
- **Use Case**: Composite material solutions

### Insulation Theme
- **Colors**: Orange to red gradient
- **Accent**: Blue
- **Use Case**: Insulation solutions

## Layout Options

### Default Layout
- Content on left, image on right
- Standard two-column layout

### Reversed Layout
- Image on left, content on right
- Good for alternating card designs

### Centered Layout
- Content and image stacked vertically
- Centered alignment
- Good for single-column designs

## Customization Examples

### Custom Theme
```tsx
const customCards: GenericCardData[] = [
  {
    id: 'custom-1',
    title: 'Custom Solution',
    theme: 'custom',
    customStyles: {
      backgroundColor: 'bg-gradient-to-br from-purple-900/20 to-pink-800/20',
      textColor: 'text-white',
      accentColor: 'bg-purple-500'
    }
  }
];
```

### Custom Background
```tsx
<StackableCards
  cards={cards}
  backgroundGradient="from-purple-600 to-pink-600"
/>
```

### Event Handling
```tsx
<StackableCards
  cards={cards}
  onCardClick={(cardId) => {
    // Handle card click
    console.log('Card clicked:', cardId);
  }}
/>
```

## Pre-built Industry Components

The component includes pre-built components for all industries in the navigation:

- `MarineStackableCards`
- `TransportationStackableCards`
- `ConstructionStackableCards`
- `IndustrialStackableCards`
- `FoamStackableCards`
- `CompositesStackableCards`
- `InsulationStackableCards`

## Navigation Integration

The StackableCards component is fully integrated with the existing navigation system:

### Dynamic Industry Cards
```tsx
import DynamicIndustryCards from '@/components/StackableCards/DynamicIndustryCards';

// Automatically detects industry from URL parameter
<DynamicIndustryCards onCardClick={(cardId) => console.log(cardId)} />
```

### Industry-Specific Components
```tsx
import { MarineStackableCards } from '@/components/StackableCards/IndustryStackableCards';

<MarineStackableCards onCardClick={(cardId) => console.log(cardId)} />
```

### URL-Based Industry Detection
The component automatically maps URL parameters to industry cards:
- `/industries/marine` → Marine cards
- `/industries/transportation` → Transportation cards
- `/industries/construction` → Construction cards
- etc.

## Data Management

### Using Pre-built Data
```tsx
import { getCardsByIndustry, getBackgroundGradientByIndustry } from '@/data/stackableCardsData';

const cards = getCardsByIndustry('marine');
const gradient = getBackgroundGradientByIndustry('marine');
```

### Creating Custom Data
```tsx
const customCards: GenericCardData[] = [
  {
    id: 'solution-1',
    title: 'Custom Solution',
    description: 'Your custom description',
    features: ['Feature 1', 'Feature 2'],
    buttonText: 'Learn More',
    buttonLink: '/custom-solution',
    imageUrl: '/custom-image.jpg',
    icon: '⚡',
    badge: 'Custom',
    theme: 'custom',
    layout: 'default'
  }
];
```

## Component Architecture

```
StackableCards/
├── GenericCard.tsx              # Individual card component
├── GenericCardStackItem.tsx     # Card wrapper with animations
├── StackableCards.tsx           # Main component
├── IndustryStackableCards.tsx   # Industry-specific wrapper
└── README.md                    # This documentation
```

## Dependencies

- React
- TypeScript
- Tailwind CSS
- Custom hooks: `useScrollCalculator`
- UI Components: `Card` from shadcn/ui

## Performance Considerations

- Cards are rendered with proper z-index stacking
- Scroll calculations are optimized
- Images are lazy-loaded by default
- Animations use CSS transforms for performance

## Browser Support

- Modern browsers with CSS Grid support
- Scroll-based animations work best on desktop
- Mobile-friendly with responsive design 