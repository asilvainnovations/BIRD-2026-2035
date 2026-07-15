import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#011a12]">
      <div className="text-center p-10 rounded-2xl border border-[#C9A84C]/20 bg-[#022c22]/60 shadow-2xl animate-slide-in max-w-md mx-4">
        <div className="mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#064e3b] to-[#022c22] border-2 border-[#C9A84C]/30 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold text-[#C9A84C]">404</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-3 text-[#E8C560]">Page Not Found</h1>
        <p className="text-[#ecfdf5]/70 mb-2">The page you are looking for does not exist or has been moved.</p>
        <p className="text-[#64748b] text-sm mb-6">BIRD 2026-2035 Strategic Investment Roadmap</p>
        <a 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C9A84C] to-[#E8C560] text-[#022c22] font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-[#C9A84C]/20 hover:scale-[1.02]"
        >
          Return to Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
