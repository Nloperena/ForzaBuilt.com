# ForzaBuilt.com

A modern, interactive website for Forza Built showcasing their innovative adhesive solutions for transportation, marine, construction, industrial, foam, composites, and insulation industries.

## Features

- **X-Ray Scroll Effects**: Interactive scroll-driven reveal animations with hover functionality
- **Interactive Building Map**: SVG-based product selection with modal popups and scroll-driven highlighting
- **Industry-Specific Pages**: Dynamic pages for each industry with custom content and product grids
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Built with React, TypeScript, and shadcn/ui components
- **Smooth Animations**: Framer Motion powered transitions and effects
- **Product Showcase**: Featured products sections with external links to product pages

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Package Manager**: npm/bun
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Nloperena/ForzaBuilt.com.git
cd ForzaBuilt.com/Website rebuild
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
│   ├── industries/     # Industry-specific pages
│   └── products/       # Product category pages
├── data/               # Static data and content
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── contexts/           # React contexts
├── lib/                # Utility functions
└── assets/             # Images and static assets
```

## Key Components


- **InteractiveBuildingMap**: SVG-based interactive product selection with hover and scroll functionality
- **ApplicationsModal**: Product information modal system
- **ServiceCardStack**: Stackable service cards with scroll animations
- **ProductChemistriesSection**: Dynamic product chemistry showcase
- **Header/Footer**: Consistent navigation and branding

## Pages

- **Home**: Main landing page with hero sections and service overview
- **Industries**: Industry overview with interactive cards
- **Industry Pages**: Dynamic pages for each industry (Marine, Construction, Industrial, etc.)
- **Products**: Product category pages
- **About**: Company information
- **Contact**: Contact form and information

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
- Kallisto font for branding

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
