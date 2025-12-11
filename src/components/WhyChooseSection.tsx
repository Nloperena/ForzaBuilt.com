
const WhyChooseSection = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-8 text-center space-y-8">
        <h2 className="text-5xl font-bold text-slate-800">Why Choose ForzaBuilt</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto flex items-center justify-center">
              <span className="text-white text-2xl">🏗️</span>
            </div>
            <h3 className="text-xl font-semibold">Expert Craftsmanship</h3>
            <p className="text-slate-600">20+ years of building excellence</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto flex items-center justify-center">
              <span className="text-white text-2xl">💎</span>
            </div>
            <h3 className="text-xl font-semibold">Premium Quality</h3>
            <p className="text-slate-600">Only the finest materials and finishes</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center">
              <span className="text-white text-2xl">⏰</span>
            </div>
            <h3 className="text-xl font-semibold">On-Time Delivery</h3>
            <p className="text-slate-600">Your project completed when promised</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseSection;
