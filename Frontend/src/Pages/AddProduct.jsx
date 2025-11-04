import { ProductAdd } from "../api/adminApi";
import { NavLink, useNavigate } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";
import { useState } from "react";

export const AddProduct = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useAdmin(ProductAdd);
  const [imagePreview, setImagePreview] = useState(null);

  const handleProductAdd = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Validate price is a number
    if (isNaN(data.prize) || data.prize <= 0) {
      alert("Please enter a valid price");
      return;
    }
    
    console.log("product data", data);

    mutate(data, {
      onSuccess: (responseData) => {
        console.log("product added successfully", responseData);
        // Reset form
        e.target.reset();
        setImagePreview(null);
        // Navigate back to products page
        navigate("/be-seller");
      },
      onError: (error) => {
        console.error("Error adding product:", error);
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    if (url) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Add Product</h1>
          <NavLink 
            to="/be-seller" 
            className="text-blue-400 hover:text-blue-300 underline"
          >
            ← Back to Products
          </NavLink>
        </div>

        {isError && (
          <div className="bg-red-600 text-white px-4 py-2 mb-4 rounded">
            {error?.response?.data?.error || "Error in Product Adding"}
          </div>
        )}

        <form onSubmit={handleProductAdd} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block mb-1 font-medium">Product Name *</label>
            <input
              type="text"
              name="name"
              autoComplete="off"
              required
              placeholder="Enter product name"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* About */}
          <div>
            <label className="block mb-1 font-medium">About *</label>
            <textarea
              name="about"
              autoComplete="off"
              required
              rows="3"
              placeholder="Describe the product..."
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-medium">Price *</label>
            <input
              type="number"
              name="prize"
              autoComplete="off"
              required
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-1 font-medium">Gender *</label>
            <select
              name="gender"
              required
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="Men">Men</option>
              <option value="Woman">Woman</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-1 font-medium">Product Image URL *</label>
            <input
              type="url"
              name="image"
              autoComplete="off"
              required
              placeholder="https://example.com/image.jpg"
              onChange={handleImageUrlChange}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-400 mt-1">
              Enter a valid URL for the product image
            </p>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div>
              <label className="block mb-1 font-medium">Image Preview</label>
              <div className="border border-gray-600 rounded p-2 bg-gray-700">
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="w-full h-48 object-cover rounded"
                  onError={() => {
                    setImagePreview(null);
                    alert("Invalid image URL. Please check the URL and try again.");
                  }}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-3 px-4 rounded font-semibold transition-colors ${
              isPending
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            }`}
          >
            {isPending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding Product...
              </span>
            ) : (
              "Add Product"
            )}
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => navigate("/be-seller")}
            className="w-full bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded font-semibold transition-colors"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};