const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const EmailController = require("./emailController");

dotenv.config();

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      // Find user by email function
      const user = await UserModel.findByEmail(email);
      if (!user) {
        // Render login page again with error message
        return res.status(401).json({ message: 'Email or password is incorrect' });
      }

      // Compare hashed password to input password
      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) {
        // Render login page again with error message
        return res.status(401).json({ message: 'Password is incorrect' });
      }

      const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.cookie('token', token, { httpOnly: true });

      // Create Successful Login Message
      return res.status(200).json({ message: 'Login successful', token });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error, please try again later' });
    }
  }

  static async register(req, res) {
    const { firstName, lastName, email, password } = req.body;
    
    try {
      // Check if email already exists
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }
      
      // Validate password strength
      // password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character (@!%*).
      function validatePassword(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!%*?&]).{8,}$/.test(password);
      }

      // Anti SQL Injection function
      function noSQLInjection(str) {
        const forbiddenChars = /[$.]/;
        return !forbiddenChars.test(str);
      }
      
      // Check for NoSQL Injection in email and names
      if (!noSQLInjection(firstName) || !noSQLInjection(lastName) || !noSQLInjection(password)) {
        return res.status(400).json({ message: "Invalid characters in input" });
      }

      // If password is not strong enough
      if (!validatePassword(password)) {
        return res.status(400).json({
          message:
            "Password must be at least 8 characters long, include an uppercase letter, lowercase letter, number, and special character.",
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert User (into users table)
      const newUser = await UserModel.insertUser(email, hashedPassword);

      // Insert profile (into profile table)
      await UserModel.insertProfile(newUser.user_id, firstName, lastName);

      // Send Verification Email to user
      await EmailController.sendVerificationEmail(email, firstName);  

      return res.status(201).json({
        message: "User registered successfully",
        user: { email, firstName, lastName },
      });

    } catch (err) {
      console.error(err)
        return res.status(500).json({ message: "Server error during registration" });
    }
  }
}

module.exports = AuthController;