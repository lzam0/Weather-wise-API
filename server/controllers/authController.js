import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from '../models/userModel';

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
}

export default AuthController;