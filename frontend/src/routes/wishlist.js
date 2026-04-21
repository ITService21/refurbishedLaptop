import {api} from "../Components/common/apiWrapper";

export const addWishlistAPI = async (payload) => {
  try {
    const response = await api.post("/wishlist/add", payload);
    if (response?.ok) {
      return response;
    } else {
      throw response?.message || "An error occurred while adding the product in wishlist.";
    }
  } catch (error) {
    throw error;
  }
}

export const removeWishlistAPI = async (payload) => {
  try {
    const response = await api.post("/wishlist/remove", payload);
    if (response?.ok) {
      return response;
    } else {
      throw response?.message || "An error occurred while removing the product from wishlist.";
    }
  } catch (error) {
    throw error;
  }
}

export const getWishlistAPI = async () => {
  try {
    const response = await api.get("/wishlist/get");
    if (response?.ok) {
      return response;
    } else {
      throw response?.message || "An error occurred while fetching all products from the wishlist.";
    }
  } catch (error) {
    throw error;
  }
}