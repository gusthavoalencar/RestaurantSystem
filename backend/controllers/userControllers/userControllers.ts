import { Request, Response } from "express";
import User, { IUser } from "../../models/user";
import { sendPasswordResetEmail } from "./userControllers.utils";
import jwt from "jsonwebtoken";
import passport from "../../passportConfig";
import { IVerifyOptions } from "passport-local";

const userControllers = {
  // Login user
  login: (req: Request, res: Response) => {
    passport.authenticate("local", (err: Error | null, user: IUser | false, info: IVerifyOptions) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(401).json({ error: info.message });

      req.login(user, { session: false }, (err) => {
        if (err) return res.status(500).json({ error: err.message });

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET as string, {
          expiresIn: "1d"
        });
        return res.json({ token });
      });
    })(req, res);
  },

  // Register user
  register: async (req: Request, res: Response) => {
    const { name, surname, email, status, role } = req.body;

    try {
      const user = new User({ name, surname, email, status, role });
      await user.save();
      sendPasswordResetEmail(email);

      res.status(200).json({
        message: `User ${name} ${surname} registered successfully. Please check your email to set your password.`
      });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  // Forgot password
  forgotpassword: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      sendPasswordResetEmail(email);

      return res.status(200).json({
        message: `Email sent to ${email} with instructions to reset your password.`
      });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  // Reset password
  resetPassword: async (req: Request, res: Response) => {
    const { token, password } = req.body;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
      const user = await User.findOne({ email: decoded.email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.setPassword(password, async (err, updatedUser) => {
        if (err) return res.status(500).json({ error: err.message });

        updatedUser.status = "active";
        await updatedUser.save();
        res.status(200).json({ message: "Password has been reset successfully" });
      });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  // Get user
  getUser: async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  // Get users
  getUsers: async (req: Request, res: Response) => {
    try {
      const users = await User.find();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  // Delete user
  deleteUser: async (req: Request, res: Response) => {
    try {
      const userId = req.body._id;
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(400).json({ error: "User not found" });
      }

      return res.status(200).json(deletedUser);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  // Edit user
  editUser: async (req: Request, res: Response) => {
    try {
      const userId = req.body._id;
      if (!userId) {
        return res.status(400).json({ error: "User ID must be provided" });
      }

      const updateData = req.body;

      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(400).json({ error: "User not found" });
      }

      const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
      if (!updatedUser) {
        return res.status(500).json({ error: "Failed to update user" });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
};

export default userControllers;
