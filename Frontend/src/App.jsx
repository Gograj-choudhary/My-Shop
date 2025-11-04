import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./Pages/Home"
import { AppLayout } from "./components/layout/AppLayout"
import { About } from "./Pages/About"
import { Product } from "./Pages/Product"
import { Contect } from "./Pages/Contect"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ProductDetails } from "./components/UI/ProductDetails"
import { AdminReg } from "./Pages/AdminReg"
import { AdminLogin } from "./Pages/AdminLogin";
import { AddProduct } from "./Pages/AddProduct";
import { UpdateProduct } from "./Pages/UpdateProduct";
import { AllProducts } from "./Pages/customerPages/AllProducts";
import { ProductDetailsCard } from "./Pages/customerPages/ProductDetailsCard";
import { CustomerLogin } from "./Pages/customerPages/CustomerLogin";
import { CustomerReg } from "./Pages/customerPages/CustomerReg";
import { GoogleAuthSuccess } from "./Pages/customerPages/GoogleAuthSuccess";
import { AllCartItems } from "./Pages/customerPages/AllCartItems";
import { AllOrders } from "./Pages/customerPages/AllOrders";
import { AiSearchBox } from "./Pages/customerPages/AiSearchBox";


const App =()=>{
     const queryClient = new QueryClient();
     const router = createBrowserRouter([
      {
        path: "/",
        element: <AppLayout/>,
        children: [
          {
            path: "/",
            element: <Home/>
          },
          {
            path: "/about",
            element: <About/>
          },
          {
            path: "/Be-Seller",
            element: <Product/>
          },
          {
            path: "/product/:id",
            element: <ProductDetails/>
          },
          {
            path: "/contact",
            element: <Contect/>

          },
          {
            path: "/admin-reg",
            element:<AdminReg/>
          },
          {
            path: "/admin-login",
            element:<AdminLogin/>
          },
          {
            path: "/add-product",
            element: <AddProduct/>
          },
          {
            path: "update-product/:id",
            element: <UpdateProduct/>
          },
          {
            path: "/customer-reg",
            element: <CustomerReg/>
          },
          {
            path: "/customer-login",
            element: <CustomerLogin/>
          },
          {
            path: "/google-auth-success",
            element: <GoogleAuthSuccess/>
          },
          {
            path: "/Customer-products",
            element: <AllProducts/>
          },
          {
            path: "/products/:id",
            element: <ProductDetailsCard/>
          },
          {
            path: "/cart-items",
            element: <AllCartItems/>
          },
          {
            path:"/customer-orders",
            element: <AllOrders/>
          },
          {
            path: "/ai-filtered-products",
            element: <AiSearchBox/>
          },
        ]
      }
     ])
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
