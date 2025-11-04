import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const adminApi = axios.create({
    baseURL: `${backendUrl}/admin`
});



export const AdminRegistration= async(data)=>{
    const res = await adminApi.post("/register", data);
    return res.data;
};


export const LoginAdmin = async(data)=>{
    const res = await adminApi.post("/login", data);
    return res.data;
}


adminApi.interceptors.request.use((config)=>{
    const token = localStorage.getItem("accessToken");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
  (error)=>{
    return Promise.reject(error); 
});


export const ProductAdd = async(data)=>{
    const res = await adminApi.post("/products", data);
    return res.data;
}

export const GetAllProducts = async () =>{
    const res = await adminApi.get("/products/my-products");
    return res.data;
}

export const GetProductDetails = async (id) => {
    const res = await adminApi.get(`/products/${id}`);
    return res.data;
}


export const DeleteProduct = async(id) => {
    const res = await adminApi.delete(`/products/delete/${id}`);
    return res.data;
}


export const ProductUpdate = async({id, data}) => {
    const res = await adminApi.put(`products/update/${id}`, data);
    return res.data;
}