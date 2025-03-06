import React, { useState, useEffect, use } from "react";

function ProductList({user}) { 
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products") // Temporary API for Phase 2
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    useEffect(() => {
        if (user) {
            const savedWishlist = JSON.parse(localStorage.getItem(`wishlist_${user}`)) || [];
            setWishlist(savedWishlist);
        }
    }, [user]); //load wishlist for user
    
    useEffect(() => {
        if(user){
            localStorage.setItem('wishlist_${user}', JSON.stringify(wishlist));
        }}, [wishlist, user]); //store wishlist for user


      
    useEffect(() => {
        localStorage.setItem(`wishlist_${user || "guest"}`, JSON.stringify(wishlist));
    }, [wishlist, user]); //store wishlist for user or guest
/* 
    useEffect(() => {
        if (user) {
            const savedWishlist = JSON.parse(localStorage.getItem(`wishlist_${user}`)) || [];
            setWishlist(savedWishlist);
        }
    }, [user]);
    */
    const addToWishlist = (product) => {
        if (!user) {
            alert("You must be logged in to add items to your wishlist!");
            return;
        }

        if (wishlist.some((item) => item.id === product.id)) {
            alert("This item is already in your wishlist!");
            return;
        }
    
        const updatedWishlist = [...wishlist, product];
        setWishlist(updatedWishlist);
    };
    

    const removeFromWishlist = (productId) => {

        const updatedWishlist = wishlist.filter((item) => item.id !== productId);
        setWishlist(updatedWishlist);
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
