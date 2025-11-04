import { FaShippingFast, FaShieldAlt, FaHeadset, FaAward, FaUsers, FaHeart } from "react-icons/fa";
import { GiPriceTag } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export const About = () => {
  const bg = import.meta.env.VITE_BG; 
  const bg2 = import.meta.env.VITE_BG2;  
  const bbg = import.meta.env.VITE_BBG;
  const bbgHover = import.meta.env.VITE_BBG_HOVER;
  const headingText = import.meta.env.VITE_HEADING_TEXT;
  const text = import.meta.env.VITE_TEXT;

  const navigator = useNavigate();

  const features = [
    {
      icon: <FaShippingFast className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Free shipping on orders above ₹499. Delivery within 2-3 business days."
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Secure Payment",
      description: "100% secure payment processing with advanced encryption technology."
    },
    {
      icon: <GiPriceTag className="w-8 h-8" />,
      title: "Best Prices",
      description: "Competitive pricing with regular discounts and special offers."
    },
    {
      icon: <FaHeadset className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you anytime."
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "10K+", label: "Products Available" },
    { number: "100+", label: "Brand Partners" },
    { number: "5+", label: "Years Experience" }
  ];

  const team = [
    {
      name: "Aarav Sharma",
      role: "Founder & CEO",
      description: "Passionate about revolutionizing the e-commerce experience in India."
    },
    {
      name: "Priya Patel",
      role: "Head of Fashion",
      description: "Curating the latest trends with 8+ years in fashion industry."
    },
    {
      name: "Rohan Kumar",
      role: "Tech Lead",
      description: "Building seamless shopping experiences with cutting-edge technology."
    }
  ];

  return (
    <div 
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: `#${bg}` }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: `#${headingText}` }}
          >
            About My Shop
          </h1>
          <p 
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: `#${text}` }}
          >
            We are India's fastest growing online fashion and beauty destination. 
            Our mission is to make premium fashion accessible to everyone while 
            providing an exceptional shopping experience.
          </p>
        </div>

        {/* Stats Section */}
        <div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 p-8 rounded-2xl backdrop-blur-sm border"
          style={{ 
            backgroundColor: `#${bg2 || bg}DD`,
            borderColor: `#${bbg}20`
          }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div 
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: `#${bbg}` }}
              >
                {stat.number}
              </div>
              <div 
                className="text-sm md:text-base font-medium"
                style={{ color: `#${text}` }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Our Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ color: `#${headingText}` }}
            >
              Our Story
            </h2>
            <div className="space-y-4">
              <p 
                className="text-lg leading-relaxed"
                style={{ color: `#${text}` }}
              >
                Founded in 2024, My Shop started as a small boutique with a big vision - 
                to transform how Indians shop for fashion and beauty products. 
                We believed that everyone deserves access to quality products at affordable prices.
              </p>
              <p 
                className="text-lg leading-relaxed"
                style={{ color: `#${text}` }}
              >
                Today, we've grown into a trusted platform serving millions of customers 
                across India, offering everything from daily essentials to premium fashion 
                collections for men and women.
              </p>
              <p 
                className="text-lg leading-relaxed"
                style={{ color: `#${text}` }}
              >
                Our commitment to quality, customer satisfaction, and innovation 
                continues to drive us forward every day.
              </p>
            </div>
          </div>
          <div 
            className="rounded-2xl p-8 backdrop-blur-sm border h-full flex items-center justify-center"
            style={{ 
              backgroundColor: `#${bg2 || bg}DD`,
              borderColor: `#${bbg}20`,
              minHeight: '300px'
            }}
          >
            <div className="text-center">
              <FaHeart 
                className="w-16 h-16 mx-auto mb-4"
                style={{ color: `#${bbg}` }}
              />
              <p 
                className="text-xl font-semibold"
                style={{ color: `#${headingText}` }}
              >
                Built with Love for Fashion
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ color: `#${headingText}` }}
          >
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ 
                  backgroundColor: `#${bg2 || bg}DD`,
                  borderColor: `#${bbg}20`
                }}
              >
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto"
                  style={{ backgroundColor: `#${bbg}20` }}
                >
                  <div style={{ color: `#${bbg}` }}>
                    {feature.icon}
                  </div>
                </div>
                <h3 
                  className="text-xl font-semibold text-center mb-3"
                  style={{ color: `#${headingText}` }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-center text-sm leading-relaxed"
                  style={{ color: `#${text}` }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        {/* <div className="mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ color: `#${headingText}` }}
          >
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="rounded-2xl p-6 backdrop-blur-sm border text-center transition-all duration-300 hover:shadow-lg"
                style={{ 
                  backgroundColor: `#${bg2 || bg}DD`,
                  borderColor: `#${bbg}20`
                }}
              >
                <div 
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: `#${bbg}20` }}
                >
                  <FaUsers 
                    className="w-10 h-10"
                    style={{ color: `#${bbg}` }}
                  />
                </div>
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{ color: `#${headingText}` }}
                >
                  {member.name}
                </h3>
                <div 
                  className="text-sm font-medium mb-3"
                  style={{ color: `#${bbg}` }}
                >
                  {member.role}
                </div>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: `#${text}` }}
                >
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div 
            className="rounded-2xl p-8 backdrop-blur-sm border"
            style={{ 
              backgroundColor: `#${bg2 || bg}DD`,
              borderColor: `#${bbg}20`
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `#${bbg}20` }}
              >
                <FaAward className="w-6 h-6" style={{ color: `#${bbg}` }} />
              </div>
              <h3 
                className="text-2xl font-bold"
                style={{ color: `#${headingText}` }}
              >
                Our Mission
              </h3>
            </div>
            <p 
              className="text-lg leading-relaxed"
              style={{ color: `#${text}` }}
            >
              To democratize fashion by making premium quality products accessible 
              to everyone at affordable prices, while maintaining the highest standards 
              of customer service and satisfaction.
            </p>
          </div>

          <div 
            className="rounded-2xl p-8 backdrop-blur-sm border"
            style={{ 
              backgroundColor: `#${bg2 || bg}DD`,
              borderColor: `#${bbg}20`
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `#${bbg}20` }}
              >
                <FaAward className="w-6 h-6" style={{ color: `#${bbg}` }} />
              </div>
              <h3 
                className="text-2xl font-bold"
                style={{ color: `#${headingText}` }}
              >
                Our Vision
              </h3>
            </div>
            <p 
              className="text-lg leading-relaxed"
              style={{ color: `#${text}` }}
            >
              To become India's most loved fashion destination, known for our 
              exceptional quality, innovative shopping experience, and unwavering 
              commitment to our customers' happiness.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div 
          className="text-center mt-16 p-8 rounded-2xl backdrop-blur-sm border"
          style={{ 
            backgroundColor: `#${bg2 || bg}DD`,
            borderColor: `#${bbg}20`
          }}
        >
          <h2 
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ color: `#${headingText}` }}
          >
            Ready to Start Shopping?
          </h2>
          <p 
            className="text-lg mb-6 max-w-2xl mx-auto"
            style={{ color: `#${text}` }}
          >
            Join thousands of satisfied customers who trust us for their fashion and beauty needs.
          </p>
          <button
            className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
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
            onClick={()=> navigator("/customer-products")}
          >
            Start Shopping Now
          </button>
        </div>
      </div>
    </div>
  );
};