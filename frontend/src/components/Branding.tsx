

const Branding: React.FC = () => {
  return (
    <>
      {/* Fixed subtle watermark */}
      <div className="fixed bottom-4 right-4 pointer-events-none opacity-20 select-none z-50">
        <div className="text-xl font-bold tracking-widest text-gray-900 bg-white/50 px-2 py-1 rounded backdrop-blur-sm shadow-sm">
          8WHIE
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="w-full py-8 mt-auto border-t border-gray-200 bg-white/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center space-y-2">
          <p className="text-gray-500 font-medium tracking-wide">
            <span className="font-bold text-gray-700">8WHIE</span> • Aryan Thakur
          </p>
          <p className="text-sm text-gray-400">
            Secure & Privacy-Conscious Intelligence Tools
          </p>
        </div>
      </footer>
    </>
  );
};

export default Branding;
