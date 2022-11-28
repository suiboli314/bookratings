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
 * Handles the verify email request.
 */
const verify = (confirmationToken) => {
  return fetch(`/verify/${confirmationToken}`, { method: "get" });
};
/**
 * Handles the login HTTP request to access your user profile
 * The data needed for each user is the username or email along with the password
 */
const login = async ({ emailOrUsername, password }) => {
  const res = await fetch(`/api/login`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      emailOrUsername: emailOrUsername,
      password: password,
    }),
  });

  const userAtoken = await res.json();
  localStorage.setItem("user", userAtoken);
  return userAtoken;
};

const logout = (dispatch) => {
  localStorage.removeItem("user");
  dispatch({ type: "LOGOUT" });
};

const AuthService = {
  signup,
  login,
  logout,
};

export default AuthService;
