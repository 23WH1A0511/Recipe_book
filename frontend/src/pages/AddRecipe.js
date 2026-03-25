import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddRecipe() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("");

    try {
      await API.post("/recipes", formData);
      setStatus("Recipe added successfully.");
      setFormData({ title: "", description: "" });
      setTimeout(() => navigate("/admin"), 700);
    } catch (err) {
      console.log(err);
      setStatus("Could not add recipe. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-layout">
      <section className="auth-copy">
        <span className="eyebrow">Admin Interface</span>
        <h1>Add a new recipe for all users.</h1>
        <p>
          Recipes created here become part of the shared recipe collection that users can access
          from their recipes page.
        </p>
      </section>

      <form onSubmit={handleSubmit} className="auth-card">
        <h2>Add Recipe</h2>

        <label className="field-label" htmlFor="title">
          Recipe Title
        </label>
        <input
          id="title"
          name="title"
          value={formData.title}
          placeholder="Paneer Butter Masala"
          onChange={handleChange}
          className="field-input"
          required
        />

        <label className="field-label" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          placeholder="A rich and creamy curry perfect for dinner."
          onChange={handleChange}
          className="field-input field-input--textarea"
          required
        />

        {status ? <p className="form-status">{status}</p> : null}

        <button type="submit" className="primary-button primary-button--full" disabled={submitting}>
          {submitting ? "Saving..." : "Add Recipe"}
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
