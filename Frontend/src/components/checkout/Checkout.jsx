import React from "react";
import { useLocation } from "react-router-dom";
import "./Checkout.scss";

const Checkout = () => {
  const location = useLocation(); // Access the state passed via navigate
  const { product } = location.state || {}; // Destructure product from state

  // Dummy user data
  const user = {
    name: "John Doe",
    address: "1234 Main Street, City, Country",
    points: 120, // Points the user has earned
  };

  // Calculate discount based on points (for example: 1 point = ₹1 discount)
  const discount = user.points;

  if (!product) {
    return <p>No product data found!</p>;
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-details">
        <h3>Product Title: {product.title}</h3>
        <p>Category: {product.category}</p>
        <p>Price: ₹{product.price}</p>
        <img
          src={product.image}
          alt={product.title}
          className="checkout-product-image"
        />

        <div className="user-info">
          <h4>User Information</h4>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Points Earned:</strong> {user.points}</p>
          <p><strong>Discount Available:</strong> ₹{discount}</p>
        </div>

        <button className="confirm-purchase-button">Confirm Purchase</button>
      </div>
    </div>
  );
};

export default Checkout;
