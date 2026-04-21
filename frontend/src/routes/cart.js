import {api} from "../Components/common/apiWrapper";

export const addCartAPI = async (payload) => {
  try {
    const response = await api.post("/cart/add", payload);
    if (response?.ok) {
      return response;
    } else {
      throw response?.message || "An error occurred while adding the product in cart.";
    }
  } catch (error) {
    throw error;
  }
}

export const removeCartAPI = async (payload) => {
  try {
    const response = await api.post("/cart/remove", payload);
    if (response?.ok) {
      return response;
    } else {
      throw response?.message || "An error occurred while removing the product from cart.";
    }
  } catch (error) {
    throw error;
  }
}

export const getCartAPI = async () => {
  try {
    const response = await api.get("/cart/get");
    if (response?.ok) {
      return response;
    } else {
      throw response?.message || "An error occurred while fetching all products from the wishlist.";
    }
  } catch (error) {
    throw error;
  }
}