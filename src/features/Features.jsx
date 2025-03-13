import React, { useEffect } from "react";

function Features({ user, wishlist, setWishlist }) {
  // Optionally, fetch wishlist here if you like
  // But it's already done in ProductList, so you may not need to do it again.

  const removeFromWishlist = (productId) => {
    fetch(`/api/wishlist/${productId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((updatedWishlist) => {
        console.log("Updated wishlist after remove (Features):", updatedWishlist);
        setWishlist(updatedWishlist);
      })
      .catch((error) => console.error("Error removing from wishlist:", error));
  };

  return (
    <div className="content container my-5">
      <h2 className="text-center section-heading">🎁 Your Wishlist</h2>

      {!user && <p className="text-center">Please log in to see your wishlist.</p>}

      {user && wishlist.length === 0 && (
        <p className="text-center">Your wishlist is empty</p>
      )}

      {user && wishlist.length > 0 && (
        <div className="product-container">
          {wishlist.map((item) => (
            <div className="product-card" key={item.productId}>
              <img src={item.image} alt={item.title} />
              <h5>{item.title}</h5>
              <p>${item.price}</p>
              <div className="button-container">
                <button
                  onClick={() => removeFromWishlist(item.productId)}
                  className="wishlist-remove"
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Features;
