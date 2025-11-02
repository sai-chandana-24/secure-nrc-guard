import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // This matches the proxy path, not full backend URL
  withCredentials: true, // if using cookies (optional)
});

// ✅ Add JWT token automatically (from localStorage)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Optional: Handle expired tokens globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Redirecting to login...");
      // Optionally: redirect to login or clear auth state
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
