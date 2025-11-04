import { NavLink } from 'react-router-dom';

export const ProductCard = ({ product }) => {
  const { id, name, about, prize, gender, image, adminName } = product;

  // Handle image loading error
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
  };

  // Truncate description if too long
  const truncateText = (text, maxLength = 80) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + '...';
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  return (
    <li className="bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 backdrop-blur-md border border-gray-200 dark:border-gray-600 rounded-xl shadow-xl hover:scale-[1.03] transition-transform duration-300 overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            onError={handleImageError}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
          />
          {/* Gender Badge */}
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              gender === 'Men' 
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
            }`}>
              {gender}
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col flex-grow p-4 space-y-2">
          {/* Product Name */}
          <h1 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-2">
            {name}
          </h1>

          {/* Product Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow">
            {truncateText(about)}
          </p>

          {/* Product Info */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                {formatPrice(prize)}
              </span>
            </div>
            
            {adminName && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By: {adminName}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <NavLink 
              to={`/product/${id}`} 
              className="flex-1 bg-gray-900 dark:bg-gray-700 text-white text-center px-4 py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              View Details
            </NavLink>
            {/* <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              onClick={() => {
                // Add to cart functionality can be implemented here
                console.log('Add to cart:', product);
              }}
            >
              Add to Cart
            </button> */}
          </div>
        </div>
      </div>
    </li>
  );
};