import { NavLink } from "react-router-dom"
import { FaLongArrowAltRight } from "react-icons/fa";

export const Hero = () => {
    const bg = import.meta.env.VITE_BG;   
    const bbg = import.meta.env.VITE_BBG;
    const bbgHover = import.meta.env.VITE_BBG_HOVER;
    const headingText = import.meta.env.VITE_HEADING_TEXT;
    const text = import.meta.env.VITE_TEXT;

    return (
        <main 
            className="min-h-screen flex items-center relative overflow-hidden"
            style={{ backgroundColor: `#${bg}` }}
        >
            <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 items-center">
                
                {/* Text Content */}
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        Discover Your Perfect
                        <span 
                            className="bg-clip-text text-transparent block"
                            style={{ 
                                backgroundImage: `linear-gradient(to right, #${headingText}, #${bbg})`
                            }}
                        >
                            Beauty & Fashion
                        </span>
                        Collection!
                    </h1>
                    
                    <p 
                        className="text-lg md:text-xl leading-relaxed opacity-90"
                        style={{ color: `#${text}` }}
                    >
                        Elevate your style with our curated collection of premium beauty and fashion products for both men and women. From skincare essentials to trendy fashion pieces - find everything you need to look and feel your best!
                    </p>
                    
                    {/* Features List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                        <div className="flex items-center gap-3">
                            <div 
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: `#${bbg}` }}
                            ></div>
                            <span style={{ color: `#${text}` }}>Premium Beauty Products</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div 
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: `#${bbgHover}` }}
                            ></div>
                            <span style={{ color: `#${text}` }}>Trendy Fashion Items</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div 
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: `#${headingText}` }}
                            ></div>
                            <span style={{ color: `#${text}` }}>For Men & Women</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div 
                                className="w-3 h-3 rounded-full flex-shrink-0 opacity-80"
                                style={{ backgroundColor: `#${bbg}` }}
                            ></div>
                            <span style={{ color: `#${text}` }}>Curated Collection</span>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <NavLink to="/customer-products">
                            <button 
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 group"
                                style={{ 
                                    backgroundColor: `#${bbg}`,
                                    color: `#${bg}`,
                                    boxShadow: `0 8px 25px #${bbg}40`
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = `#${bbgHover}`;
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = `#${bbg}`;
                                }}
                            >
                                Shop Now 
                                <FaLongArrowAltRight className="group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </NavLink>
                    </div>
                </div>

                {/* Image Section */}
                <div className="flex justify-center relative">
                    {/* Background decorative elements */}
                    <div 
                        className="absolute -top-6 -left-6 w-28 h-28 rounded-full opacity-20"
                        style={{ backgroundColor: `#${bbg}` }}
                    ></div>
                    <div 
                        className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full opacity-15"
                        style={{ backgroundColor: `#${headingText}` }}
                    ></div>
                    
                    {/* Main image container */}
                    <div 
                        className="relative z-10 rounded-3xl p-8 shadow-2xl backdrop-blur-sm"
                        style={{ 
                            backgroundColor: `#${bg}DD`,
                            border: `1px solid #${bbg}20`
                        }}
                    >
                        <img
                            src="/images/Myshop.webp"
                            alt="Beauty and Fashion Products"
                            className="w-full max-w-md rounded-2xl shadow-lg"
                            onError={(e) => {
                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23" + bg + "'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial, sans-serif' font-size='18' fill='%23" + text.replace('#', '') + "' text-anchor='middle' dy='.3em'%3EBeauty %26 Fashion Collection%3C/text%3E%3C/svg%3E";
                            }}
                        />
                        
                        {/* Floating product badges */}
                        <div 
                            className="absolute -top-3 -right-3 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm"
                            style={{ 
                                backgroundColor: `#${bbg}`,
                                boxShadow: `0 4px 15px #${bbg}60`
                            }}
                        >
                            New Arrivals
                        </div>
                        <div 
                            className="absolute -bottom-3 -left-3 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm"
                            style={{ 
                                backgroundColor: `#${headingText}`,
                                boxShadow: `0 4px 15px #${headingText}60`
                            }}
                        >
                            Premium Quality
                        </div>
                    </div>
                </div>
            </div>

            {/* Background pattern overlay */}
            <div 
                className="absolute inset-0 -z-10 opacity-10"
                style={{ 
                    backgroundImage: `radial-gradient(#${headingText} 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                }}
            ></div>
            
            {/* Gradient overlay */}
            <div 
                className="absolute top-0 right-0 w-1/2 h-1/2 -z-10 opacity-5"
                style={{ 
                    background: `radial-gradient(ellipse at top right, #${bbg}, transparent 50%)`
                }}
            ></div>
            <div 
                className="absolute bottom-0 left-0 w-1/2 h-1/2 -z-10 opacity-5"
                style={{ 
                    background: `radial-gradient(ellipse at bottom left, #${headingText}, transparent 50%)`
                }}
            ></div>
        </main>
    )
}