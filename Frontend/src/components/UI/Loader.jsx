export const Loader = () => {
  const bg = import.meta.env.VITE_BG; 
  const bbg = import.meta.env.VITE_BBG;
  const headingText = import.meta.env.VITE_HEADING_TEXT;
  const text = import.meta.env.VITE_TEXT;

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: `#${bg}` }}
    >
      {/* Modern Spinner */}
      <div className="relative">
        <div 
          className="w-16 h-16 border-4 rounded-full animate-spin"
          style={{ 
            borderColor: `#${bbg}20`,
            borderTopColor: `#${bbg}`
          }}
        ></div>
      </div>

      {/* Loading Text */}
      <div className="mt-6 text-center">
        <h1 
          className="text-xl font-semibold animate-pulse"
          style={{ color: `#${headingText}` }}
        >
          Loading...
        </h1>
      </div>
    </div>
  );
};