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

---
## ***Update^^: March 25, 2025***
## ** DB/Login Delovarable:
## **🔍 Challenges faced**
**- Wishlist not showing after login** – I struggled for a while figuring out why wishlist items weren’t showing after logging in. It turned out to be a mix of `fetch` timing, token mismatch, and FakeStore product ID mismatches. Eventually fixed by debugging backend responses, comparing tokens, and syncing frontend state.
**- CORS and cookie issues** – At first, cookies were not sent with `fetch` requests in production. I had to configure `cors` middleware in Express with `credentials: true` and set the `origin` properly to match the deployed frontend.
**- Dealing with async rendering** – React components like `ProductList` were rendering before the wishlist was fetched, causing UI mismatches. I solved this by using a `wishlistLoaded` flag to ensure proper render order.
**- Backend crash during deployment** – Missing modules like `cookie-parser` and permission errors (`npm ERR! EACCES`) caused server crashes. I fixed this by resetting `.npm` permissions and explicitly installing missing dependencies.
**- Deployment styling issue** – I got a MIME type error because the browser tried to load a non-existent `app.css`. It was fixed by removing the incorrect `<link>` tag in `index.html` and letting Vite bundle styles correctly.
### **📌 Key Things I Learned**
**- Full Express + MongoDB API flow** – Built and deployed secure routes for login, signup, wishlist saving, and logout.
**- Cookie-based Auth** – How to set secure cookies and use them to identify users and protect routes (with `verifyAuth` middleware).

---
## ***Update^^: Apr 8, 2025***
## ** Websocket Delivrable:
## **🔍 Challenges faced**
- WebSocket 404 error – Took a while to realize that /ws isn’t a normal HTTP route. Fixed it by setting the correct path in peerProxy.js and moving the WebSocket setup before app.use.
- Caddy handle_path issue – WebSocket wasn’t connecting in production. Switching from handle_path to handle and preserving /ws path fixed it.
### **📌 Key Things I Learned**
- How to set up real-time updates – Used WebSocket to sync wishlist changes across clients instantly.
- How to proxy WebSocket connections – Configured both Vite and Caddy to support /ws properly.
- Better Debugging for sure. 


💖 Made with love by Nandintsetseg Batsaikhan – "Gift-giving, made simple and magical!" 