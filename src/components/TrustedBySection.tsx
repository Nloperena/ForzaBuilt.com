
const TrustedBySection = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-8 text-center space-y-8">
        <h2 className="text-5xl font-bold text-slate-800">Trusted by Texas Families</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {['The Johnsons', 'Smith Family', 'Miller Estate', 'Davis Home'].map((client, i) => (
            <div key={i} className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="w-12 h-12 bg-slate-200 rounded-lg mx-auto mb-4"></div>
              <p className="font-semibold text-slate-700">{client}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedBySection;
