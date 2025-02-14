import React from "react";

// Import product images
import product1 from "/images/9b3aae4cf90f897799a5ed357d60e09d.jpeg";
import product2 from "/images/rocher.jpg";
import product3 from "/images/flower.jpeg";

// Product data
const products = [
    {
        id: 1,
        category: "Bakery & Biscuits",
        title: "NutriChoice Digestive",
        rating: "⭐⭐⭐⭐☆",
        ratingScore: "4.3 (4)",
        price: "$24",
        image: product1,
    },
    {
        id: 2,
        category: "Chocolates",
        title: "Ferrero Rocher",
        rating: "⭐⭐⭐⭐⭐",
        ratingScore: "4.8 (10)",
        price: "$15",
        image: product2,
    },
    {
        id: 3,
        category: "Flower",
        title: "Bouquet",
        rating: "⭐⭐⭐⭐☆",
        ratingScore: "4.5 (8)",
        price: "$20",
        image: product3,
    },
    {
        id: 4,
        category: "Flower",
        title: "Bouquet",
        rating: "⭐⭐⭐⭐☆",
        ratingScore: "4.5 (8)",
        price: "$20",
        image: product3,
    },
    {
        id: 5,
        category: "Flower",
        title: "Bouquet",
        rating: "⭐⭐⭐⭐☆",
        ratingScore: "4.5 (8)",
        price: "$20",
        image: product3,
    },
    {
        id: 6,
        category: "Flower",
        title: "Bouquet",
        rating: "⭐⭐⭐⭐☆",
        ratingScore: "4.5 (8)",
        price: "$20",
        image: product3,
    },
];

function ProductList() {
    return (
        <div className="container">
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-4" key={product.id}>
                        <div className="card product-card">
                            <img src={product.image} className="card-img-top" alt={product.title} />
                            <div className="card-body">
                                <p className="category">{product.category}</p>
                                <h5 className="product-title">{product.title}</h5>
                                <div className="rating">
                                    {product.rating} <span className="rating-score">{product.ratingScore}</span>
                                </div>
                                <div className="price">
                                    <span className="current-price">{product.price}</span>
                                </div>
                                <button className="custom-btn add-to-cart">+ Add</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
