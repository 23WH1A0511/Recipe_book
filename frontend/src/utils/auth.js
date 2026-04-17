const AUTH_KEY = "recipeAuth";

export function normalizeAuthPayload(payload, selectedRole = "user") {
  if (!payload) {
    return null;
  }

  const user = payload.user || payload.data?.user || payload;
  const token = payload.token || payload.data?.token || "";
  const role = user?.role || payload.role || selectedRole;

  const normalizedRole = role === "admin" ? "admin" : "user";
  const name =
    user?.name || payload.name || (normalizedRole === "admin" ? "Admin" : "User");
  const email = user?.email || payload.email || "";
  const id = user?._id || payload._id || payload.id || "";
  const favorites = Array.isArray(user?.favorites)
    ? user.favorites
    : Array.isArray(payload.favorites)
      ? payload.favorites
      : [];

  return {
    token,
    _id: id,
    role: normalizedRole,
    name,
    email,
    user: {
      _id: id,
      name,
      email,
      role: normalizedRole,
      favorites,
    },
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
  const normalized = normalizeAuthPayload(auth);
  localStorage.setItem(AUTH_KEY, JSON.stringify(normalized));
}

export function updateStoredAuthUser(nextUser) {
  const currentAuth = getStoredAuth();

  if (!currentAuth) {
    return null;
  }

  const mergedAuth = {
    ...currentAuth,
    ...("email" in nextUser ? { email: nextUser.email } : {}),
    ...("name" in nextUser ? { name: nextUser.name } : {}),
    ...("_id" in nextUser ? { _id: nextUser._id } : {}),
    ...("role" in nextUser ? { role: nextUser.role } : {}),
    user: {
      ...currentAuth.user,
      ...nextUser,
    },
  };

  localStorage.setItem(AUTH_KEY, JSON.stringify(mergedAuth));
  return mergedAuth;
}

export function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}
