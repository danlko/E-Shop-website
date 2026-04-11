import { useState } from "react";
import { useProducts } from "../ProductContext/ProductContext";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import Select from "../SelectButton/Select";
import ProductCard from "../ProductCard/ProductCard";
import Search from "../Search/Search";
import Loader from "../Loader/Loader";

function CatalogPage() {
  const { products, fetchProducts, isLoading } = useProducts();

  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [search, setSearch] = useState("");

  const [tempColor, setTempColor] = useState("");
  const [tempSize, setTempSize] = useState("");
  const [tempSearch, setTempSearch] = useState("");

  const uniqueColors = [...new Set(products.map((p) => p.color))];
  const colorOptions = uniqueColors.map((c) => ({ value: c, label: c }));

  const uniqueSizes = [...new Set(products.map((p) => p.size))];
  const sizeOptions = uniqueSizes.map((s) => ({ value: s, label: s }));

  const applyFilters = (useSearch = true) => {
    setColor(tempColor);
    setSize(tempSize);
    if (useSearch) setSearch(tempSearch);
    const params = {};
    if (tempColor) params.color = tempColor;
    if (tempSize) params.size = tempSize;
    if (useSearch && tempSearch) params.q = tempSearch;
    fetchProducts(params);
  };

  const clearFilters = () => {
    setTempColor("");
    setTempSize("");
    setTempSearch("");
    setColor("");
    setSize("");
    setSearch("");
    fetchProducts();
  };

  const filteredProducts = products
    .filter((p) => (color ? p.color === color : true))
    .filter((p) => (size ? p.size === size : true))
    .filter((p) =>
      search ? p.name.toLowerCase().includes(search.toLowerCase()) : true
    );

  return (
    <div className="container my-5">
      <div className="d-flex flex-wrap gap-2 mb-4 justify-content-center align-items-center">
        <Search
          onSearch={(value) => {
            setTempSearch(value);
            setSearch(value);
            const params = {};
            if (tempColor) params.color = tempColor;
            if (tempSize) params.size = tempSize;
            if (value) params.q = value;
            fetchProducts(params);
          }}
        />

        <Select
          label="Color"
          options={colorOptions}
          value={tempColor}
          onChange={setTempColor}
        />

        <Select
          label="Size"
          options={sizeOptions}
          value={tempSize}
          onChange={setTempSize}
        />

        <PrimaryButton
          text="Apply Filters"
          onClick={() => applyFilters(true)}
        />

        <PrimaryButton
          text="Clear"
          className="btn btn-secondary"
          onClick={clearFilters}
        />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="row g-4 justify-content-center">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl || product.image}
                color={product.color}
                size={product.size}
                showButton={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CatalogPage;
