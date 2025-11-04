import { useEffect, useState, useTransition } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { DeleteProduct, GetProductDetails } from "../../api/adminApi";
import { Loader } from "./Loader";

export const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        startTransition(async () => {
            try {
                setError(null);
                const res = await GetProductDetails(params.id);
                // Handle different response structures
                if (res?.data?.product) {
                    setProduct(res.data.product);
                } else if (res?.product) {
                    setProduct(res.product);
                } else if (res?.data) {
                    setProduct(res.data);
                } else {
                    setProduct(res);
                }
            } catch (err) {
                setError(err.message || "Failed to fetch product details");
                setProduct(null);
            }
        });
    }, [params.id]);

    if (isPending || !product) return <Loader />;

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-6 flex justify-center items-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Error Loading Product</h2>
                    <p className="text-red-600 mb-4">{error}</p>
                    <NavLink to="/be-seller">
                        <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded-lg">
                            Go Back to Products
                        </button>
                    </NavLink>
                </div>
            </div>
        );
    }

    const {
        id,
        name,
        about,
        prize,
        gender,
        image,
        adminName,
        adminId,
        createdAt,
        updatedAt
    } = product;

    // Format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'INR'
        }).format(price);
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Handle image error
    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/600x600?text=Product+Image+Not+Available';
    };

    // Handle delete product
    const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
        try {
            await DeleteProduct(id);
            alert("Product deleted successfully.");
            navigate('/be-seller');
        } catch (err) {
            console.error(err);
            alert("Failed to delete product.");
        }
    }
};

    // Handle update product
    const handleUpdate = () => {
        navigate(`/update-product/${id}`, { state: product });
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-6 flex justify-center items-center">
            <div className="w-full max-w-6xl bg-white dark:bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-2xl p-10 flex flex-col lg:flex-row gap-12 transition-all duration-300 min-h-[700px]">
                
                {/* Product Image */}
                <div className="w-full lg:w-1/2 flex justify-center items-start">
                    <div className="relative">
                        <img
                            src={image}
                            alt={name}
                            onError={handleImageError}
                            className="rounded-xl shadow-xl w-full max-w-lg object-cover border border-gray-300 dark:border-gray-700"
                        />
                        {/* Gender Badge */}
                        <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                gender === 'Men' 
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                    : 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
                            }`}>
                                {gender}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Product Details */}
                <div className="w-full lg:w-1/2 space-y-6">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-2">
                            {name}
                        </h1>
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                            {formatPrice(prize)}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 text-base md:text-lg">
                        <div>
                            <h3 className="font-semibold text-xl mb-2">Description:</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {about}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <p>
                                <span className="font-semibold">Category:</span> {gender}
                            </p>
                            {adminName && (
                                <p>
                                    <span className="font-semibold">Added by:</span> {adminName}
                                </p>
                            )}
                            {createdAt && (
                                <p>
                                    <span className="font-semibold">Added on:</span> {formatDate(createdAt)}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <button 
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition duration-300"
                            onClick={handleDelete}
                        >
                            Delete Product
                        </button>
                        <button 
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition duration-300"
                            onClick={handleUpdate}
                        >
                            Update Product
                        </button>
                    </div>

                    {/* Go Back Button */}
                    <div className="w-full mt-8 flex justify-center">
                        <NavLink to="/be-seller">
                            <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition duration-300">
                                ← Back to Products
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};