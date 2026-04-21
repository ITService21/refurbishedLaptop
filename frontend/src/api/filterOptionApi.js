import { api } from "./index";

export const filterOptionApi = {
  getAll: () => api.getSilent("/filter-options"),
  getByType: (type) => api.getSilent(`/filter-options/${type}`),
  search: (type, query) => api.getSilent(`/filter-options/${type}/search?q=${encodeURIComponent(query)}`),
  create: (data) => api.post("/filter-options", data),
  update: (id, data) => api.put(`/filter-options/${id}`, data),
  remove: (id) => api.delete(`/filter-options/${id}`),
};

export default filterOptionApi;
