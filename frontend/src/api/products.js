import api from "./axios";

export async function getProducts(filters = {}) {
  const params = {};
  Object.keys(filters).forEach((k) => {
    const v = filters[k];
    if (v !== "" && v !== null && v !== undefined) params[k] = v;
  });

  const res = await api.get("/shoes", { params });
  return res.data;
}

export async function getProductById(id) {
  const res = await api.get(`/shoes/${id}`);
  return res.data;
}
