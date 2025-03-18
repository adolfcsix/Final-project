import React, { useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: "$1000", stock: 10, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Smartphone", price: "$500", stock: 20, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Headphones", price: "$100", stock: 30, image: "https://via.placeholder.com/150" },
  ]);

  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", image: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.image) return;
    setProducts([...products, { id: products.length + 1, ...newProduct }]);
    setNewProduct({ name: "", price: "", stock: "", image: "" });
  };

  const updateProduct = () => {
    setProducts(products.map((product) => (product.id === editingProduct.id ? editingProduct : product)));
    setEditingProduct(null);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products Management</h1>

      {/* Form thêm/sửa sản phẩm */}
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Product Name"
          className="border p-2 rounded w-1/5"
          value={editingProduct ? editingProduct.name : newProduct.name}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, name: e.target.value })
              : setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Price"
          className="border p-2 rounded w-1/5"
          value={editingProduct ? editingProduct.price : newProduct.price}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, price: e.target.value })
              : setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Stock"
          className="border p-2 rounded w-1/5"
          value={editingProduct ? editingProduct.stock : newProduct.stock}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, stock: e.target.value })
              : setNewProduct({ ...newProduct, stock: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          className="border p-2 rounded w-1/5"
          value={editingProduct ? editingProduct.image : newProduct.image}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, image: e.target.value })
              : setNewProduct({ ...newProduct, image: e.target.value })
          }
        />
        {editingProduct ? (
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={updateProduct}>
            Update
          </button>
        ) : (
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={addProduct}>
            Add
          </button>
        )}
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md text-center">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">{product.price}</p>
            <p className="text-gray-500">Stock: {product.stock}</p>
            <button
              className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded"
              onClick={() => setEditingProduct(product)}
            >
              Edit
            </button>
            <button
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded ml-2"
              onClick={() => deleteProduct(product.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
