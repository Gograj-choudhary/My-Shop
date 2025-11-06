import { useEffect, useState } from "react";
import { addProductToCart, getCartItems, orderPlace, reduceProductToCart, removeProductFromCart } from "../../api/customerApi";
import { useCustomer } from "../../hooks/useCustomer";
import { Loader } from "../../components/UI/Loader";
import { NavLink } from "react-router-dom";

export const AllCartItems = () => {
  const bg = import.meta.env.VITE_BG; 
  const bg2 = import.meta.env.VITE_BG2;  
  const bbg = import.meta.env.VITE_BBG;
  const bbgHover = import.meta.env.VITE_BBG_HOVER;
  const headingText = import.meta.env.VITE_HEADING_TEXT;
  const text = import.meta.env.VITE_TEXT;

  const { mutate: FetchCartItems, isPending, isError, error } = useCustomer(getCartItems);
  const { mutate: addToItem } = useCustomer(addProductToCart);
  const { mutate: ReduceToItem } = useCustomer(reduceProductToCart);
  const { mutate: RemoveItem } = useCustomer(removeProductFromCart);
  const { mutate: PlaceToOrder } = useCustomer(orderPlace);

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [step, setStep] = useState(1);

  const [address, setAddress] = useState({ name: "", phone: "", street: "", city: "", pincode: "" });
  console.log("Address State:", address);
  const [paymentMethod, setPaymentMethod] = useState("");

  const loadCart = () => {
    FetchCartItems(undefined, {
      onSuccess: (response) => {
        setCart(response.cart || []);
        const grandTotal = response.cart.reduce((sum, item) => sum + item.product.prize * item.quantity, 0);
        setTotal(grandTotal);
      },
      onError: (error) => console.log(error),
    });
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleAddItem = (productId) => addToItem({ productId }, { onSuccess: loadCart });
  const handleReduceItem = (productId) => ReduceToItem({ productId }, { onSuccess: loadCart });
  const handleRemoveItem = (productId) => RemoveItem({ productId }, { onSuccess: loadCart });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => setPaymentMethod(e.target.value);

  const handlePlaceOrder = () => {
    if (!paymentMethod) return alert("Select a payment method");

    const data = {
      paymentMode: paymentMethod === "online" ? "Online" : "COD",
      address: address,
    };

    PlaceToOrder(data, {
      onSuccess: (res) => {
        setStep(4);
        setCart([]);
        // setAddress({ name: "", phone: "", street: "", city: "", pincode: "" });
      },
      onError: (err) => {
        console.error("Order Error:", err);
        alert(err?.response?.data?.message || "Failed to place order. Try again!");
      },
    });
  };

  if (isPending) return <Loader />;
  if (isError) return <p className="text-center" style={{ color: `#${bbg}` }}>Error: {error?.message}</p>;

  return (
    <div 
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: `#${bg}` }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex flex-col items-center relative z-10">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg transition-all duration-300 ${
                    step >= stepNum ? 'scale-110' : 'scale-100'
                  }`}
                  style={{
                    backgroundColor: step >= stepNum ? `#${bbg}` : `#${bg2 || bg}`,
                    color: step >= stepNum ? `#${bg}` : `#${text}`,
                    border: step >= stepNum ? 'none' : `2px solid #${bbg}50`,
                    boxShadow: step >= stepNum ? `0 4px 15px #${bbg}40` : 'none'
                  }}
                >
                  {stepNum}
                </div>
                <span 
                  className="mt-2 text-sm font-medium"
                  style={{ color: step >= stepNum ? `#${headingText}` : `#${text}` }}
                >
                  {stepNum === 1 && 'Cart'}
                  {stepNum === 2 && 'Address'}
                  {stepNum === 3 && 'Payment'}
                  {stepNum === 4 && 'Confirmation'}
                </span>
              </div>
            ))}
            <div 
              className="absolute top-6 left-12 right-12 h-1 -z-10"
              style={{ backgroundColor: `#${bbg}20` }}
            >
              <div 
                className="h-full transition-all duration-500 ease-in-out"
                style={{ 
                  width: `${((step - 1) / 3) * 100}%`,
                  backgroundColor: `#${bbg}`
                }}
              ></div>
            </div>
          </div>
        </div>

        
        {step === 1 && (
          <>
            <h1 
              className="text-3xl font-bold mb-8 text-center"
              style={{ color: `#${headingText}` }}
            >
              🛒 My Cart
            </h1>
            
            {cart.length === 0 ? (
              <div 
                className="text-center py-16 rounded-2xl backdrop-blur-sm border"
                style={{ 
                  backgroundColor: `#${bg2 || bg}DD`,
                  borderColor: `#${bbg}20`
                }}
              >
                <div 
                  className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `#${bbg}20` }}
                >
                  <svg className="w-12 h-12" style={{ color: `#${bbg}` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 
                  className="text-2xl font-bold mb-3"
                  style={{ color: `#${headingText}` }}
                >
                  Your Cart is Empty
                </h3>
                <p className="mb-6" style={{ color: `#${text}` }}>Start shopping to add items to your cart</p>
                <NavLink to="/customer-products">
                  <button 
                    className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    style={{ 
                      backgroundColor: `#${bbg}`,
                      color: `#${bg}`,
                      boxShadow: `0 4px 15px #${bbg}40`
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = `#${bbgHover}`;
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = `#${bbg}`;
                    }}
                  >
                    Continue Shopping
                  </button>
                </NavLink>
              </div>
            ) : (
              <>
                <div className="space-y-6 mb-8">
                  {cart.map((item) => (
                    <div 
                      key={item._id} 
                      className="flex items-center justify-between p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:shadow-lg"
                      style={{ 
                        backgroundColor: `#${bg2 || bg}DD`,
                        borderColor: `#${bbg}20`
                      }}
                    >
                      <div className="flex items-center gap-6">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-24 h-24 object-cover rounded-xl shadow-md"
                          onError={(e) => {
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' fill='%23" + (bg2 || bg).replace('#', '') + "'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial, sans-serif' font-size='12' fill='%23" + text.replace('#', '') + "' text-anchor='middle' dy='.3em'%3EProduct%3C/text%3E%3C/svg%3E";
                          }}
                        />
                        <div>
                          <h2 className="font-bold text-lg mb-2" style={{ color: `#${headingText}` }}>{item.product.name}</h2>
                          <p className="text-sm mb-3 opacity-90" style={{ color: `#${text}` }}>{item.product.about}</p>
                          <p className="text-sm font-medium" style={{ color: `#${bbg}` }}>Quantity: {item.quantity}</p>
                          <div className="flex gap-2 mt-3">
                            <button 
                              onClick={() => handleAddItem(item.product.id)}   // use item.product._id when use MongoDB (_id)
                              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                              style={{ 
                                backgroundColor: `#${bbg}`,
                                color: `#${bg}`,
                                boxShadow: `0 2px 8px #${bbg}30`
                              }}
                            >
                              Add
                            </button>
                            <button 
                              onClick={() => handleReduceItem(item.product.id)}
                              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 border"
                              style={{ 
                                backgroundColor: `#${bg}`,
                                borderColor: `#${bbg}`,
                                color: `#${bbg}`,
                                boxShadow: `0 2px 8px #${bbg}20`
                              }}
                            >
                              Reduce
                            </button>
                            <button 
                              onClick={() => handleRemoveItem(item.product.id)}   
                              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 border"
                              style={{ 
                                backgroundColor: `#${bg}`,
                                borderColor: `#${bbgHover}`,
                                color: `#${bbgHover}`,
                                boxShadow: `0 2px 8px #${bbgHover}20`
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl mb-2" style={{ color: `#${headingText}` }}>₹{item.product.prize}</p>
                        <p className="text-lg font-semibold" style={{ color: `#${bbg}` }}>Subtotal: ₹{item.product.prize * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div 
                  className="mt-8 border-t pt-6 flex justify-between items-center p-6 rounded-2xl backdrop-blur-sm"
                  style={{ 
                    backgroundColor: `#${bg2 || bg}DD`,
                    borderColor: `#${bbg}20`
                  }}
                >
                  <h2 className="text-2xl font-bold" style={{ color: `#${headingText}` }}>Total Amount:</h2>
                  <p className="text-2xl font-bold" style={{ color: `#${bbg}` }}>₹{total}</p>
                </div>

                <div className="mt-8 flex justify-between">
                  <NavLink to="/customer-products">
                    <button 
                      className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 border"
                      style={{ 
                        backgroundColor: `#${bg}`,
                        borderColor: `#${bbg}`,
                        color: `#${bbg}`,
                        boxShadow: `0 4px 15px #${bbg}20`
                      }}
                    >
                      ← Continue Shopping
                    </button>
                  </NavLink>
                  <button 
                    onClick={() => setStep(2)}
                    className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    style={{ 
                      backgroundColor: `#${bbg}`,
                      color: `#${bg}`,
                      boxShadow: `0 4px 15px #${bbg}40`
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = `#${bbgHover}`;
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = `#${bbg}`;
                    }}
                  >
                    Proceed to Address →
                  </button>
                </div>
              </>
            )}
          </>
        )}

       
        {step === 2 && (
          <div>
            <h1 
              className="text-3xl font-bold mb-8 text-center"
              style={{ color: `#${headingText}` }}
            >
              Delivery Address
            </h1>
            <div 
              className="p-8 rounded-2xl backdrop-blur-sm border mb-8"
              style={{ 
                backgroundColor: `#${bg2 || bg}DD`,
                borderColor: `#${bbg}20`
              }}
            >
              <form className="space-y-6">
                {[
                  { label: "Full Name", name: "name", type: "text" },
                  { label: "Phone Number", name: "phone", type: "text" },
                  { label: "Street Address", name: "street", type: "text" },
                  { label: "City", name: "city", type: "text" },
                  { label: "Pincode", name: "pincode", type: "text" }
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium mb-2" style={{ color: `#${headingText}` }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={address[field.name]}
                      onChange={handleAddressChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
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
                ))}
              </form>
            </div>
            <div className="flex justify-between">
              <button 
                onClick={() => setStep(1)}
                className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 border"
                style={{ 
                  backgroundColor: `#${bg}`,
                  borderColor: `#${bbg}`,
                  color: `#${bbg}`,
                  boxShadow: `0 4px 15px #${bbg}20`
                }}
              >
                ← Back to Cart
              </button>
              <button 
                onClick={() => setStep(3)}
                className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                style={{ 
                  backgroundColor: `#${bbg}`,
                  color: `#${bg}`,
                  boxShadow: `0 4px 15px #${bbg}40`
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = `#${bbgHover}`;
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = `#${bbg}`;
                }}
              >
                Proceed to Payment →
              </button>
            </div>
          </div>
        )}

       
        {step === 3 && (
          <div>
            <h1 
              className="text-3xl font-bold mb-8 text-center"
              style={{ color: `#${headingText}` }}
            >
              Payment Method
            </h1>
            <div 
              className="p-8 rounded-2xl backdrop-blur-sm border mb-8"
              style={{ 
                backgroundColor: `#${bg2 || bg}DD`,
                borderColor: `#${bbg}20`
              }}
            >
              <p className="text-lg mb-6 text-center" style={{ color: `#${text}` }}>Select your preferred payment method</p>
              <div className="space-y-4 max-w-md mx-auto">
                {[
                  { value: "online", label: "Online Payment", desc: "Pay securely with credit/debit card" },
                  { value: "COD", label: " Cash on Delivery", desc: "Pay when you receive your order" }
                ].map((method) => (
                  <label key={method.value} className="block cursor-pointer">
                    <div 
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        paymentMethod === method.value ? 'scale-105' : 'scale-100'
                      }`}
                      style={{
                        backgroundColor: paymentMethod === method.value ? `#${bbg}15` : `#${bg}`,
                        borderColor: paymentMethod === method.value ? `#${bbg}` : `#${bbg}30`,
                        boxShadow: paymentMethod === method.value ? `0 4px 15px #${bbg}20` : `0 2px 8px #${bbg}10`
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="payment"
                          value={method.value}
                          checked={paymentMethod === method.value}
                          onChange={handlePaymentChange}
                          required
                          className="w-5 h-5"
                          style={{ accentColor: `#${bbg}` }}
                        />
                        <div>
                          <p className="font-semibold" style={{ color: `#${headingText}` }}>{method.label}</p>
                          <p className="text-sm opacity-75" style={{ color: `#${text}` }}>{method.desc}</p>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <button 
                onClick={() => setStep(2)}
                className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 border"
                style={{ 
                  backgroundColor: `#${bg}`,
                  borderColor: `#${bbg}`,
                  color: `#${bbg}`,
                  boxShadow: `0 4px 15px #${bbg}20`
                }}
              >
                ← Back to Address
              </button>
              <button 
                onClick={handlePlaceOrder}
                disabled={!paymentMethod}
                className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                style={{ 
                  backgroundColor: `#${bbg}`,
                  color: `#${bg}`,
                  boxShadow: `0 4px 15px #${bbg}40`
                }}
                onMouseOver={(e) => {
                  if (paymentMethod) {
                    e.target.style.backgroundColor = `#${bbgHover}`;
                  }
                }}
                onMouseOut={(e) => {
                  if (paymentMethod) {
                    e.target.style.backgroundColor = `#${bbg}`;
                  }
                }}
              >
                Place Order 
              </button>
            </div>
          </div>
        )}

       
        {step === 4 && (
          <div 
            className="text-center py-16 rounded-2xl backdrop-blur-sm border"
            style={{ 
              backgroundColor: `#${bg2 || bg}DD`,
              borderColor: `#${bbg}20`
            }}
          >
            <div 
              className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `#${bbg}20` }}
            >
              <svg className="w-12 h-12" style={{ color: `#${bbg}` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 
              className="text-4xl font-bold mb-4"
              style={{ color: `#${headingText}` }}
            >
              Order Confirmed! 
            </h1>
            <p className="text-xl mb-6" style={{ color: `#${text}` }}>Thank you for your purchase!</p>
            <div className="max-w-md mx-auto p-6 rounded-xl mb-8" style={{ backgroundColor: `#${bg}` }}>
              <p className="font-semibold mb-2" style={{ color: `#${headingText}` }}>Delivery Address:</p>
              <p style={{ color: `#${text}` }}>
                {address.name}, {address.street}, {address.city} - {address.pincode}
              </p>
              <p className="mt-2" style={{ color: `#${text}` }}>Phone: {address.phone}</p>
            </div>
            <NavLink to="/customer-products">
              <button 
                className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                style={{ 
                  backgroundColor: `#${bbg}`,
                  color: `#${bg}`,
                  boxShadow: `0 4px 15px #${bbg}40`
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = `#${bbgHover}`;
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = `#${bbg}`;
                }}
              >
                Continue Shopping
              </button>
            </NavLink>
          </div>
        )}
      </div>

      {/* Background Elements */}
      <div 
        className="fixed top-1/4 -left-20 w-40 h-40 rounded-full opacity-5 -z-10"
        style={{ backgroundColor: `#${bbg}` }}
      ></div>
      <div 
        className="fixed bottom-1/4 -right-20 w-48 h-48 rounded-full opacity-5 -z-10"
        style={{ backgroundColor: `#${headingText}` }}
      ></div>
    </div>
  );
};