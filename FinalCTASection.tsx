import { useProblemModal } from '@/contexts/ProblemModalProvider';

const FinalCTASection = () => {
  const { open } = useProblemModal();

  return (
    <section className="bg-gradient-to-b from-[#0074D9] to-[#005BB5] text-white py-20 md:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              Start your home project the right way.
            </h2>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto md:mx-0">
              Download the free 10-step Home Construction Guideline now.
            </p>

            <button
              onClick={() => open()}
              aria-label="Download the free 10-step Home Construction Guideline"
              className="mt-8 inline-flex items-center justify-center bg-white text-[#0074D9] font-semibold rounded-full px-8 py-4 hover:bg-slate-100 hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0074D9]"
            >
              Get My Free Guideline
            </button>
          </div>

          <div className="flex-shrink-0 mt-10 md:mt-0">
            <div className="relative w-64 md:w-80 mx-auto">
              <div className="bg-white rounded-xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-12 bg-[#0074D9] flex items-center justify-center">
                    <div className="text-white font-bold text-sm">VeeduWay</div>
                  </div>

                  <div className="text-center px-6 mt-8">
                    <div className="text-[#0074D9] font-serif font-bold text-xl mb-2">
                      10-Step Home Construction Guideline
                    </div>
                    <div className="text-xs text-gray-600 space-y-1 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#0074D9] flex items-center justify-center text-white text-[8px] font-bold">✓</div>
                        <span>Land Verification</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#0074D9] flex items-center justify-center text-white text-[8px] font-bold">✓</div>
                        <span>Permits & Approvals</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#0074D9] flex items-center justify-center text-white text-[8px] font-bold">✓</div>
                        <span>Budget Planning</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#0074D9] flex items-center justify-center text-white text-[8px] font-bold">✓</div>
                        <span>Quality Control</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#0074D9] flex items-center justify-center text-white text-[8px] font-bold">✓</div>
                        <span>& Much More...</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-2 right-2 w-8 h-8 bg-white/30 rounded-full" />
                  <div className="absolute top-16 right-2 w-6 h-6 bg-white/20 rounded-full" />
                </div>

                <div className="mt-4 flex gap-2">
                  <div className="flex-1 h-1 bg-[#0074D9] rounded" />
                  <div className="flex-1 h-1 bg-[#0074D9]/30 rounded" />
                  <div className="flex-1 h-1 bg-[#0074D9]/30 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default FinalCTASection;
