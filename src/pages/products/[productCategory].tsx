import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '@/data/products';
import Footer from '@/components/Footer';
import ProductChemistriesSection from '@/components/ProductChemistriesSection';
import { Button } from '@/components/ui/button';

const ProductCategoryPage = () => {
  const { productCategory } = useParams();
  const productData = products.find(
    (prod) => prod.name.toLowerCase().replace(/\s+/g, '-') === productCategory
  );

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  React.useEffect(() => {
    if (expandedIndex === null) return;
    const handleClick = (e: MouseEvent) => {
      const card = document.getElementById(`product-card-${expandedIndex}`);
      if (card && !card.contains(e.target as Node)) {
        setExpandedIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [expandedIndex]);

  if (!productData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1b3764] text-white">
        <h1 className="text-4xl font-extrabold mb-4 font-kallisto">Product Not Found</h1>
        <p className="text-lg">Sorry, we couldn't find the product you're looking for.</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#1b3764] min-h-screen flex flex-col">
      {/* Hero Banner */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-[#1b3764]">
        <img
          key={productData.image}
          src={productData.image}
          alt={productData.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      {/* Title Overlap Container */}
      <div
        className="relative z-20 flex justify-center"
        style={{ marginTop: '-2.5rem' }} // Pull up to overlap
      >
        <div
          className="w-full px-10 py-4 bg-white shadow-lg text-center relative"
        >
          <h1 className="text-8xl md:text-10xl font-extrabold text-[#1b3764] drop-shadow-sm font-kallisto">
            {productData.name.toUpperCase()}
          </h1>
        </div>
      </div>

      {/* About Section (adapted for product details) */}
      <section className="py-20 bg-white text-[#1b3764] flex-1">
        <div className="w-full px-4 max-w-[1600px] mx-auto">
          {/* Product Description */}
          <h3 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-12 text-center leading-tight font-kallisto text-[#1b3764]">{productData.name} Details</h3>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg text-[#1b3764] max-w-none">
              <p className="text-2xl mb-4 leading-relaxed">{productData.description}</p>
              <p className="text-2xl mb-4 leading-relaxed">More detailed information about {productData.name} can go here, or specific features and benefits.</p>
              <a href={productData.link} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block">
                <Button className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-8 py-4 text-xl">
                  Visit {productData.name} Page
                </Button>
              </a>
            </div>

            <div className="relative">
              <img
                src={productData.image}
                alt={`${productData.name} image`}
                className="w-full h-auto rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Chemistries/Products Section (keeping as is for now) */}
      <section className="py-20 bg-[#1b3764] text-white">
        <div className="w-full px-4 max-w-[2000px] mx-auto">
          <ProductChemistriesSection />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductCategoryPage; 