import { api } from "../Components/common/apiWrapper";

export const getAllProductsAPI = async () => {
  try {
    const response = await api.get("/products/get-all-products");
    if (response?.ok) {
      return response;
    } else {
      throw response?.message || "An error occurred while fetching products.";
    }
  } catch (error) {
    throw error;
  }
}

export const getProductByIdAPI = async (id) => {
  try {
    const response = await api.get(`/products/get-product/${id}`);
    if (response.ok) {
      return response;
    } else {
      throw response?.message || "An error occurred while fetching the product by id.";
    }
  } catch (error) {
    throw error;
  }
}

export const createProductAPI = async (productData) => {
  try {
    const response = await api.post("/products/create-product", productData);
    if (response.ok) {
      return response;
    } else {
      throw response?.message || "An error occurred while creating the product.";
    }
  } catch (error) {
    throw error;
  }
}

export const updateProductAPI = async (id, productData) => {
  try {
    const response = await api.put(`/products/update-product/${id}`, productData);
    if (response?.ok) {
      return response;
    } else {
      throw response?.message || "An error occurred while updating the product by Id";
    }
  } catch (error) {
    throw error;
  }
}

export const deleteProductAPI = async (id) => {
  try {
    const response = await api.delete(`/products/delete-product/${id}`);
    if (response?.ok) {
      return response;
    } else {
      throw response?.message || "An error occurred while deleting the product.";
    }
  } catch (error) {
    throw error;
  }
}
