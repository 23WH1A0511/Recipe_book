const AUTH_KEY = "recipeAuth";

export function normalizeAuthPayload(payload, selectedRole = "user") {
  if (!payload) {
    return null;
  }

  const user = payload.user || payload.data?.user || payload;
  const token = payload.token || payload.data?.token || "";
  const role = user?.role || payload.role || selectedRole;

  return {
    token,
    role: role === "admin" ? "admin" : "user",
    name: user?.name || payload.name || (role === "admin" ? "Admin" : "User"),
    email: user?.email || payload.email || "",
  };
}

export function getStoredAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function storeAuth(auth) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
}

export function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}
