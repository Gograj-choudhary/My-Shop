import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addProductToCart, productDetailsGet } from "../../api/customerApi";
import { useCustomer } from "../../hooks/useCustomer";
import { Loader } from "../../components/UI/Loader";

export const ProductDetailsCard = () => {
  const bg = import.meta.env.VITE_BG; 
  const bg2 = import.meta.env.VITE_BG2;  
  const bbg = import.meta.env.VITE_BBG;
  const bbgHover = import.meta.env.VITE_BBG_HOVER;
  const headingText = import.meta.env.VITE_HEADING_TEXT;
  const text = import.meta.env.VITE_TEXT;

  const navigate = useNavigate();
  const { id } = useParams(); 
  const { mutate: fetchAllProducts, isPending: isLoadingProduct, isError, error } = useCustomer(productDetailsGet);
  const { mutate: addCart, isPending: isAddingCart } = useCustomer(addProductToCart);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetchAllProducts(id, {
        onSuccess: (response) => {
          console.log("product data", response);
          setProduct(response?.product);
        },
      });
    }
  }, [id]);

  if (isLoadingProduct) return <Loader />;
  if (isError) return <p className="text-red-500">Error: {error?.message}</p>;

  const handleVerify = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/customer-login");
      return;
    }

    addCart({ productId: id }, {
      onSuccess: (response) => {
        console.log("Cart Data", response);
      },
      onError: (err) => {
        console.error("Add to cart failed", err);
      }
    });
  };

  const handleGoToCart =()=> {
    navigate("/cart-items");
  }

  return (
    <div 
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: `#${bg}` }}
    >
      {product ? (
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Product Image */}
            <div className="relative">
              <div 
                className="rounded-3xl p-8 shadow-2xl backdrop-blur-sm border"
                style={{ 
                  backgroundColor: `#${bg2 || bg}DD`,
                  borderColor: `#${bbg}20`
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23" + (bg2 || bg).replace('#', '') + "'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial, sans-serif' font-size='18' fill='%23" + text.replace('#', '') + "' text-anchor='middle' dy='.3em'%3EProduct Image%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              
              {/* Floating Badge */}
              <div 
                className="absolute -top-3 -left-3 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm"
                style={{ 
                  backgroundColor: `#${bbg}`,
                  boxShadow: `0 4px 15px #${bbg}60`
                }}
              >
                Featured
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 
                  className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
                  style={{ color: `#${headingText}` }}
                >
                  {product.name}
                </h1>
                <p 
                  className="text-xl leading-relaxed opacity-90 mb-6"
                  style={{ color: `#${text}` }}
                >
                  {product.about}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span 
                  className="text-3xl font-bold"
                  style={{ color: `#${headingText}` }}
                >
                  ₹{product.prize}
                </span>
                <div 
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: `#${bbg}20`,
                    color: `#${bbg}`
                  }}
                >
                  Best Price
                </div>
              </div>

              {/* Product Meta */}
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 rounded-2xl backdrop-blur-sm border"
                style={{ 
                  backgroundColor: `#${bg2 || bg}DD`,
                  borderColor: `#${bbg}20`
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `#${bbg}20` }}
                  >
                    <svg className="w-5 h-5" style={{ color: `#${bbg}` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm opacity-75" style={{ color: `#${text}` }}>Seller</p>
                    <p className="font-semibold" style={{ color: `#${headingText}` }}>{product.adminName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `#${bbg}20` }}
                  >
                    <svg className="w-5 h-5" style={{ color: `#${bbg}` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm opacity-75" style={{ color: `#${text}` }}>Gender</p>
                    <p className="font-semibold" style={{ color: `#${headingText}` }}>{product.gender}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="button"
                  className="flex-1 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 flex items-center justify-center gap-3 group"
                  style={{ 
                    backgroundColor: `#${bbg}`,
                    color: `#${bg}`,
                    boxShadow: `0 8px 25px #${bbg}40`
                  }}
                  onClick={handleVerify}
                  disabled={isAddingCart}
                  onMouseOver={(e) => {
                    if (!isAddingCart) {
                      e.target.style.backgroundColor = `#${bbgHover}`;
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isAddingCart) {
                      e.target.style.backgroundColor = `#${bbg}`;
                    }
                  }}
                >
                  {isAddingCart ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Adding to Cart...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>

                <button 
                  type="button"
                  className="flex-1 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 border flex items-center justify-center gap-3 group"
                  style={{ 
                    backgroundColor: `#${bg2 || bg}`,
                    borderColor: `#${bbg}`,
                    color: `#${bbg}`,
                    boxShadow: `0 4px 15px #${bbg}20`
                  }}
                  onClick={handleGoToCart}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = `#${bbg}15`;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = `#${bg2 || bg}`;
                  }}
                >
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Go to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <p style={{ color: `#${text}` }}>Loading product...</p>
        </div>
      )}

      {/* Background Elements */}
      <div 
        className="fixed top-1/3 -left-20 w-40 h-40 rounded-full opacity-5 -z-10"
        style={{ backgroundColor: `#${bbg}` }}
      ></div>
      <div 
        className="fixed bottom-1/3 -right-20 w-48 h-48 rounded-full opacity-5 -z-10"
        style={{ backgroundColor: `#${headingText}` }}
      ></div>
    </div>
  );
};