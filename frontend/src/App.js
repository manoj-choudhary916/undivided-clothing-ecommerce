import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Add to Cart Function
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Calculate Total Price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Undivided Clothing Store</h1>

      <div style={{ display: "flex", gap: "30px" }}>

        {/* PRODUCT LIST */}
        <div style={{ flex: 3 }}>
          <h2>Products</h2>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {products.map(product => (
              <div key={product.id}
                   style={{
                     border: "1px solid #ccc",
                     padding: "10px",
                     width: "200px"
                   }}>

                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />

                <h3>{product.name}</h3>
                <p>₹ {product.price}</p>

                <button onClick={() => addToCart(product)}>
                  Add To Cart
                </button>

              </div>
            ))}
          </div>
        </div>

        {/* CART SECTION */}
        <div style={{ flex: 1, border: "1px solid black", padding: "10px" }}>
          <h2>Cart</h2>

          {cart.length === 0 && <p>No items in cart</p>}

          {cart.map((item, index) => (
            <div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
              <p>{item.name} - ₹{item.price}</p>

              <button onClick={() => {
                const newCart = cart.filter((_, i) => i !== index);
                setCart(newCart);
              }}>
                ❌
              </button>
            </div>
          ))}


          <hr />
          <h3>Total: ₹ {totalPrice}</h3>
          <button 
            style={{ marginTop: "10px" }}
            onClick={() => setCart([])}
          >
            Clear Cart
          </button>


          <button 
  style={{ marginTop: "10px", background: "green", color: "white", padding: "8px" }}
  onClick={() => {

    axios.post("http://localhost:5000/place-order", cart)
      .then(res => {
        alert("Order placed successfully!");
        setCart([]);
      })
      .catch(err => {
        console.log(err);
      });

  }}
>
  Place Order
</button>




        </div>

      </div>

    </div>
  );
}

export default App;
