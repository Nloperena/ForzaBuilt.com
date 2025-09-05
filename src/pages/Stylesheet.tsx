import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Stylesheet = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-16">
        <div className="forza-container">
          <h1 className="forza-hero-heading text-4xl md:text-6xl mb-8">ForzaBuilt Stylesheet</h1>
          <p className="forza-text-body text-lg mb-12">
            This page serves as a reference for all reusable components and styles used throughout the ForzaBuilt website.
            Edit the styles in <code className="bg-gray-200 px-2 py-1 rounded">src/styles/globalStyles.css</code> to update all components.
          </p>

          {/* Typography Section */}
          <section className="forza-section mb-16">
            <h2 className="forza-section-heading text-3xl md:text-5xl mb-8">Typography</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="forza-card p-6">
                <h3 className="forza-text-subhead text-xl mb-4">Headings</h3>
                <div className="space-y-4">
                  <h1 className="forza-hero-heading text-4xl">Hero Heading</h1>
                  <h2 className="forza-section-heading text-3xl">Section Heading</h2>
                  <h3 className="forza-page-heading text-2xl">Page Heading</h3>
                  <h4 className="forza-product-heading text-xl">Product Heading</h4>
                </div>
              </div>
              
              <div className="forza-card p-6">
                <h3 className="forza-text-subhead text-xl mb-4">Body Text</h3>
                <div className="space-y-4">
                  <p className="forza-text-body">
                    This is body text using the Poppins font family. It's designed for optimal readability 
                    with a line height of 1.6 and regular font weight.
                  </p>
                  <p className="forza-text-subhead">
                    This is subhead text using Poppins with bold font weight and tighter line height.
                  </p>
                  <p className="forza-text-caption">
                    This is caption text for smaller, secondary information.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Buttons Section */}
          <section className="forza-section mb-16">
            <h2 className="forza-section-heading text-3xl md:text-5xl mb-8">Buttons</h2>
            
            <div className="forza-card p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="forza-text-subhead text-lg mb-4">Primary Button</h3>
                  <button className="forza-primary-button">
                    Primary Action
                  </button>
                </div>
                
                <div>
                  <h3 className="forza-text-subhead text-lg mb-4">Secondary Button</h3>
                  <button className="forza-secondary-button">
                    Secondary Action
                  </button>
                </div>
                
                <div>
                  <h3 className="forza-text-subhead text-lg mb-4">Ghost Button</h3>
                  <button className="forza-ghost-button">
                    Ghost Action
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Cards Section */}
          <section className="forza-section mb-16">
            <h2 className="forza-section-heading text-3xl md:text-5xl mb-8">Cards</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="forza-card p-6">
                <h3 className="forza-text-subhead text-xl mb-4">Light Card</h3>
                <p className="forza-text-body">
                  This is a light card with white background and subtle shadow. 
                  It includes hover effects and smooth transitions.
                </p>
              </div>
              
              <div className="forza-card-dark p-6">
                <h3 className="forza-text-subhead text-xl mb-4">Dark Card</h3>
                <p className="forza-text-body">
                  This is a dark card with blue background and enhanced shadow. 
                  Perfect for highlighting important content.
                </p>
              </div>
            </div>
          </section>

          {/* Badges Section */}
          <section className="forza-section mb-16">
            <h2 className="forza-section-heading text-3xl md:text-5xl mb-8">Badges</h2>
            
            <div className="forza-card p-6">
              <div className="flex flex-wrap gap-4">
                <span className="forza-badge-primary">Primary Badge</span>
                <span className="forza-badge-secondary">Secondary Badge</span>
                <span className="forza-badge-outline">Outline Badge</span>
              </div>
            </div>
          </section>

          {/* Sections Section */}
          <section className="forza-section mb-16">
            <h2 className="forza-section-heading text-3xl md:text-5xl mb-8">Sections</h2>
            
            <div className="space-y-8">
              <div className="forza-section bg-white rounded-lg p-6">
                <h3 className="forza-text-subhead text-xl mb-4">Default Section</h3>
                <p className="forza-text-body">
                  Standard section with white background and proper padding.
                </p>
              </div>
              
              <div className="forza-section-dark rounded-lg p-6">
                <h3 className="forza-text-subhead text-xl mb-4">Dark Section</h3>
                <p className="forza-text-body">
                  Dark section with blue background for contrast.
                </p>
              </div>
              
              <div className="forza-section-gradient rounded-lg p-6">
                <h3 className="forza-text-subhead text-xl mb-4">Gradient Section</h3>
                <p className="forza-text-body">
                  Gradient section with blue to orange background.
                </p>
              </div>
            </div>
          </section>

          {/* Containers Section */}
          <section className="forza-section mb-16">
            <h2 className="forza-section-heading text-3xl md:text-5xl mb-8">Containers</h2>
            
            <div className="space-y-8">
              <div className="forza-container bg-white rounded-lg p-6 border">
                <h3 className="forza-text-subhead text-xl mb-4">Standard Container (1200px)</h3>
                <p className="forza-text-body">
                  Standard container with max-width of 1200px and centered layout.
                </p>
              </div>
              
              <div className="forza-container-wide bg-white rounded-lg p-6 border">
                <h3 className="forza-text-subhead text-xl mb-4">Wide Container (1400px)</h3>
                <p className="forza-text-body">
                  Wide container with max-width of 1400px for more spacious layouts.
                </p>
              </div>
              
              <div className="forza-container-xl bg-white rounded-lg p-6 border">
                <h3 className="forza-text-subhead text-xl mb-4">XL Container (1600px)</h3>
                <p className="forza-text-body">
                  Extra large container with max-width of 1600px for large displays.
                </p>
              </div>
              
              <div className="forza-container-2xl bg-white rounded-lg p-6 border">
                <h3 className="forza-text-subhead text-xl mb-4">2XL Container (2000px)</h3>
                <p className="forza-text-body">
                  Maximum width container with 2000px for the largest displays.
                </p>
              </div>
            </div>
          </section>

          {/* Animations Section */}
          <section className="forza-section mb-16">
            <h2 className="forza-section-heading text-3xl md:text-5xl mb-8">Animations</h2>
            
            <div className="forza-card p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="forza-fade-in bg-blue-100 p-4 rounded">
                  <h3 className="forza-text-subhead text-lg mb-2">Fade In</h3>
                  <p className="forza-text-body text-sm">Smooth fade in animation</p>
                </div>
                
                <div className="forza-slide-up bg-green-100 p-4 rounded">
                  <h3 className="forza-text-subhead text-lg mb-2">Slide Up</h3>
                  <p className="forza-text-body text-sm">Slide up from below</p>
                </div>
                
                <div className="forza-scale-in bg-orange-100 p-4 rounded">
                  <h3 className="forza-text-subhead text-lg mb-2">Scale In</h3>
                  <p className="forza-text-body text-sm">Scale in from center</p>
                </div>
              </div>
            </div>
          </section>

                     {/* Brand Compliant Utilities Section */}
           <section className="forza-section mb-16">
             <h2 className="forza-section-heading text-3xl md:text-5xl mb-8">Brand Compliant Utilities</h2>
             
             <div className="forza-card p-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div>
                   <h3 className="forza-text-subhead text-xl mb-4">Industry Colors</h3>
                   <div className="space-y-2">
                     <div className="flex items-center gap-3">
                       <div className="w-6 h-6 bg-[#f16a26] rounded"></div>
                       <code className="forza-text-caption">.forza-industrial-bg</code>
                     </div>
                     <div className="flex items-center gap-3">
                       <div className="w-6 h-6 bg-[#137875] rounded"></div>
                       <code className="forza-text-caption">.forza-marine-bg</code>
                     </div>
                     <div className="flex items-center gap-3">
                       <div className="w-6 h-6 bg-[#b83d35] rounded"></div>
                       <code className="forza-text-caption">.forza-transportation-bg</code>
                     </div>
                     <div className="flex items-center gap-3">
                       <div className="w-6 h-6 bg-[#d0157d] rounded"></div>
                       <code className="forza-text-caption">.forza-insulation-bg</code>
                     </div>
                     <div className="flex items-center gap-3">
                       <div className="w-6 h-6 bg-[#fec770] rounded"></div>
                       <code className="forza-text-caption">.forza-construction-bg</code>
                     </div>
                     <div className="flex items-center gap-3">
                       <div className="w-6 h-6 bg-[#c7c8c9] rounded"></div>
                       <code className="forza-text-caption">.forza-composites-bg</code>
                     </div>
                   </div>
                 </div>
                 
                 <div>
                   <h3 className="forza-text-subhead text-xl mb-4">Product Colors</h3>
                   <div className="space-y-2">
                     <div className="flex items-center gap-3">
                       <div className="w-6 h-6 bg-[#F16022] rounded"></div>
                       <code className="forza-text-caption">.forza-bond-bg</code>
                     </div>
                     <div className="flex items-center gap-3">
                       <div className="w-6 h-6 bg-[#ffd600] rounded"></div>
                       <code className="forza-text-caption">.forza-seal-bg</code>
                     </div>
                     <div className="flex items-center gap-3">
                       <div className="w-6 h-6 bg-[#e53935] rounded"></div>
                       <code className="forza-text-caption">.forza-tape-bg</code>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </section>

           {/* CSS Variables Section */}
           <section className="forza-section mb-16">
             <h2 className="forza-section-heading text-3xl md:text-5xl mb-8">CSS Variables</h2>
            
            <div className="forza-card p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="forza-text-subhead text-xl mb-4">Colors</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-[#115B87] rounded"></div>
                      <code className="forza-text-caption">--forza-regal-blue: #115B87</code>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-[#F16022] rounded"></div>
                      <code className="forza-text-caption">--forza-blaze-orange: #F16022</code>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-[#115B87] rounded"></div>
                      <code className="forza-text-caption">--forza-blue-velvet: #115B87</code>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-[#D35127] rounded"></div>
                      <code className="forza-text-caption">--forza-rusty-nail: #D35127</code>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="forza-text-subhead text-xl mb-4">Typography</h3>
                  <div className="space-y-2">
                    <div><code className="forza-text-caption">--forza-font-heading: 'Kallisto', sans-serif</code></div>
                    <div><code className="forza-text-caption">--forza-font-body: 'Poppins', sans-serif</code></div>
                    <div><code className="forza-text-caption">--forza-weight-heavy: 900</code></div>
                    <div><code className="forza-text-caption">--forza-weight-bold: 700</code></div>
                    <div><code className="forza-text-caption">--forza-weight-regular: 400</code></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Usage Instructions */}
          <section className="forza-section mb-16">
            <h2 className="forza-section-heading text-3xl md:text-5xl mb-8">Usage Instructions</h2>
            
            <div className="forza-card p-6">
              <h3 className="forza-text-subhead text-xl mb-4">How to Use These Styles</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="forza-text-subhead text-lg mb-2">1. Import the Stylesheet</h4>
                  <p className="forza-text-body">
                    Add <code className="bg-gray-200 px-2 py-1 rounded">import '@/styles/globalStyles.css'</code> to your main App component.
                  </p>
                </div>
                
                <div>
                  <h4 className="forza-text-subhead text-lg mb-2">2. Apply Classes</h4>
                  <p className="forza-text-body">
                    Use the CSS classes directly in your JSX: <code className="bg-gray-200 px-2 py-1 rounded">className="forza-hero-heading"</code>
                  </p>
                </div>
                
                <div>
                  <h4 className="forza-text-subhead text-lg mb-2">3. Customize</h4>
                  <p className="forza-text-body">
                    Edit the CSS variables in <code className="bg-gray-200 px-2 py-1 rounded">globalStyles.css</code> to update all components at once.
                  </p>
                </div>
                
                <div>
                  <h4 className="forza-text-subhead text-lg mb-2">4. Extend</h4>
                  <p className="forza-text-body">
                    Add new styles to the stylesheet and reference this page for consistency.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Stylesheet;
