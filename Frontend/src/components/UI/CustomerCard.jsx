import { GrUserManager } from "react-icons/gr";
export const CustomerCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600 text-sm">{product.about.slice(0, 60)}...</p>
      <p className="text-gray-800 font-medium mt-1">₹{product.prize}</p>
      {/* <p className="text-gray-500 text-sm">  {product.adminName}</p> */}
      <p className="text-gray-500 text-sm"> {product.gender}</p>
    </div>
  );
};
