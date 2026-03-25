import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);

    API.get(`/recipes/${id}`)
      .then((res) => {
        setFormData({
          title: res.data?.title || "",
          description: res.data?.description || "",
        });
      })
      .catch((err) => {
        console.log(err);
        setStatus("Could not load recipe data.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("");

    try {
      await API.put(`/recipes/${id}`, formData);
      setStatus("Recipe updated successfully.");
      setTimeout(() => navigate("/admin"), 700);
    } catch (err) {
      console.log(err);
      setStatus("Could not update the recipe.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="status-card">Loading edit form...</div>;
  }

  return (
    <div className="auth-layout">
      <section className="auth-copy">
        <span className="eyebrow">Admin Interface</span>
        <h1>Update a recipe shared with users.</h1>
        <p>Admin can edit recipe information here and keep the recipe collection up to date.</p>
      </section>

      <form onSubmit={handleSubmit} className="auth-card">
        <h2>Edit Recipe</h2>

        <label className="field-label" htmlFor="edit-title">
          Recipe Title
        </label>
        <input
          id="edit-title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="field-input"
          required
        />

        <label className="field-label" htmlFor="edit-description">
          Description
        </label>
        <textarea
          id="edit-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="field-input field-input--textarea"
          required
        />

        {status ? <p className="form-status">{status}</p> : null}

        <button type="submit" className="primary-button primary-button--full" disabled={submitting}>
          {submitting ? "Updating..." : "Update Recipe"}
        </button>
      </form>
    </div>
  );
}

export default EditRecipe;
