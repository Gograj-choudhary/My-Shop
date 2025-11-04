import { useEffect, useState, useTransition } from "react"
import { ProductCard } from "../components/UI/ProductCard";
import { Loader } from "../components/UI/Loader";
import { SearchProduct } from "../components/UI/SearchProduct";
import { GetAllProducts} from "../api/adminApi";
import { allProductsGet } from "../api/customerApi";

export const Product = () => {
  const [isPending, startTransition] = useTransition();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 3;

  useEffect(() => {
    startTransition(async () => {
      try {
        setError(null);
        const res = await GetAllProducts();
        // const res = await allProductsGet();
        
        // Handle different possible response structures
        let productsData = [];
        
        if (res?.data?.products) {
          productsData = res.data.products;
        } else if (res?.products) {
          productsData = res.products;
        } else if (res?.data) {
          productsData = res.data;
        } else if (Array.isArray(res)) {
          productsData = res;
        } else {
          productsData = [];
        }
        
        setProducts(productsData || []);
      } catch (err) {
        setError(err.message || "Failed to fetch products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  // Reset to first page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  if (isPending || loading) return <Loader />;

  // Filter products by search term (product name)
  const filterBySearch = (product) => {
    if (!search) return true;
    return product.name?.toLowerCase().includes(search.toLowerCase());
  };

  // Filter products by gender category
  const filterByGender = (product) => {
    if (filter === "All") return true;
    return product.gender === filter;
  };

  // Apply both filters
  const filteredProducts = products.filter((product) => 
    filterBySearch(product) && filterByGender(product)
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Search and Filter Header */}
      <div className="w-full p-6 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <SearchProduct
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      )}

      {/* Products Content */}
      <div className="p-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            {products.length === 0 ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">No Products Available</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  There are no products to display at the moment.
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4">No Products Found</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  No products match your search criteria. Try adjusting your search or filter.
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Results Info */}
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
                {filter !== 'All' && ` in ${filter} category`}
                {search && ` matching "${search}"`}
              </p>
            </div>

            {/* Products Grid - Always 3 columns to show 3 products per page */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentProducts.map((product, index) => (
                <ProductCard 
                  product={product} 
                  key={product.id || `${currentPage}-${index}`} 
                />
              ))}
            </div>

            {/* Simple Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Previous
                </button>

                {/* Page Info */}
                <span className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Page {currentPage} of {totalPages}
                </span>

                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};