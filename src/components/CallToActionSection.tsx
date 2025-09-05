
import { Button } from '@/components/ui/button';

const CallToActionSection = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-8 text-center space-y-8">
        <h2 className="text-4xl font-bold text-slate-800">Ready to Build Your Dream?</h2>
        <p className="text-xl text-slate-600">Join hundreds of satisfied homeowners across Texas</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white px-8 py-4 rounded-xl text-lg font-semibold border border-[#F2611D]">
            Get Free Quote
          </Button>
          <Button variant="outline" className="border-2 border-slate-300 px-8 py-4 rounded-xl text-lg font-semibold">
            View Portfolio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallToActionSection;
