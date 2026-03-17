const getProducts = async () => {
  const res = await fetch("/api/products");
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch products");
  }
  const data = await res.json();
  return data.data.products;
};
