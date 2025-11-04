import { AdminRegistration } from "../api/adminApi";
import { NavLink, useNavigate } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";

export const AdminReg = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useAdmin(AdminRegistration);

  const handleAdminRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Admin data", data);

    mutate(data, {
      onSuccess: (responseData) => {
        console.log("admin data", responseData);
        navigate("/admin-login");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register as Seller</h1>

        {isError && (
          <p className="bg-red-600 text-white px-4 py-2 mb-4 rounded">
            {error?.response?.data?.error || "Error in registration"}
          </p>
        )}

        <form onSubmit={handleAdminRegister} className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              autoComplete="off"
              required
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              required
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              autoComplete="off"
              required
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded font-semibold"
          >
            {isPending ? "Registering..." : "Submit"}
          </button>

          <p>Already Register? <NavLink to="/admin-login">Login</NavLink></p>
        </form>
      </div>
    </div>
  );
};
