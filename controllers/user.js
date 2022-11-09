import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import database from "../database/database.js";
function auth() {
  const authenticate = {};
  const db = database.collection("user_native");
  authenticate.signup = async (req, res) => {
    try {
      const { firstName, lastName, username, email, password } = req.body; // Get the user data

      console.log(email)
      console.log(username)
      // Check if the user exists in the database
      const emailExists = await db.findOne({ email:email});
      const usernameExists = await db.findOne({ username:username });
      if (emailExists) {
        return res.status(409).send("Email Already Exist. Please Login");
      }
      if (usernameExists) {
        return res.status(409).send("Username Already Exist. Please Login");
      }

      // Hash the password
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create the user token
      const token = jwt.sign(
        {email},
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: "2h" }
      );
      
      const result = db.insertOne({
        firstName:firstName,
        lastName:lastName,
        userName:username,
        email:email,
        password:hashedPassword,
        token: token
      })

      // TODO: Send the email verification link
      return res.status(201).json(result);
    } catch (err) {
      console.error(err);
      return res.status(400).send(err.message);
    }
  };

  authenticate.login = async (req, res) => {
    try {
      // Get user data
      const { emailOrUsername, password } = req.body;

      // Validate user data
      if (!(emailOrUsername && password)) {
        console.log("All data is required", req.body);
        return res.status(400).send("All data is required");
      }

      // A regex expression to test if the given value is an email or username
      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const data = regexEmail.test(emailOrUsername)
        ? { email: emailOrUsername }
        : { username: emailOrUsername };

      // Validate if user exist in our database
      const user = await User.findOne(data);

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const email = user.email;
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_SECRET_KEY,
          { expiresIn: "2h" }
        );

        // save user token
        user.token = token;
        console.log(user.token);

        // user
        res.status(200).json(user);
      } else res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.error(err);
      return res.status(400).send(err.message);
    }
  };

  return authenticate;
}

export default auth();
