import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Prevent custom element redefinition errors
if (typeof window !== 'undefined') {
  // Suppress custom element errors from browser extensions
  const originalDefine = window.customElements?.define;
  if (originalDefine) {
    window.customElements.define = function(name, constructor, options) {
      if (!window.customElements.get(name)) {
        return originalDefine.call(this, name, constructor, options);
      }
      return;
    };
  }
}

createRoot(document.getElementById("root")!).render(<App />);
