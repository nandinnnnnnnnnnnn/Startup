# 📝 JustGiftly Development Notes

## Update^^: February 27, 2025**
## **ON Phase 2:

### **🚀 What I Completed**
**API-Based Product Fetching** 
**Wishlist Page** 
**Persistent Wishlist Storage**
**Authentication Improvements** –  
   - Passwords are now **encrypted** using `bcryptjs`.  
   - Users **must log in with the correct password** instead of just entering any name.  
   - **Forgot Password feature** allows users to reset their passwords securely.  
 
---

### **🔍 Challenges faced**
**Buttons inside product cards were not aligning correctly.**  
   - I should look into my css more closely currently it is a long line of mess.
**Wishlist page was not displaying stored items correctly.**  
   - Solved it by using `useEffect()` to load `localStorage` wishlist when the page loads.  
**Passwords were visible in `localStorage`.**  
   - Fixed it by encrypting passwords using `bcryptjs`.  
**Users could sign up with the same name multiple times.**  
   - Now checking if the username already exists before creating a new account.  

---

### **📌 Key Things I Learned**
**How to Fetch API Data** – Learned how to use `fetch()` to dynamically load products from an API.  
**Storing Data in LocalStorage** – Used `localStorage.setItem()` and `localStorage.getItem()` to keep wishlist data persistent.  
**Encrypt Passwords in React** – Used `bcryptjs` to store passwords securely instead of plaintext.  
**Fix Button & Layout Issues in CSS** – Used `flexbox` and `auto-margin` to make buttons stay aligned.  

---

### **Next Steps**
**Move Wishlist to Database** – Right now, it’s stored in `localStorage`, but I want to move it to an actual backend later.  
**Add "Move to Cart" Feature** – Allow users to transfer wishlist items to their cart.  
**Wishlist Counter in Navbar** – Display the number of wishlist items in the navigation bar.  
**Advanced Product Filters** – Let users filter products by price, category, or popularity.  
**Animations & Microinteractions** – Make product cards animate smoothly when hovering or adding to the wishlist.  
**Button are not aligning same yet - Need to work on my app.css.

---

## **Resources I Used**
🔗 **Fake Store API** – Used to fetch product data dynamically but it is temporary in the future it supposed to be Amazon lists.  
🔗 **bcryptjs Documentation** – Helped with encrypting and verifying passwords.  

---

