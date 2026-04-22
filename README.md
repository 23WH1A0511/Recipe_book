# 🍲 Recipe Book Web Application

A full-stack **Recipe Book Application** built using **React.js** for the frontend and **Node.js + Express + MongoDB** for the backend.
This application allows users to browse recipes, manage favorites, and provides admin controls for managing content.

---

## 🚀 Features

### 👤 User Features

* 🔐 User Registration & Login
* 🍽️ Browse all recipes
* 🔍 View detailed recipe information
* ❤️ Add/remove recipes to Favorites
* 📄 Manage personal favorite recipes

### 🛠️ Admin Features

* 📝 Add new recipes
* ✏️ Edit existing recipes
* ❌ Delete recipes
* 👥 Manage users

---

## 🛠️ Tech Stack

### Frontend

* ⚛️ React.js
* 🎨 CSS
* 📦 Axios

### Backend

* 🟢 Node.js
* 🚀 Express.js
* 🗄️ MongoDB (Mongoose)

---

## 📂 Project Structure

```bash
Recipe_book/
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/api.js
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│
│── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js
│
│── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/23WH1A0511/Recipe_book.git
cd Recipe_book
```

---

## 🔧 Backend Setup

```bash
cd backend
npm install
```

### ▶️ Run Backend

```bash
npm start
```

or

```bash
npm run dev
```

Backend runs on:
👉 [http://localhost:5000](http://localhost:5000)

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## 🔗 API Endpoints

### 👤 Users

* `POST /api/users/register` → Register user
* `POST /api/users/login` → Login user

### 🍲 Recipes

* `GET /api/recipes` → Get all recipes
* `GET /api/recipes/:id` → Get recipe details
* `POST /api/recipes` → Create recipe
* `PUT /api/recipes/:id` → Update recipe
* `DELETE /api/recipes/:id` → Delete recipe

---

## 🎥 Demo Video

👉 Add your demo video link here:
[click here to watch the demo](https://drive.google.com/file/d/1hqo56V_X-kAte9D5QuEX3mPHdZ-lSQ3u/view?usp=sharing)



---

## 💡 Usage

1. Start backend server
2. Start frontend application
3. Register or login
4. Browse recipes
5. Add recipes to favorites
6. Admin can manage recipes and users

---

## 🔮 Future Enhancements

* 🔐 JWT Authentication
* 📱 Mobile responsiveness
* ⭐ Ratings & Reviews system
* 🔎 Advanced search & filtering
* ☁️ Deployment (Vercel / AWS / Render)

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push and open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

* GitHub: [https://github.com/23WH1A0511](https://github.com/23WH1A0511)

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
