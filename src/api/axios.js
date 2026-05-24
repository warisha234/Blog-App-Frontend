import axios from 'axios';

// 1. Base URL ke aakhiri mein '/api' add kar diya hai taake server.js ke routes match ho sakein
const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) {
    // Agar env variable ke aakhiri mein '/api' nahi hai toh add kar do
    return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
  }
  // Default URL mein bhi '/api' add kar diya
  return 'https://blog-app-backend-beta-six.vercel.app/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

// Request Interceptor: Token ko har request ke header mein add karne ke liye
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response Interceptor: 401 error par token refresh karne ke liye
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    
    // Agar token expire ho gaya ho (401) aur yeh retry request na ho
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        // Base URL nikalne ke liye taake bina '/api' ke origin mil sake
        const baseOrigin = import.meta.env.VITE_API_URL || 'https://blog-app-backend-beta-six.vercel.app';
        const cleanOrigin = baseOrigin.endsWith('/api') ? baseOrigin.replace('/api', '') : baseOrigin;

        // 2. Refresh token ki request ko sahi path (/api/auth/refresh) par bheja
        const { data } = await axios.post(
          `${cleanOrigin}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );
        
        localStorage.setItem('accessToken', data.accessToken);
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        
        // Purani request ko naye token ke sath dubara run karein
        return api(original);
      } catch (refreshError) {
        // Agar refresh token bhi expire ho chuka ho toh logout karwa do
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
