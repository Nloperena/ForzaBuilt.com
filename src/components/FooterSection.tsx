
const FooterSection = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-slate-800">Services</h3>
            <ul className="space-y-2 text-slate-600">
              <li>Construction</li>
              <li>Renovation</li>
              <li>Design</li>
              <li>Consultation</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-slate-800">Projects</h3>
            <ul className="space-y-2 text-slate-600">
              <li>Custom Homes</li>
              <li>Kitchen Remodels</li>
              <li>Bathroom Upgrades</li>
              <li>Additions</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-slate-800">Company</h3>
            <ul className="space-y-2 text-slate-600">
              <li>About</li>
              <li>Team</li>
              <li>Portfolio</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-slate-800">Support</h3>
            <ul className="space-y-2 text-slate-600">
              <li>Process</li>
              <li>Warranty</li>
              <li>Financing</li>
              <li>Reviews</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-slate-200 text-center">
          <p className="text-slate-500">© 2024 ForzaBuilt. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
