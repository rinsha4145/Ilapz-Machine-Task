import React from "react";
import { useSelector } from "react-redux";
import { Sheet, Table } from "@mui/joy";  // Example from MUI Joy, adjust if you use a different UI lib

export default function ProductTable() {
  // Get products from Redux store
  const products = useSelector((state) => state || []);
console.log(products)
  return (
    <Sheet variant="outlined" sx={{ width: "100%", overflowX: "auto" }}>
      <Table
        size="md"
        aria-label="product table"
        stickyHeader
        sx={{ minWidth: 650 }}
        variant="plain"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No products found.
              </td>
            </tr>
          )}

          {products.map((product) => (
            <tr key={product.id || product._id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>
                {/* Add your edit/delete buttons here */}
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
