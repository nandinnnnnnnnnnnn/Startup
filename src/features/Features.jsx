import React, { useState, useEffect } from "react";

function Features({user}) {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        if (user) {
            fetch('/api/wishlist', { credentials: 'include' })
                .then(res => res.json())
                .then(data => setWishlist(data))
                .catch(() => setWishlist([]));
        }
    }, [user]);

    const removeFromWishlist = async (productId) => {
        const response = await fetch(`/api/wishlist/${productId}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        if (response.ok) {
            const updatedWishlist = await response.json();
            setWishlist(updatedWishlist);
        }
    };

    return (
        <div className="content container my-5">
            <h2 className="text-center section-heading">🎁 Your Wishlist</h2>

            {wishlist.length === 0 ? (
                <p className="text-center">Your wishlist is empty 😢</p>
            ) : (
                <div className="product-container">
                    {wishlist.map((item) => (
                        <div className="product-card" key={item.id}>
                            <img src={item.image} alt={item.title} />
                            <h5>{item.title}</h5>
                            <p>${item.price}</p>
                            <div className="button-container">
                                <button
                                    onClick={() => removeFromWishlist(item.id)}
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

