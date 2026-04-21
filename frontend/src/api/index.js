import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { COOKIES, API_BASE_URL } from "../config/constants";

const BASE_URL = API_BASE_URL;

/**
 * Centralized API wrapper with error handling and authentication
 */
const connect = async (method, url, json, formData, body, options = {}) => {
  const token = Cookies.get(COOKIES.authToken);
  
  let headers;
  if (formData) {
    headers = {
      Authorization: token ? `laptop_resell ${token}` : "",
    };
  } else {
    headers = {
      Authorization: token ? `laptop_resell ${token}` : "",
      "Content-Type": "application/json",
    };
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: method,
      headers: headers,
      body: body,
    });

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      // If it's HTML (error page), throw a meaningful error
      if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
        throw {
          statusCode: response.status,
          message: `Server error: Received HTML instead of JSON. Status: ${response.status}`,
          data: { message: "Server error. Please check if backend is running." }
        };
      }
      // Try to parse as JSON anyway
      try {
        const result = JSON.parse(text);
        throw {
          ...result,
          statusCode: response.status,
          ok: result.success || false,
        };
      } catch (parseError) {
        throw {
          statusCode: response.status,
          message: text || `Server error: ${response.status}`,
          data: { message: text || "Unknown server error" }
        };
      }
    }

    const result = await response.json();
    const results = {
      ...result,
      statusCode: response.status,
      ok: result.success,
      headers: response.headers,
      bodyUsed: response.bodyUsed,
    };

    if (results.success) {
      return results;
    } else {
      throw results;
    }
  } catch (error) {
    // Handle network errors first
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      if (!options.suppressNetworkError) {
        toast.error("Network error. Please check your internet connection.");
      }
      return null;
    }

    // Handle JSON parse errors (when server returns HTML instead of JSON)
    if (error instanceof SyntaxError && error.message.includes("JSON")) {
      toast.error("Server error: Backend returned invalid response. Please check if backend is running.");
      return null;
    }

    // Only handle authentication errors for 401 status code specifically
    // Don't trigger session expired for database errors, network issues, etc.
    if (error?.statusCode === 401) {
      const token = Cookies.get(COOKIES.authToken);
      // Only show session expired if user was actually logged in
      if (token) {
        Cookies.remove(COOKIES.authToken);
        Cookies.remove(COOKIES.userId);
        toast.error("Session expired. Please login again.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
        return null;
      }
    }

    // For 403 forbidden errors (not authenticated)
    if (error?.statusCode === 403) {
      const rawMsg = error?.message || "";
      if (rawMsg.toLowerCase().includes("not authenticated")) {
        toast.error("Please login to continue.");
        return null;
      }
    }

    // Show error message from server if available
    const errorMessage = error?.message || error?.data?.message || "An error occurred. Please try again.";
    toast.error(errorMessage);
    
    throw error;
  }
};

/**
 * API methods object with all HTTP methods
 */
export const api = {
  // GET requests
  get: async (url) => connect("GET", url, true, false),
  getSilent: async (url) => connect("GET", url, true, false, undefined, { suppressNetworkError: true }),
  getData: async (url) => connect("GET", url, false, false),
  
  // POST requests
  post: async (url, body) => connect("POST", url, true, false, JSON.stringify(body)),
  postData: async (url, formData) => connect("POST", url, true, true, formData),
  
  // PUT requests
  put: async (url, body) => connect("PUT", url, true, false, JSON.stringify(body)),
  putData: async (url, formData) => connect("PUT", url, true, true, formData),
  
  // PATCH requests
  patch: async (url, body) => connect("PATCH", url, true, false, JSON.stringify(body)),
  
  // DELETE requests
  delete: async (url, body) => connect("DELETE", url, true, false, body ? JSON.stringify(body) : null),
};

export default api;



