# ForzaBuilt.com

A modern, interactive website for Forza Built showcasing their innovative adhesive solutions for transportation, marine, construction, industrial, foam, composites, and insulation industries.

## Features

- **X-Ray Scroll Effects**: Interactive scroll-driven reveal animations
- **Interactive Building Map**: Clickable SVG overlay with product selection modals
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Built with React, TypeScript, and shadcn/ui components
- **Smooth Animations**: Framer Motion powered transitions and effects

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Package Manager**: npm/bun

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ForzaBuilt.com.git
cd ForzaBuilt.com
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
bun dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── cards/          # Card components
│   └── ...             # Other components
├── pages/              # Page components
├── data/               # Static data and content
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── contexts/           # React contexts
├── lib/                # Utility functions
└── assets/             # Images and static assets
```

## Key Components

- **XRayWipe**: Main scroll-driven X-Ray effect component
- **InteractiveBuildingMap**: SVG-based interactive product selection
- **ApplicationsModal**: Product information modal system
- **ServiceCardStack**: Stackable service cards with animations

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

This project uses:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

## Deployment

The project can be deployed to any static hosting service:

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is proprietary to Forza Built.
