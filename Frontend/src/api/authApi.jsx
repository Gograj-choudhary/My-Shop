import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const authApi = axios.create({
  baseURL: `${backendUrl}/auth`,
});

export const LoginWithGoogle  = async () => {
  window.location.href = `${backendUrl}/auth/google`;
};

// export const GoogleLoginCallback  = async () => {
//   const res = await authApi.get("/google/callback"); 
//   return res.data; 
// };


// Request interceptor to attach access token
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to refresh access token if expired
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await authApi.post('/refresh-token', {
            token: refreshToken,
          });

          const { accessToken } = response.data;
          localStorage.setItem('accessToken', accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return authApi(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/admin-login';
          return Promise.reject(refreshError);
        }
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/admin-login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);


export const verifyToToken = async () => {
  const res = await authApi.post("/verify-token"); 
  return res.data.user; 
};

export default authApi;
