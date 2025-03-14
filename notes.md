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

## **Resources I Used**
🔗 **Fake Store API** – Used to fetch product data dynamically but it is temporary in the future it supposed to be Amazon lists.  
🔗 **bcryptjs Documentation** – Helped with encrypting and verifying passwords.  

---

## ***Update^^: March 13, 2025***
## ** Service Delovarable:
## **🔍 Challenges faced**
**Duplicate signup issue – On this one I didn't what to do and stuck for a while. All my code was not showing logic and I had to restart everything again because I was complete in loophole. Then I git checkout from the old version. Now it fixed handled with proper user existence check in backend.
**Handling wishlist update conflicts – Solved by syncing frontend and backend properly.
**Initial blank page for login/signup – Fixed event handler issues and routing.
**Frontend-backend integration (CORS/cookies) – Fixed via proper credential handling in fetch.

### **📌 Key Things I Learned**
**Building Express APIs to handle secure endpoints with authentication.
**Cookie-based Authentication – Handling sessions securely without exposing tokens.
**Connecting Frontend to Backend using Vite + Express 
**Securing Passwords using bcryptjs and checking login credentials properly in the backend
**Combining React with Express Backend smoothly for full-stack app.

💖 Made with love by Nandintsetseg Batsaikhan – "Gift-giving, made simple and magical!" 🎁✨