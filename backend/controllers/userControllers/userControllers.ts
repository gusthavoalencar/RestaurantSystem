import { Request, Response } from "express";
import User from "../../models/user";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import { sendPasswordResetEmail } from "./userControllers.utils";
import { verify } from "jsonwebtoken";
import jwt from "jsonwebtoken";

passport.use(new LocalStrategy(User.authenticate()));

const userControllers = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Email not found" });
      }

      const isMatch = await user.authenticate(password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET as string, {
        expiresIn: "1h"
      });

      res.json({ token });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  register: async (req: Request, res: Response) => {
    try {
      const { name, surname, email, status, role } = req.body;
      const userData = { name, surname, email, status, role };

      let newUser = new User(userData);
      newUser = await newUser.save();

      sendPasswordResetEmail(newUser.email);

      return res.status(200).json({
        message: `User ${newUser.name} ${newUser.surname} registered successfully, please check your email to set your password.`
      });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

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

  resetpassword: async (req: Request, res: Response) => {
    try {
      const { token, password, email } = req.body;
      const decoded = verify(token, process.env.JWT_SECRET as string);

      if (!decoded) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await user.setPassword(password);
      await user.save();

      res.status(200).json({ message: "Password has been reset successfully" });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

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

  getUsers: async (req: Request, res: Response) => {
    try {
      const users = await User.find();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
};

export default userControllers;
