import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const customerApi = axios.create({
    baseURL: `${backendUrl}/customer`
});



export const customerRegistration= async(data)=>{
    const res = await customerApi.post("/register", data);
    return res.data;
};

export const LoginToCustomer= async(data)=>{
    const res = await customerApi.post("/login", data);
    return res.data;
};

export const allProductsGet= async()=>{
    const res = await customerApi.get("/products");
    return res.data;
};

export const aiFilteredProductsGet = async( {query} ) => {
    console.log("API Call with query:", query);
    const res = await customerApi.post("/products/ai-filter", { query});
    return res.data;
}

export const productDetailsGet = async( id )=> {
    const res = await customerApi.get(`/products/${id}`);
    return res.data;
}

customerApi.interceptors.request.use((config)=>{
    const token = localStorage.getItem("accessToken");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
  (error)=>{
    return Promise.reject(error); 
});

export const addProductToCart = async( productId )=> {
    const res = await customerApi.post("/products/add-cart", productId );
    return res.data; 
}

export const reduceProductToCart = async( productId )=> {
    const res = await customerApi.post("/products/reduce-cart", productId );
    return res.data; 
}

export const removeProductFromCart = async( productId )=> {
    const res = await customerApi.post("/products/remove-from-cart", productId );
    return res.data; 
}

export const getCartItems = async()=> {
    const res = await customerApi.get("/products/get-cart");
    return res.data; 
}

export const orderPlace = async( data )=> {
    const res = await customerApi.post("/products/place-order", data);
    return res.data; 
}

export const getMyOrders = async () => {
  const res = await customerApi.get("/products/get-order");
  return res.data;
};


