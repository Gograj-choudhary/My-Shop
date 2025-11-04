import { FaUser, FaEnvelope, FaComment, FaPaperPlane, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export const Contect = () => {
  const bg = import.meta.env.VITE_BG; 
  const bg2 = import.meta.env.VITE_BG2;  
  const bbg = import.meta.env.VITE_BBG;
  const bbgHover = import.meta.env.VITE_BBG_HOVER;
  const headingText = import.meta.env.VITE_HEADING_TEXT;
  const text = import.meta.env.VITE_TEXT;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  const contactInfo = [
    {
      icon: <FaPhone className="w-5 h-5" />,
      title: "Phone",
      details: "+91 9887581781",
      description: "Mon to Fri 9am to 6pm"
    },
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      title: "Email",
      details: "gograjchoudhary781@gmail.com",
      description: "Send us your query anytime!"
    },
    // {
    //   icon: <FaMapMarkerAlt className="w-5 h-5" />,
    //   title: "Address",
    //   details: "123 Fashion Street",
    //   description: "Mumbai, India - 400001"
    // },
    {
      icon: <FaClock className="w-5 h-5" />,
      title: "Working Hours",
      details: "Monday To Friday",
      description: "9:00 AM - 8:00 PM"
    }
  ];

  return (
    <section 
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: `#${bg}` }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: `#${headingText}` }}
          >
            Get In Touch
          </h1>
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto opacity-90"
            style={{ color: `#${text}` }}
          >
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div 
              className="rounded-2xl backdrop-blur-sm border p-8 h-full"
              style={{ 
                backgroundColor: `#${bg2 || bg}DD`,
                borderColor: `#${bbg}20`
              }}
            >
              <h2 
                className="text-2xl font-bold mb-6 flex items-center gap-3"
                style={{ color: `#${headingText}` }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `#${bbg}20` }}
                >
                  <FaComment className="w-5 h-5" style={{ color: `#${bbg}` }} />
                </div>
                Contact Info
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                      style={{ backgroundColor: `#${bbg}20` }}
                    >
                      <div style={{ color: `#${bbg}` }}>
                        {info.icon}
                      </div>
                    </div>
                    <div>
                      <h3 
                        className="font-semibold text-lg mb-1"
                        style={{ color: `#${headingText}` }}
                      >
                        {info.title}
                      </h3>
                      <p 
                        className="font-medium mb-1"
                        style={{ color: `#${text}` }}
                      >
                        {info.details}
                      </p>
                      <p 
                        className="text-sm opacity-75"
                        style={{ color: `#${text}` }}
                      >
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div 
                className="mt-8 p-4 rounded-xl border"
                style={{ 
                  backgroundColor: `#${bbg}10`,
                  borderColor: `#${bbg}20`
                }}
              >
                <p 
                  className="text-sm text-center"
                  style={{ color: `#${text}` }}
                >
                   We typically respond within 2 hours during business days
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div 
              className="rounded-2xl backdrop-blur-sm border p-8"
              style={{ 
                backgroundColor: `#${bg2 || bg}DD`,
                borderColor: `#${bbg}20`,
                boxShadow: `0 8px 32px #${bbg}10`
              }}
            >
              <h2 
                className="text-2xl font-bold mb-6 flex items-center gap-3"
                style={{ color: `#${headingText}` }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `#${bbg}20` }}
                >
                  <FaPaperPlane className="w-5 h-5" style={{ color: `#${bbg}` }} />
                </div>
                Send us a Message
              </h2>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label 
                    className="block text-sm font-semibold mb-3 flex items-center gap-2"
                    style={{ color: `#${headingText}` }}
                  >
                    <FaUser className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
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
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label 
                    className="block text-sm font-semibold mb-3 flex items-center gap-2"
                    style={{ color: `#${headingText}` }}
                  >
                    <FaEnvelope className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
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
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label 
                    className="block text-sm font-semibold mb-3 flex items-center gap-2"
                    style={{ color: `#${headingText}` }}
                  >
                    <FaComment className="w-4 h-4" />
                    Your Message
                  </label>
                  <textarea
                    placeholder="Tell us how we can help you..."
                    name="message"
                    rows="6"
                    required
                    className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 resize-none"
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

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3"
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
                  <FaPaperPlane className="w-5 h-5" />
                  Send Message
                </button>
              </form>

              {/* Form Footer */}
              <div 
                className="mt-6 p-4 rounded-xl text-center"
                style={{ 
                  backgroundColor: `#${bbg}10`,
                  border: `1px solid #${bbg}20`
                }}
              >
                <p 
                  className="text-sm"
                  style={{ color: `#${text}` }}
                >
                   Your information is safe with us. We respect your privacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};