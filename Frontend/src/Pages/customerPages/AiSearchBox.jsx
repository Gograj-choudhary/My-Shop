import { useState } from "react";
import { aiFilteredProductsGet } from "../../api/customerApi"
import { useCustomer } from "../../hooks/useCustomer"
import { RxCross2 } from "react-icons/rx";
import { Loader } from "../../components/UI/Loader";
import { useNavigate } from "react-router-dom";

export const AiSearchBox = ({ isOpen, onClose }) => {
  const bg = import.meta.env.VITE_BG; 
  const bg2 = import.meta.env.VITE_BBG;  
  const bbg = import.meta.env.VITE_BBG;
  const bbgHover = import.meta.env.VITE_BBG_HOVER;
  const headingText = import.meta.env.VITE_HEADING_TEXT;
  const text = import.meta.env.VITE_TEXT;

  const [query, setQuery] = useState("");
  const { mutate, isPending, isError, error } = useCustomer(aiFilteredProductsGet);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("AI Search Query:", query);

    mutate({ query }, {
      onSuccess: (response) => {
        console.log('AI response data', response);
        navigate("/Customer-products", {
            state: { aiFilteredProducts: response.products || [],
            searchQuery: query    
            }
        });
        onClose();  
      },
      onError: (error) => {
        console.log("Error in AI response", error);
      }
    });
  };

  const exampleQueries = [
    "I want a white t-shirt under 500",
    "Give me budget friendly phones",
    "Show me skincare products for sensitive skin",
    "Find trendy sneakers for men",
    "Looking for formal dresses for office wear"
  ];

  if (!isOpen) return null;

  if (isPending) return   <Loader />;

  if (isError) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div 
        className="relative z-10 p-6 rounded-2xl backdrop-blur-sm border max-w-md w-full mx-4"
        style={{ 
          backgroundColor: `#${bg2 || bg}DD`,
          borderColor: `#${bbg}20`
        }}
      >
        <p style={{ color: `#${bbg}` }}>Error: {error?.message}</p>
        <button 
          onClick={onClose}
          className="mt-4 px-4 py-2 rounded-lg font-medium"
          style={{ 
            backgroundColor: `#${bbg}`,
            color: `#${bg}`
          }}
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div 
        className="relative rounded-3xl backdrop-blur-sm border shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100"
        style={{ 
          backgroundColor: `#${bg}`,
          borderColor: `#${bbg}20`,
          boxShadow: `0 25px 50px -12px #${bbg}25`
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-6 border-b rounded-t-3xl"
          style={{ borderColor: `#${bbg}20` }}
        >
          <h2 
            className="text-2xl font-bold flex items-center gap-3"
            style={{ color: `#${headingText}` }}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `#${bbg}20` }}
            >
              <svg className="w-5 h-5" style={{ color: `#${bbg}` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            AI Product Search
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-all duration-200 hover:scale-110 hover:bg-opacity-10"
            style={{ 
              color: `#${headingText}`,
              backgroundColor: `#${headingText}10`
            }}
          >
            <RxCross2 className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                className="block text-lg font-semibold mb-3"
                style={{ color: `#${headingText}` }}
              >
                Describe what you're looking for
              </label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Example: I want comfortable running shoes for daily use under 2000 rupees..."
                className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 resize-none min-h-32"
                style={{
                  backgroundColor: `#${bg}`,
                  borderColor: `#${bbg}30`,
                  color: `#${text}`,
                  boxShadow: `0 2px 8px #${bbg}10`
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = `#${bbg}`;
                  e.target.style.boxShadow = `0 0 0 3px #${bbg}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = `#${bbg}30`;
                  e.target.style.boxShadow = `0 2px 8px #${bbg}10`;
                }}
              />
            </div>

            {/* Example Queries */}
            <div>
              <h3 
                className="text-sm font-semibold mb-3 uppercase tracking-wide"
                style={{ color: `#${text}` }}
              >
                Try these examples:
              </h3>
              <div className="space-y-2">
                {exampleQueries.map((example, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setQuery(example)}
                    className="w-full text-left p-3 rounded-lg transition-all duration-200 hover:scale-105 border text-sm"
                    style={{
                      backgroundColor: `#${bg}`,
                      borderColor: `#${bbg}20`,
                      color: `#${text}`,
                      boxShadow: `0 1px 4px #${bbg}05`
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = `#${bbg}10`;
                      e.target.style.borderColor = `#${bbg}40`;
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = `#${bg}`;
                      e.target.style.borderColor = `#${bbg}20`;
                    }}
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!query.trim() || isPending}
              className="w-full py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              style={{ 
                backgroundColor: `#${bbg}`,
                color: `#${text}`,
                boxShadow: `0 8px 25px #${bbg}40`
              }}
              onMouseOver={(e) => {
                if (query.trim() && !isPending) {
                  e.target.style.backgroundColor = `#${bbgHover}`;
                }
              }}
              onMouseOut={(e) => {
                if (query.trim() && !isPending) {
                  e.target.style.backgroundColor = `#${bbg}`;
                }
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {isPending ? "Searching..." : "Find Products with AI"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div 
          className="p-4 border-t rounded-b-3xl text-center"
          style={{ borderColor: `#${bbg}20` }}
        >
          <p 
            className="text-sm opacity-75"
            style={{ color: `#${text}` }}
          >
            Our AI will understand your needs and find the perfect products
          </p>
        </div>
      </div>
    </div>
  );
};