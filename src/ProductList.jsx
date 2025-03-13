import React, { useState, useEffect } from 'react';

function ProductList({ user, wishlist, setWishlist }) {
  const [products, setProducts] = useState([]);

  //Fetch products from FakeStore API
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  //If user changes (login/logout), fetch or clear the wishlist from backend
  useEffect(() => {
    if (user) {
      fetch('/api/wishlist', { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched wishlist from backend:", data);
          if (Array.isArray(data)) setWishlist(data);
        });
    }
  }, [user, setWishlist]);

  //Add item to wishlist (in-memory backend)
  const handleAddToWishlist = (product) => {
    if (!user) return;

    fetch('/api/wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Wishlist updated:', data);
        if (Array.isArray(data)) setWishlist(data); 
      });
  };

  //Remove item from wishlist
  const removeFromWishlist = (productId) => {
    fetch(`/api/wishlist/${productId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((updatedWishlist) => {
        console.log("Updated wishlist after remove:", updatedWishlist);
        setWishlist(updatedWishlist);
      })
      .catch((error) => console.error('Error removing from wishlist:', error));
  };

  //Check if product is in wishlist
  const isInWishlist = (productId) => wishlist.some((item) => item.productId === productId);

  return (
    <div className="product-container">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.image} alt={product.title} />
          <h5 className="product-title">{product.title}</h5>
          <p className="category">{product.category}</p>
          <p className="price">${product.price}</p>
          <div className="button-container">
            {user ? (
              isInWishlist(product.id) ? (
                <button className="btn-remove" onClick={() => removeFromWishlist(product.id)}>
                 Remove from Wishlist
                 </button>
              ) : (
                <button className="btn-add" onClick={() => handleAddToWishlist(product)}>
                  🛍️ Add to Wishlist
                </button>
              )
            ) : (
              <p style={{ color: '#880e4f', fontFamily: 'Pixelify Sans' }}>Login to add</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
