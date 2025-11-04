import { useEffect, useState } from "react";
import { getMyOrders } from "../../api/customerApi";
import { useCustomer } from "../../hooks/useCustomer";
import { Loader } from "../../components/UI/Loader";

export const AllOrders = () => {
  const bg = import.meta.env.VITE_BG; 
  const bg2 = import.meta.env.VITE_BG2;  
  const bbg = import.meta.env.VITE_BBG;
  const bbgHover = import.meta.env.VITE_BBG_HOVER;
  const headingText = import.meta.env.VITE_HEADING_TEXT;
  const text = import.meta.env.VITE_TEXT;

  const { mutate, isPending } = useCustomer(getMyOrders);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    mutate(undefined, {
      onSuccess: (response) => {
        if (response.success) {
          setOrders(response.orders);
        }
      },
      onError: (err) => console.log("Error fetching orders:", err),
    });
  }, []);

  if (isPending) return <Loader />;

  if (orders.length === 0) {
    return (
      <div 
        className="min-h-screen py-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: `#${bg}` }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <div 
            className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `#${bbg}20` }}
          >
            <svg className="w-16 h-16" style={{ color: `#${bbg}` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 
            className="text-3xl font-bold mb-4"
            style={{ color: `#${headingText}` }}
          >
            No Orders Yet
          </h2>
          <p className="text-lg mb-8" style={{ color: `#${text}` }}>
            Start shopping to see your orders here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: `#${bg}` }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: `#${headingText}` }}
          >
            My Orders
          </h1>
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto opacity-90"
            style={{ color: `#${text}` }}
          >
            Track and manage all your orders in one place
          </p>
        </div>

        {/* Orders Grid */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order.orderId} 
              className="rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:shadow-lg overflow-hidden"
              style={{ 
                backgroundColor: `#${bg2 || bg}DD`,
                borderColor: `#${bbg}20`
              }}
            >
              {/* Order Header */}
              <div 
                className="px-6 py-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                style={{ borderColor: `#${bbg}20` }}
              >
                <div>
                  <h3 className="font-bold text-lg" style={{ color: `#${headingText}` }}>
                    Order # {order.orderId}
                  </h3>
                  <p className="text-sm opacity-75" style={{ color: `#${text}` }}>
                    Ordered on {new Date(order.orderedAt).toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: order.paymentStatus === "Paid" ? `#${bbg}20` : `#${bbgHover}20`,
                      color: order.paymentStatus === "Paid" ? `#${bbg}` : `#${bbgHover}`
                    }}
                  >
                    {order.paymentStatus}
                  </span>
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: order.deliveryStatus === "Delivered" ? `#${bbg}20` : `#${bbgHover}20`,
                      color: order.deliveryStatus === "Delivered" ? `#${bbg}` : `#${bbgHover}`
                    }}
                  >
                    {order.deliveryStatus}
                  </span>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Product Info */}
                  <div className="lg:col-span-2">
                    <div className="flex flex-col sm:flex-row gap-6">
                      {order.product?.image && (
                        <img
                          src={order.product.image}
                          alt={order.product.name}
                          className="w-32 h-32 object-cover rounded-xl shadow-md flex-shrink-0"
                          onError={(e) => {
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'%3E%3Crect width='128' height='128' fill='%23" + (bg2 || bg).replace('#', '') + "'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial, sans-serif' font-size='14' fill='%23" + text.replace('#', '') + "' text-anchor='middle' dy='.3em'%3EProduct%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      )}
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-3" style={{ color: `#${headingText}` }}>
                          {order.product?.name || "Product not available"}
                        </h2>
                        <p className="text-lg mb-4 opacity-90" style={{ color: `#${text}` }}>
                          {order.product?.about}
                        </p>
                        <div className="flex flex-wrap gap-6">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: `#${bbg}` }}
                            ></div>
                            <span style={{ color: `#${text}` }}>Quantity: {order.quantity}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: `#${bbgHover}` }}
                            ></div>
                            <span className="font-bold text-xl" style={{ color: `#${headingText}` }}>
                              ₹{order.totalPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Meta */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2" style={{ color: `#${headingText}` }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Delivery Address
                      </h4>
                      <div className="text-sm" style={{ color: `#${text}` }}>
                        <p className="font-medium">{order.address?.name}</p>
                        <p>{order.address?.street}</p>
                        <p>{order.address?.city} - {order.address?.pincode}</p>
                        <p className="mt-1">📞 {order.address?.phone}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2" style={{ color: `#${headingText}` }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        Payment Details
                      </h4>
                      <div className="text-sm" style={{ color: `#${text}` }}>
                        <p>Method: {order.paymentMode || 'N/A'}</p>
                        <p>Status: <span style={{ 
                          color: order.paymentStatus === "Paid" ? `#${bbg}` : `#${bbgHover}` 
                        }}>{order.paymentStatus}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Footer */}
              <div 
                className="px-6 py-4 border-t flex justify-between items-center"
                style={{ borderColor: `#${bbg}20` }}
              >
                <p className="text-sm opacity-75" style={{ color: `#${text}` }}>
                  Ordered at: {new Date(order.orderedAt).toLocaleString('en-IN')}
                </p>
                <div className="flex items-center gap-2">
                  <div 
                    className={`w-3 h-3 rounded-full animate-pulse ${
                      order.deliveryStatus === "Delivered" ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                  ></div>
                  <span className="text-sm font-medium" style={{ color: `#${text}` }}>
                    {order.deliveryStatus}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Orders Summary */}
        <div 
          className="mt-12 p-6 rounded-2xl backdrop-blur-sm border text-center"
          style={{ 
            backgroundColor: `#${bg2 || bg}DD`,
            borderColor: `#${bbg}20`
          }}
        >
          <h3 className="text-xl font-bold mb-2" style={{ color: `#${headingText}` }}>
            Order Summary
          </h3>
          <p style={{ color: `#${text}` }}>
            You have <span className="font-bold" style={{ color: `#${bbg}` }}>{orders.length}</span> order{orders.length !== 1 ? 's' : ''} in total
          </p>
        </div>
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