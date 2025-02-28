import React, { useState, useEffect } from "react";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products") // Fetching products from API
            .then((res) => res.json())
            .then((data) => setProducts(data));

        const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(savedWishlist);
    }, []);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product) => {
        if (!wishlist.some((item) => item.id === product.id)) {
            setWishlist([...wishlist, product]);
        }
    };

    const removeFromWishlist = (productId) => {
        setWishlist(wishlist.filter((item) => item.id !== productId));
    };

    return (
        <div className="container">
            <h2 className="wishlist_text">🛍️ Shop Our Gifts 🛍️</h2>
            <div className="product-container">
                {products.map((product) => (
                    <div className="product-card" key={product.id}>
                        <img src={product.image} alt={product.title} />
                        <h5>{product.title}</h5>
                        <p>${product.price}</p>
                        <div className="button-container">
                            {wishlist.some((item) => item.id === product.id) ? (
                                <button onClick={() => removeFromWishlist(product.id)} className="btn-remove">
                                    ❌ Remove from Wishlist
                                </button>
                            ) : (
                                <button onClick={() => addToWishlist(product)} className="btn-add">
                                    💖 Add 💖
                                </button>
                            )}
                        </div>

                    </div>
                ))}
            </div>


            <h3 className="wishlist_text">🎁 Your Wishlist</h3>
                <ul>
                    {wishlist.length > 0 ? (
                        wishlist.map((item) => (
                            <li key={item.id} className="wishlist-item">
                                {item.title} - ${item.price}
                                <button onClick={() => removeFromWishlist(item.id)} className="wishlist-remove">
                                    ❌ Remove
                                </button>
                            </li>
                        ))
                    ) : (
                        <p>Your wishlist is empty</p>
                    )}
                </ul>
        </div>
    );
}

export default ProductList;
