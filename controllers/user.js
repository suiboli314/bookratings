import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import database from "../database/database.js";
function auth() {
  const COLLECTION_NAME = "user_native";
  const authenticate = {};

  const connect = () => database.collection(COLLECTION_NAME);

  authenticate.signup = async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body; // Get the user data
    let client, db;

    try {
      [client, db] = await connect();
      // Check if the user exists in the database
      const emailExists = await db.findOne({ email: email });
      const usernameExists = await db.findOne({ username: username });
      if (emailExists)
        return res.status(409).send("Email Already Exist. Please Login");

      if (usernameExists)
        return res.status(409).send("Username Already Exist. Please Login");

      // Hash the password

      // Create the user token
      const token = jwt.sign({ email }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "2h",
      });

      const result = await db.insertOne({
        firstName: firstName,
        lastName: lastName,
        userName: username,
        email: email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
        token: token,
      });

      // TODO: Send the email verification link
      return res.status(201).json(result);
    } catch (err) {
      return res.status(400).send(err.message);
    } finally {
      await client.close();
    }
  };

  authenticate.reset = async (req, res) => {
    const { emailOrUsername, password } = req.body; // Get the user data

    // A regex expression to test if the given value is an email or username
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,8})+$/;
    const data = regexEmail.test(emailOrUsername)
      ? { email: emailOrUsername }
      : { userName: emailOrUsername };

    let client, db;
    try {
      [client, db] = await connect();

      // update token
      const result = await db.updateOne(data, {
        $set: { password: bcrypt.hashSync(password, bcrypt.genSaltSync()) },
      });

      // TODO: Send the email verification link
      return res.status(201).json(result);
    } catch (err) {
      return res.status(400).send(err.message);
    } finally {
      await client.close();
    }
  };

  authenticate.delete = async (req, res) => {
    const { emailOrUsername } = req.body;
    // A regex expression to test if the given value is an email or username
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,8})+$/;
    const data = regexEmail.test(emailOrUsername)
      ? { email: emailOrUsername }
      : { userName: emailOrUsername };

    let client, db;
    try {
      [client, db] = await connect();
      const result = await db.deleteOne(data);
      return res.status(201).send(result);
    } catch (err) {
      return res.status(400).send(err.message);
    } finally {
      await client.close();
    }
  };

  authenticate.login = async (req, res) => {
    // Get user data
    const { emailOrUsername, password } = req.body;

    // Validate user data
    if (!(emailOrUsername && password)) {
      const err = `empty emailOrUsername: ${emailOrUsername} or password: ${password}`;
      return res.status(400).send(err);
    }

    // A regex expression to test if the given value is an email or username
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,8})+$/;
    const data = regexEmail.test(emailOrUsername)
      ? { email: emailOrUsername }
      : { userName: emailOrUsername };

    let client, db;
    try {
      [client, db] = await connect();
      // Validate if user exist in our database
      const user = await db.findOne(data);

      if (user && (await bcrypt.compareSync(password, user.password))) {
        // Create token
        const email = user.email;
        const token = jwt.sign({ email }, process.env.TOKEN_SECRET_KEY, {
          expiresIn: "2h",
        });

        // update token
        const result = await db.updateOne(data, { $set: { token: token } });
        user.token = token;

        return res.status(200).json(user);
      }
    } catch (err) {
      return res.status(400).send(err.message);
    } finally {
      await client.close();
    }

    return res.status(400).send("Invalid Credentials");
  };


  return authenticate;
}

export default auth();
