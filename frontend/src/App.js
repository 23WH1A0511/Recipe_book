import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import AddRecipe from "./pages/AddRecipe";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import EditRecipe from "./pages/EditRecipe";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import RecipeDetails from "./pages/RecipeDetails";
import Recipes from "./pages/Recipes";
import Register from "./pages/Register";
import "./styles.css";

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Navbar />

        <main className="page-shell">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/recipes/add"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AddRecipe />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/recipes/:id/edit"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <EditRecipe />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
