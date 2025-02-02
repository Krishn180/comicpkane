import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ products = [] }) => {
  const [selectedProducts, setSelectedProducts] = useState(products);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return selectedProducts
      .reduce((total, product) => {
        const price = parseFloat(
          product.price?.replace("$", "") || "0" // Fallback to 0 if price is invalid
        );
        return total + price;
      }, 0)
      .toFixed(2);
  };

  const handleRemove = (id) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const handleCompletePurchase = () => {
    if (selectedProducts.length === 0) {
      alert("Your cart is empty. Add items to complete the purchase.");
      return;
    }
    alert("Purchase completed!");
    navigate("/thank-you");
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8f8f8",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Checkout</h1>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "#fff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {selectedProducts.length > 0 ? (
          selectedProducts.map((product) => (
            <div
              key={product.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 20px",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: "16px" }}>{product.name}</h3>
                <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                  {product.price}
                </p>
              </div>
              <button
                style={{
                  padding: "5px 10px",
                  backgroundColor: "red",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
                onClick={() => handleRemove(product.id)}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            Your cart is empty. Add items to proceed.
          </p>
        )}
        <div
          style={{
            padding: "20px",
            textAlign: "right",
            borderTop: "1px solid #eee",
          }}
        >
          <h3>Total: ${calculateTotal()}</h3>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "green",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "10px",
            }}
            onClick={handleCompletePurchase}
          >
            Complete Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
