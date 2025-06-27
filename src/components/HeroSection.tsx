
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold text-slate-800">Welcome to ForzaBuilt</h1>
        <p className="text-xl text-slate-600 max-w-2xl">Building dreams with precision and passion</p>
        <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold">
          Start Building
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
