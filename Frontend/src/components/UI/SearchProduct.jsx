import { NavLink, useNavigate } from "react-router-dom";
// You need to import these - adjust the path based on your project structure


import { useAuth } from "../../hooks/useAuth";
import { verifyToToken } from "../../api/authApi";

export const SearchProduct = ({ search, setSearch, filter, setFilter }) => {
  const handleSearchProduct = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterProduct = (e) => {
    setFilter(e.target.value);
  };

  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useAuth(verifyToToken);

  const handleNavigation = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/admin-login"); // customer login page by default
      return;
    }
    
    mutate(undefined, {
      onSuccess: (user) => {
        if (user.role === 'admin') {
          navigate("/add-product"); // Navigate to add product page for admin
        } else {
          navigate("/admin-reg");
        }
        console.log("role", user.role);
      },
      onError: () => {
        navigate("/admin-reg");
      }
    });
  };

  return (
    <section className="flex flex-col md:flex-row justify-between items-center gap-4">
      <input
        type="text"
        placeholder=" Search Product "
        value={search}
        onChange={handleSearchProduct}
        className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      <select
        value={filter}
        onChange={handleFilterProduct}
        className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      >
        <option value="All"> All</option>
        <option value="Men"> Men</option>
        <option value="Woman">Woman</option>
      </select>

      <button 
        onClick={handleNavigation}
        disabled={isPending}
        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {isPending ? "Loading..." : "Add Products"}
      </button>
    </section>
  );
};