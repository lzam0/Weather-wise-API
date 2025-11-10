import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import  UserModel  from '../models/userModel.js';
import EmailController from './emailController';

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

export default AuthController;