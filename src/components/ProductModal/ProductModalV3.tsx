/**
 * ProductModalV3 - Clean rebuild with proper animation orchestration
 * 
 * Animation Flow:
 * 1. Modal opens: backdrop fades in, panel slides in from right
 * 2. Modal closes: backdrop fades out, panel slides out to right
 * 3. No popping or flickering - smooth transitions
 */

import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { useGradientMode } from '@/contexts/GradientModeContext';
import type { Product } from '@/types/products';

// ============================================================================
// TYPES
// ============================================================================

interface ProductModalV3Props {
  isOpen: boolean;
  products: Product[];
  selectedProduct: Product | null;
  onProductSelect: (product: Product) => void;
  onClose: () => void;
  categorySlug: string;
}

// ============================================================================
// FULLSCREEN IMAGE COMPONENT
// ============================================================================

interface FullscreenImageProps {
  imageUrl: string;
  productName: string;
  zoom: number;
  canZoomIn: boolean;
  canZoomOut: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onClose: () => void;
}

const FullscreenImage = memo<FullscreenImageProps>(({
  imageUrl,
  productName,
  zoom,
  canZoomIn,
  canZoomOut,
  onZoomIn,
  onZoomOut,
  onClose,
}) => (
  <div
    className="fixed inset-0 z-[102] bg-black/90 flex items-center justify-center"
    onClick={onClose}
  >
    <button
      onClick={onClose}
      className="absolute top-4 right-4 z-[103] text-white hover:text-white/70 transition-colors p-2 hover:bg-white/10 rounded-lg"
      aria-label="Close fullscreen"
    >
      <X className="w-6 h-6" />
    </button>

    <div
      className="flex items-center justify-center h-full w-full max-w-6xl mx-auto px-4"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={imageUrl}
        alt={productName}
        className="max-w-full max-h-full object-contain"
        style={{
          transform: `scale(${zoom})`,
          transition: 'transform 200ms ease-out',
        }}
      />
    </div>

    {/* Zoom Controls */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur p-2 rounded-lg border border-white/20 z-[103]">
      <button
        onClick={onZoomOut}
        disabled={!canZoomOut}
        className="text-white hover:text-orange-500 disabled:text-white/30 disabled:cursor-not-allowed transition-colors p-2 hover:bg-white/10 rounded"
        aria-label="Zoom out"
      >
        <ZoomOut className="w-5 h-5" />
      </button>

      <span className="text-white text-sm px-2 py-1 min-w-[3rem] text-center font-semibold">
        {Math.round(zoom * 100)}%
      </span>

      <button
        onClick={onZoomIn}
        disabled={!canZoomIn}
        className="text-white hover:text-orange-500 disabled:text-white/30 disabled:cursor-not-allowed transition-colors p-2 hover:bg-white/10 rounded"
        aria-label="Zoom in"
      >
        <ZoomIn className="w-5 h-5" />
      </button>
    </div>
  </div>
));

FullscreenImage.displayName = 'FullscreenImage';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const ProductModalV3: React.FC<ProductModalV3Props> = ({
  isOpen,
  products,
  selectedProduct,
  onProductSelect,
  onClose,
  categorySlug,
}) => {
  const { mode } = useGradientMode();

  // Animation states
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // Modal content states
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);

  // ========================================================================
  // ANIMATION ORCHESTRATION
  // ========================================================================

  // Handle opening animation
  useEffect(() => {
    if (isOpen) {
      // Step 1: Render the modal (off-screen)
      setIsRendered(true);
      setIsAnimatingOut(false);

      // Step 2: Trigger animation in (on next frame)
      const animateInTimer = requestAnimationFrame(() => {
        setIsAnimatingIn(true);
      });

      return () => cancelAnimationFrame(animateInTimer);
    }
  }, [isOpen]);

  // Handle closing animation
  useEffect(() => {
    if (!isOpen && isRendered) {
      // Step 1: Start exit animation
      setIsAnimatingIn(false);
      setIsAnimatingOut(true);

      // Step 2: Remove from DOM after animation completes (500ms)
      const timer = setTimeout(() => {
        setIsRendered(false);
        setIsAnimatingOut(false);
        // Reset states
        setIsFullscreen(false);
        setZoom(1);
        setSelectedImageUrl(null);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isOpen, isRendered]);

  // Lock body scroll when rendered
  useEffect(() => {
    if (isRendered) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isRendered]);

  // Update image when product changes
  useEffect(() => {
    if (selectedProduct?.imageUrl) {
      setSelectedImageUrl(selectedProduct.imageUrl);
    }
  }, [selectedProduct?.imageUrl]);

  // ========================================================================
  // HANDLERS
  // ========================================================================

  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleImageClick = useCallback(() => {
    setZoom(1);
    setIsFullscreen(true);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 0.2, 1));
  }, []);

  const handleExitFullscreen = useCallback(() => {
    setIsFullscreen(false);
    setZoom(1);
  }, []);

  const productCount = useMemo(() => products.length, [products.length]);

  // ========================================================================
  // RENDER
  // ========================================================================

  // Don't render if not in DOM
  if (!isRendered) return null;

  // Render fullscreen mode
  if (isFullscreen && selectedImageUrl && selectedProduct) {
    return (
      <FullscreenImage
        imageUrl={selectedImageUrl}
        productName={selectedProduct.name}
        zoom={zoom}
        canZoomIn={zoom < 3}
        canZoomOut={zoom > 1}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onClose={handleExitFullscreen}
      />
    );
  }

  // Calculate animation styles - slide out to right + fade
  const backdropOpacity = isAnimatingOut ? 0 : isAnimatingIn ? 1 : 0;
  const modalOpacity = isAnimatingOut ? 0 : 1;
  const modalTransform = isAnimatingOut 
    ? 'translateX(100%)' 
    : isAnimatingIn 
      ? 'translateX(0)' 
      : 'translateX(100%)';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/20 transition-opacity"
        style={{
          opacity: backdropOpacity,
          pointerEvents: isAnimatingOut ? 'none' : 'auto',
          transitionDuration: '500ms',
          transitionTimingFunction: 'ease-in-out',
        }}
        onClick={handleBackdropClick}
      />

      {/* Modal */}
      <div
        className="fixed top-0 right-0 bottom-0 w-full lg:w-1/2 bg-gradient-to-br from-[#477197] to-[#2c476e] overflow-hidden flex flex-col shadow-2xl z-[101]"
        style={{
          transform: modalTransform,
          opacity: modalOpacity,
          transition: 'transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 500ms ease-in-out',
          willChange: 'transform, opacity',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 md:px-6 py-2 md:py-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2 md:gap-4">
            <img
              src="/logos/Forza-Eagle-Logo-White.svg"
              alt="Forza Logo"
              className="h-10 md:h-16 w-auto"
            />
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-white/70 transition-colors p-2 hover:bg-white/10 rounded-lg hover:scale-110 transition-transform"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Grid */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left - Product List */}
          <div className="overflow-y-auto border-r border-white/10 bg-[#1b3764]/40 p-2 md:p-4 scrollbar-hide hover:scrollbar-visible [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#F2611D]/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#F2611D]/60 [&::-webkit-scrollbar-thumb]:transition-colors">
            <h3 className={`text-xs md:text-base lg:text-xs xl:text-sm 2xl:text-base font-bold text-white mb-2 md:mb-3 ${mode === 'light2' ? 'font-poppins' : 'font-kallisto'}`}>
              {categorySlug.toUpperCase()} ({productCount})
            </h3>

            <div className="space-y-1 md:space-y-2 lg:space-y-1.5">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => onProductSelect(product)}
                  className={`w-full text-left px-2 md:px-3 lg:px-2.5 xl:px-3 py-1.5 md:py-2 lg:py-2 xl:py-2.5 2xl:py-3 rounded transition-all duration-300 transform ${
                    selectedProduct?.id === product.id
                      ? 'bg-[#F2611D] text-white font-semibold scale-105 shadow-lg'
                      : 'text-white hover:bg-white/10 hover:scale-102'
                  }`}
                >
                  <p className={`text-xs md:text-sm lg:text-xs xl:text-sm 2xl:text-base truncate ${mode === 'light2' ? 'font-poppins' : ''}`}>
                    {product.name || product.shortName || product.id}
                  </p>
                  {product.productCode && (
                    <p className="text-xs lg:text-[10px] xl:text-xs 2xl:text-sm text-white/60 truncate">
                      {product.productCode}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Details */}
          <div className="overflow-y-auto p-2 md:p-5 lg:p-1.5 flex flex-col bg-[#1b3764]/20 scrollbar-hide hover:scrollbar-visible [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#F2611D]/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#F2611D]/60 [&::-webkit-scrollbar-thumb]:transition-colors">
            {selectedProduct ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* Product Code */}
                {selectedProduct.productCode && (
                  <p className="text-[#F2611D] font-semibold text-xs mb-1 lg:mb-0.5 lg:text-[10px] xl:text-xs 2xl:text-sm uppercase tracking-wider">
                    {selectedProduct.productCode}
                  </p>
                )}

                {/* Product Name */}
                <h3 className={`text-xl md:text-3xl lg:text-lg xl:text-2xl 2xl:text-3xl font-bold text-white leading-tight mb-3 md:mb-6 lg:mb-1 xl:mb-2 2xl:mb-3 ${mode === 'light2' ? 'font-poppins' : 'font-kallisto'}`}>
                  {selectedProduct.name}
                </h3>

                {/* Product Image */}
                {selectedImageUrl && (
                  <div className="mb-3 md:mb-5 lg:mb-2 xl:mb-4 2xl:mb-5 group">
                    <div
                      onClick={handleImageClick}
                      className="relative rounded-lg md:rounded-xl overflow-hidden bg-gradient-to-b from-[#0f2132] to-[#1b3764] h-32 md:h-80 lg:h-56 xl:h-96 2xl:h-[420px] flex items-center justify-center flex-shrink-0 shadow-lg border border-white/10 cursor-pointer hover:border-[#F2611D]/50 transition-all duration-300 animate-in zoom-in-95 duration-300 delay-75"
                    >
                      <img
                        src={selectedImageUrl}
                        alt={selectedProduct.name}
                        className="w-full h-full object-contain p-2 lg:p-1.5 xl:p-3 2xl:p-4 transition-transform duration-300 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300 rounded-lg md:rounded-xl">
                        <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    <p className="text-xs text-white/50 mt-1 text-center">Click image to enlarge</p>
                  </div>
                )}

                {/* Description */}
                {selectedProduct.description && (
                  <p className={`text-white/90 leading-relaxed text-xs md:text-sm lg:text-[11px] xl:text-sm 2xl:text-base mb-2 md:mb-4 lg:mb-1 xl:mb-2 2xl:mb-3 ${mode === 'light2' ? 'font-poppins' : ''}`}>
                    {selectedProduct.description}
                  </p>
                )}

                {/* Benefits */}
                {selectedProduct.benefits && selectedProduct.benefits.length > 0 && (
                  <div className="mb-2 md:mb-4 lg:mb-1 xl:mb-2 2xl:mb-3">
                    <h4 className={`text-xs md:text-sm lg:text-[10px] xl:text-xs 2xl:text-sm font-bold text-white mb-1 md:mb-2 lg:mb-0.5 xl:mb-1 2xl:mb-2 uppercase tracking-wide ${mode === 'light2' ? 'font-poppins' : 'font-kallisto'}`}>
                      Key Benefits
                    </h4>
                    <ul className="space-y-1 lg:space-y-0.5 xl:space-y-1 2xl:space-y-1.5">
                      {selectedProduct.benefits.slice(0, 3).map((benefit, idx) => (
                        <li key={idx} className={`text-white/80 flex items-start gap-1 text-xs lg:text-[10px] xl:text-xs 2xl:text-sm leading-tight ${mode === 'light2' ? 'font-poppins' : ''}`}>
                          <span className="text-[#F2611D] font-bold flex-shrink-0">●</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Chemistry */}
                {selectedProduct.chemistry && (
                  <div className="mb-2 md:mb-4 lg:mb-1.5 xl:mb-2.5 2xl:mb-3 p-2 md:p-3 lg:p-1.5 xl:p-2.5 2xl:p-3.5 bg-white/5 rounded border md:rounded-lg border-white/10">
                    <h4 className={`text-xs lg:text-[10px] xl:text-xs 2xl:text-sm font-bold text-white mb-1 lg:mb-0.5 xl:mb-1 2xl:mb-1.5 uppercase tracking-wide ${mode === 'light2' ? 'font-poppins' : 'font-kallisto'}`}>
                      Chemistry
                    </h4>
                    <div className="text-xs lg:text-[10px] xl:text-xs 2xl:text-sm">
                      <span className="text-[#F2611D] font-semibold">{selectedProduct.chemistry}</span>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-2 mt-auto pt-2 md:pt-4 lg:pt-1.5 xl:pt-2.5 2xl:pt-3">
                  <Link
                    to={`/products/${selectedProduct.id}`}
                    className="flex-1 px-2 md:px-4 lg:px-1.5 xl:px-3 2xl:px-4 py-2 lg:py-1 xl:py-1.5 2xl:py-2 bg-white/10 text-white rounded text-xs lg:text-[10px] xl:text-xs 2xl:text-sm hover:bg-white/20 transition-all duration-300 text-center"
                  >
                    Details
                  </Link>
                  <Link
                    to={`/products/${categorySlug}`}
                    className="flex-1 px-2 md:px-4 lg:px-1.5 xl:px-3 2xl:px-4 py-2 lg:py-1 xl:py-1.5 2xl:py-2 bg-[#F2611D] text-white rounded text-xs lg:text-[10px] xl:text-xs 2xl:text-sm hover:bg-[#E6540D] transition-all duration-300 text-center flex items-center justify-center gap-1 shadow-lg hover:shadow-xl"
                  >
                    <span className="hidden md:inline">View All</span>
                    <span className="md:hidden">View</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-white/60 text-sm">
                Select a product to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModalV3;
