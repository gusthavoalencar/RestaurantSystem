import { Request, Response } from "express";
import User from "../../models/user";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";

passport.use(new LocalStrategy(User.authenticate()));

const userControllers = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, surname, email, status, role, password } = req.body;

      const userData = { name, surname, email, status, role };

      User.register(new User(userData), password, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        return res.status(200).json(userData);
      });
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
