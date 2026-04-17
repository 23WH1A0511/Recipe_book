import API from "../services/api";
import { getStoredAuth, updateStoredAuthUser } from "./auth";

export async function fetchFavorites() {
  const auth = getStoredAuth();
  const userId = auth?.user?._id || auth?._id;

  if (!userId) {
    return [];
  }

  const res = await API.get(`/users/${userId}/favorites`);
  updateStoredAuthUser(res.data.user);
  return Array.isArray(res.data.favorites) ? res.data.favorites : [];
}

export async function toggleFavorite(recipeId) {
  const auth = getStoredAuth();
  const userId = auth?.user?._id || auth?._id;

  if (!userId) {
    throw new Error("Please log in to save favorites.");
  }

  const res = await API.patch(`/users/${userId}/favorites/${recipeId}`);
  updateStoredAuthUser(res.data.user);

  return {
    favorites: Array.isArray(res.data.favorites) ? res.data.favorites : [],
    isFavorite: Boolean(res.data.isFavorite),
    message: res.data.message || "",
  };
}
