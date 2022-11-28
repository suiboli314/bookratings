/**
 * Handles the signup HTTP request to add a new user to the database
 * The data needed for each user is First Name, Last Name, Username, Email, and Password
 */
const signup = async ({ firstName, lastName, username, email, password }) => {
  return await fetch(`/api/signup`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
    }),
  });
};
/**
 * Handles the reconnect session request.
 */
const getuser = async ({ dispatch }) => {
  const res = await fetch(`/getuser/`, { method: "get" });

  if (!res.ok) throw new Error(res.body);
  const user = await res.json();
  dispatch({
    type: "LOGIN",
    payload: {
      user: user,
      token: user.token,
    },
  });
};
/**
 * Handles the login HTTP request to access your user profile
 * The data needed for each user is the username or email along with the password
 */
const login = async ({ emailOrUsername, password, dispatch }) => {
  const res = await fetch(`/api/login`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      emailOrUsername: emailOrUsername,
      password: password,
    }),
  });
  if (!res.ok) throw new Error(res.body);

  const user = await res.json();
  dispatch({
    type: "LOGIN",
    payload: {
      user: user,
      token: user.token,
    },
  });
};

const logout = ({ dispatch }) => {
  dispatch({ type: "LOGOUT" });
};

const reset = async ({ emailOrUsername, password, dispatch }) => {
  const res = await fetch(`/api/resetpass`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      emailOrUsername: emailOrUsername,
      password: password,
    }),
  });

  if (!res.ok) throw new Error(res.body);
  logout({ dispatch: dispatch });
};

const deleteUser = async ({ state, dispatch }) => {
  const emailOrUsername = state.user.email ? state.user.email : "";
  const res = await fetch(`/api/deleteuser`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      emailOrUsername: emailOrUsername,
    }),
  });
  if (!res.ok) throw new Error(res.body);
  logout({ dispatch: dispatch });
};

const AuthService = {
  signup,
  login,
  logout,
  reset,
  deleteUser,
};

export default AuthService;
