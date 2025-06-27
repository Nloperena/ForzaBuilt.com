
/**
 * TypeScript interfaces for ServiceCard component and related data structures
 * 
 * These interfaces define the shape of data that can be passed to the ServiceCardStack
 * component, making it type-safe and ready for CMS integration.
 */

// Individual project option for renovation cards
export interface ProjectOption {
  name: string;        // Display name of the project type
  location: string;    // Geographic location where project is available
  price: string;       // Price range as a display string
  duration: string;    // Expected completion timeframe
  flag: string;        // Emoji or icon representing the project type
}

// Main service card data structure
export interface ServiceCardData {
  id: string;                    // Unique identifier for the card
  title: string;                 // Main title displayed on the card
  icon: string;                  // Emoji or icon for the service
  features: string[];            // Array of key features/benefits
  buttonText: string;            // Text for the call-to-action button
  
  // Optional fields for construction management cards
  technologies?: string[];       // Array of technology names (AutoCAD, Revit, etc.)
  supportedTech?: string[];      // Array of supported technologies/tools
  specialties?: string[];        // Array of specialty areas
  
  // Optional fields for architectural design cards
  model?: string;                // Design model name
  modelDesc?: string;            // Description of the design model
  storyPrompt?: string;          // Prompt text for user interaction
  storyText?: string;            // Descriptive story text about the design
  
  // Optional fields for renovation cards
  projectOptions?: ProjectOption[]; // Array of available project types
}

// Props interface for the ServiceCardStack component
export interface ServiceCardStackProps {
  cards?: ServiceCardData[];     // Optional array of card data
  className?: string;            // Optional CSS classes for styling
}

// Props interface for individual ServiceCard component
export interface ServiceCardProps {
  card: ServiceCardData;         // Card data to display
  transform: string;             // CSS transform string for animations
  opacity: number;               // Opacity value for fade effects
}
