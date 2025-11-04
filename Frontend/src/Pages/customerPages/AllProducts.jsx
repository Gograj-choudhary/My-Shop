import { useEffect, useState } from "react";
import { Loader } from "../../components/UI/Loader";
import { allProductsGet } from "../../api/customerApi";
import { useCustomer } from "../../hooks/useCustomer";
import { CustomerCard } from "../../components/UI/CustomerCard";
import { ProductFilterBar } from "./ProductFilterBar";
import { NavLink, useLocation } from "react-router-dom";

export const AllProducts = () => {
  const bg = import.meta.env.VITE_BG; 
  const bg2 = import.meta.env.VITE_BG2;  
  const bbg = import.meta.env.VITE_BBG;
  const bbgHover = import.meta.env.VITE_BBG_HOVER;
  const headingText = import.meta.env.VITE_HEADING_TEXT;
  const text = import.meta.env.VITE_TEXT;

  const location = useLocation();
  const { mutate, isPending } = useCustomer(allProductsGet);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterBarSticky, setIsFilterBarSticky] = useState(false);
  const [isAiFiltered, setIsAiFiltered] = useState(false);
  const [aiSearchQuery, setAiSearchQuery] = useState("");

  useEffect(() => {
    if(location.state && location.state.aiFilteredProducts){
      const aiProducts = location.state.aiFilteredProducts || [];
      const searchQuery = location.state.searchQuery || "";
      setProducts(aiProducts);
      setFilteredProducts(aiProducts);
      setIsAiFiltered(true);
      setAiSearchQuery(searchQuery);
      window.history.replaceState( {}, document.title);

    }else {
    mutate(undefined, {
      onSuccess: (response) => {
        const fetched = response?.products || [];
        setProducts(fetched);
        setFilteredProducts(fetched);
        setIsAiFiltered(false);
        setAiSearchQuery("");
      },
    });
  }}, [location.state]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsFilterBarSticky(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (query) => {
    const q = query.toLowerCase();
    setFilteredProducts(
      products.filter((p) => p.name.toLowerCase().includes(q))
    );
  };

  const handleFilter = (gender) => {
    if (!gender) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.gender === gender));
    }
  };

   const clearAiFilter = () => {
    setIsAiFiltered(false);
    setAiSearchQuery("");

    mutate(undefined, {
      onSuccess: (response) => {
        const fetched = response?.products || [];
        setProducts(fetched);
        setFilteredProducts(fetched);
      },
    });
  };

  if (isPending) return <Loader />;

  return (
    <div 
      className="min-h-screen pt-24 pb-8 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: `#${bg}` }}
    >
      <div className="max-w-7xl mx-auto">
        {/* AI Filter Badge */}
        {isAiFiltered && (
          <div 
            className="mb-6 p-4 rounded-xl backdrop-blur-sm border flex items-center justify-between"
            style={{ 
              backgroundColor: `#${bbg}20`,
              borderColor: `#${bbg}40`,
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `#${bbg}` }}
              >
                <svg className="w-5 h-5" style={{ color: `#${bg}` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p 
                  className="font-semibold"
                  style={{ color: `#${headingText}` }}
                >
                  AI Filtered Results
                </p>
                <p 
                  className="text-sm opacity-75"
                  style={{ color: `#${text}` }}
                >
                  "{aiSearchQuery}"
                </p>
              </div>
            </div>
            <button
              onClick={clearAiFilter}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
              style={{ 
                backgroundColor: `#${bbg}`,
                color: `#${bg}`
              }}
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* Sticky Search + Filter Bar */}
        <div className={`mb-8 transition-all duration-300 ${
          isFilterBarSticky 
            ? 'fixed top-0 left-0 right-0 z-40 shadow-lg py-4 px-4 sm:px-6 lg:px-8' 
            : 'relative'
        }`}
        style={{ 
          backgroundColor: isFilterBarSticky ? `#${bg}EE` : 'transparent',
          backdropFilter: isFilterBarSticky ? 'blur(10px)' : 'none'
        }}
        >
          <div className={`${isFilterBarSticky ? 'max-w-7xl mx-auto' : ''}`}>
            <ProductFilterBar onSearch={handleSearch} onFilter={handleFilter} />
          </div>
        </div>

        {/* Spacer for when filter bar becomes sticky */}
        {isFilterBarSticky && <div className="h-24"></div>}

        {/* Results Count */}
        <div 
          className="mb-8 px-6 py-4 rounded-xl backdrop-blur-sm border"
          style={{ 
            backgroundColor: `#${bg2 || bg}DD`,
            borderColor: `#${bbg}20`,
            color: `#${text}`
          }}
        >
          <p className="text-sm font-medium">
            Showing <span className="font-bold">{filteredProducts.length}</span> of{" "}
            <span className="font-bold">{products.length}</span> products
            {isAiFiltered && (
              <span 
                className="ml-2 px-2 py-1 rounded text-xs font-semibold"
                style={{ 
                  backgroundColor: `#${bbg}20`,
                  color: `#${bbg}`
                }}
              >
                AI FILTERED
              </span>
            )}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <NavLink 
                key={product.id} 
                to={`/products/${product.id}`} 
                className="block transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
              >
                <CustomerCard product={product} />
              </NavLink>
            ))
          ) : (
            <div 
              className="col-span-full text-center py-16 rounded-2xl backdrop-blur-sm border"
              style={{ 
                backgroundColor: `#${bg2 || bg}DD`,
                borderColor: `#${bbg}20`
              }}
            >
              <div 
                className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `#${bbg}20` }}
              >
                <svg 
                  className="w-12 h-12" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ color: `#${bbg}` }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 
                className="text-2xl font-bold mb-3"
                style={{ color: `#${headingText}` }}
              >
                No Products Found
              </h3>
              <p style={{ color: `#${text}` }}>
                {isAiFiltered 
                  ? "No products match your AI search. Try a different query or clear the filter." 
                  : "Try adjusting your search or filter criteria"}
              </p>
              {isAiFiltered && (
                <button
                  onClick={clearAiFilter}
                  className="mt-6 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                  style={{ 
                    backgroundColor: `#${bbg}`,
                    color: `#${bg}`
                  }}
                >
                  View All Products
                </button>
              )}
            </div>
          )}
        </div>

        {/* Background Elements */}
        <div 
          className="fixed top-1/4 -left-10 w-32 h-32 rounded-full opacity-5 -z-10"
          style={{ backgroundColor: `#${bbg}` }}
        ></div>
        <div 
          className="fixed bottom-1/4 -right-10 w-40 h-40 rounded-full opacity-5 -z-10"
          style={{ backgroundColor: `#${headingText}` }}
        ></div>
      </div>
    </div>
  );
};