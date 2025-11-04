import { NavLink, useNavigate } from "react-router-dom";
import { customerRegistration } from "../../api/customerApi";
import { useCustomer } from "../../hooks/useCustomer";

export const CustomerReg = () => {
  const bg = import.meta.env.VITE_BG; 
  const bg2 = import.meta.env.VITE_BG2;  
  const bbg = import.meta.env.VITE_BBG;
  const bbgHover = import.meta.env.VITE_BBG_HOVER;
  const headingText = import.meta.env.VITE_HEADING_TEXT;
  const text = import.meta.env.VITE_TEXT;

  const navigate = useNavigate();
  const { mutate: NormalReg, isPending, isError, error } = useCustomer(customerRegistration);

  const handleCustomerRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Customer data", data);

    NormalReg(data, {
      onSuccess: (responseData) => {
        console.log("Customer data", responseData);
        navigate("/customer-login");
      },
    });
  };

  const handleGoogleReg = () => {
    sessionStorage.setItem('redirectAfterLogin', '/customer-products');
    window.location.href = 'http://localhost:3000/api/v1/auth/google';
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ backgroundColor: `#${bg}` }}
    >
      {/* Background Elements */}
      <div 
        className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-5"
        style={{ backgroundColor: `#${bbg}` }}
      ></div>
      <div 
        className="absolute bottom-10 left-10 w-40 h-40 rounded-full opacity-5"
        style={{ backgroundColor: `#${headingText}` }}
      ></div>
      <div 
        className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full opacity-3"
        style={{ backgroundColor: `#${bbgHover}` }}
      ></div>

      <div 
        className="w-full max-w-lg rounded-3xl backdrop-blur-sm border shadow-2xl p-8 transform transition-all duration-300 hover:shadow-xl"
        style={{ 
          backgroundColor: `#${bg2 || bg}DD`,
          borderColor: `#${bbg}20`,
          boxShadow: `0 25px 50px -12px #${bbg}25`
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: `#${bbg}20` }}
          >
            <svg 
              className="w-10 h-10" 
              style={{ color: `#${bbg}` }} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: `#${headingText}` }}
          >
            Join Our Community
          </h1>
          <p 
            className="text-lg opacity-90"
            style={{ color: `#${text}` }}
          >
            Create your account and start shopping
          </p>
        </div>

        {/* Error Message */}
        {isError && (
          <div 
            className="mb-6 p-4 rounded-xl border text-center"
            style={{ 
              backgroundColor: `#${bbg}15`,
              borderColor: `#${bbg}40`,
              color: `#${bbg}`
            }}
          >
            {error?.response?.data?.error || "Registration failed. Please try again."}
          </div>
        )}

        <form onSubmit={handleCustomerRegister} className="space-y-5">
          {/* Name Input */}
          <div>
            <label 
              className="block text-sm font-semibold mb-3"
              style={{ color: `#${headingText}` }}
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              autoComplete="off"
              required
              className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
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
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Input */}
          <div>
            <label 
              className="block text-sm font-semibold mb-3"
              style={{ color: `#${headingText}` }}
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              required
              className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
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
              placeholder="Enter your email address"
            />
          </div>

          {/* Phone Input */}
          <div>
            <label 
              className="block text-sm font-semibold mb-3"
              style={{ color: `#${headingText}` }}
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              autoComplete="off"
              required
              className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
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
              placeholder="Enter your phone number"
            />
          </div>

          {/* Password Input */}
          <div>
            <label 
              className="block text-sm font-semibold mb-3"
              style={{ color: `#${headingText}` }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              required
              className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
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
              placeholder="Create a strong password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            style={{ 
              backgroundColor: `#${bbg}`,
              color: `#${bg}`,
              boxShadow: `0 8px 25px #${bbg}40`
            }}
            onMouseOver={(e) => {
              if (!isPending) {
                e.target.style.backgroundColor = `#${bbgHover}`;
              }
            }}
            onMouseOut={(e) => {
              if (!isPending) {
                e.target.style.backgroundColor = `#${bbg}`;
              }
            }}
          >
            {isPending ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Account...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Create Account
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t" style={{ borderColor: `#${bbg}20` }}></div>
          <span 
            className="px-3 text-sm"
            style={{ color: `#${text}` }}
          >
            Or register with
          </span>
          <div className="flex-1 border-t" style={{ borderColor: `#${bbg}20` }}></div>
        </div>

        {/* Google Register Button */}
        <button
          onClick={handleGoogleReg}
          className="w-full py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 border flex items-center justify-center gap-3 mb-6"
          style={{
            backgroundColor: `#${bg}`,
            borderColor: `#${bbg}30`,
            color: `#${text}`,
            boxShadow: `0 2px 8px #${bbg}10`
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = `#${bbg}10`;
            e.target.style.borderColor = `#${bbg}40`;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = `#${bg}`;
            e.target.style.borderColor = `#${bbg}30`;
          }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        {/* Login Link */}
        <div 
          className="text-center pt-6 border-t"
          style={{ borderColor: `#${bbg}20` }}
        >
          <p 
            className="text-base"
            style={{ color: `#${text}` }}
          >
            Already have an account?{" "}
            <NavLink 
              to="/customer-login" 
              className="font-semibold transition-all duration-200 hover:underline"
              style={{ color: `#${bbg}` }}
            >
              Sign In
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};