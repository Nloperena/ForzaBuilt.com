
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="font-semibold text-slate-800">ForzaBuilt</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-slate-600 hover:text-slate-800 transition-colors">Services</button>
          <button className="text-slate-600 hover:text-slate-800 transition-colors">Portfolio</button>
          <Button className="bg-slate-800 hover:bg-slate-700">Get Quote</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
