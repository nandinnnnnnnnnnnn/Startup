# 🎁 Giftly 

**Giftly** is a simplified wish list management app that helps users create, manage and share personalized wish lists for any occasion. By simplifying the process of giving and recieving gifts, Giftly ensures that every gift is meaningful and values to the user. 

---

## **🚀 Elevator Pitch**
**Tired of guessing what gifts your loved ones want?**  
With **Giftly**, you can **create, manage, and share wish lists** effortlessly. Whether for birthdays, holidays, or special occasions, Giftly takes the stress out of gift-giving.

---

## **🎨 Design**
### **Main Page UI**
![Main Page](public/images/MainPage.png)

### **Search Page UI**
![Search Page](public/images/Search.png)

---

## **✨ Key Features**
- **Wish List Management** – Add, edit, and delete wish list items.  
- **User Authentication** – Sign up and log in securely with encrypted passwords.  
- **Forgot Password Feature** – Reset passwords.  
- **Wishlist Page** – Users can now view and manage their wishlists in a wishlist page.  
- **Database Storage (Planned)**. 


---
## **HTML deliverable**
✅ **HTML pages - Three HTML page that represent the Main, About, and Wishlists page.
✅ **Links, Text, Images, 
✅ **DB/Login placaholder
✅ **Websocket for real-time notification when adding list

---

## **🎀 CSS Delivarable**
✅ **Soft Pink Theme** – Aesthetic gradient background & deep pink accents.  
✅ **Stylish Navbar & Footer** – Sticky navigation & a polished footer design.  
✅ **Interactive Product Cards** – Transparent design, hover effects & shadows.  
✅ **Custom Buttons** – Rounded, animated buttons with smooth transitions.  
✅ **Responsive** – Optimized for mobile & desktop devices.  

---

## 📌 **React Phase 2**  

For this deliverable, I implemented:  
✅ **API Integration** – Products are now loaded from an external API instead of hardcoded data.  
✅ **Wishlist Page** – A page for users to manage their saved gifts.  
✅ **Persistent Wishlist Storage** – Wishlist items are stored in `localStorage` so they remain after logout.  
✅ **Improved Authentication** –  
  - **Sign Up with Encrypted Passwords (`bcryptjs`).  
  - **Login Verification – Passwords are securely checked.  
  - **Forgot Password Feature – Users can reset their passwords without an email.  
✅ **Bug Fixes & UI Improvements** –  
  - Improved responsiveness of product grids.  
  - Consistent button styles across the site.  

---
## 📌 **Service Delivarable**  
For this delibarable I added backend integrationts:
✅ **Node.js/Express.js** 
    - server running on port 4000 for backend API.

✅ **Frontend** 
    - served up using Express static middleware. 
    - app.use(express.static('public'));

✅ **Third party service endpoints** 
    - by callin calling https://fakestoreapi.com/products in ProductList.jsx to fetch products.

✅ **Backend provides service endpoints** 
    - by /api/auth/create (signup)
    - /api/auth/login (login)
    - /api/auth/logout (logout)
    - /api/wishlist (GET and POST for wishlist)
    - /api/wishlist/:id (DELETE for wishlist items)
    These endpoints handle CRUD and auth operations.

✅ **Frontend calls service endpoints** - 
    - Login.jsx calls /api/auth/login.
    - Signup.jsx calls /api/auth/create.
    - ProductList.jsx calls /api/wishlist for GET, POST, and DELETE operations.

✅ **Supports registration, login, logout, and restricted endpoint** - 
    - Signup.jsx allows creating an account and redirects to login.
    - Login.jsx allows logging in and redirects to home.
    - Logout button works and removes session.
    - Wishlist (/api/wishlist) is a restricted endpoints shows "Unauthorized" if not logged in.

---
## 📌 **DB/Login Delivarable**  
For this deliverable, I implemented:  
✅ **Stores data in MongoDB** – Wishlist products are stored in MongoDB Atlas in the wishlists collection through the backend service in database.js.  
✅ **Stores credentials in MongoDB** – User credentials ( username, hashed password, and auth token) are stored  in the users collection in MongoDB in database.js.  

---
## **📌 Third-Party API Integration**
Giftly integrates with **[Fake Store API](https://fakestoreapi.com/)** to fetch real-time product data.  
Future integrations include **Amazon Product API** for adding real gifts directly to wish lists.

---
## **📌 WebSocket Deliverable
For this deliverable, I implemented:  
✅ **Backend listens for WebSocket connection  **
✅  **Frontend makes WebSocket connection ** The frontend connects to the WebSocket endpoint (/ws) using the WebSocket API and stays connected for real-time updates.
✅  **Data sent over WebSocket connection ** When a user adds or removes an item from the wishlist, the frontend sends a WebSocket message to the backend, which is then broadcast to all other connected clients.
✅  **WebSocket data displayed in the application interface **
✅  **The application is functional **


---

## **💖 Made with Love by Nandintsetseg Batsaikhan**
🎀 _Gift-giving, made simple and magical!_ ✨  
