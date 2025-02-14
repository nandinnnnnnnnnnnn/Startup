import React from "react";

// Sample wish list data
const wishLists = [
    { user: "Alice", listName: "Birthday Gifts", items: "Smartwatch, Headphones" },
    { user: "Bob", listName: "Christmas List", items: "Books, Travel Backpack" },
];

function Features() {
    return (
        <div className="content container my-5">
            <h2 className="text-center section-heading">📊 Stored Wish Lists</h2>
            <div className="table-responsive">
                <table className="table table-bordered table-hover wish-list-table">
                    <thead className="table-header">
                        <tr>
                            <th>User</th>
                            <th>Wish List Name</th>
                            <th>Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishLists.map((wishlist, index) => (
                            <tr key={index}>
                                <td>{wishlist.user}</td>
                                <td>{wishlist.listName}</td>
                                <td>{wishlist.items}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Features;
