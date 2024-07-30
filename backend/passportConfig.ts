import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User, { IUser } from "./models/user";
import { authenticateUser } from "./controllers/userControllers/userControllers.utils";

passport.use(new LocalStrategy(User.authenticate()));

passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

passport.serializeUser((user: Express.User, done) => {
  done(null, (user as IUser)._id);
});

passport.deserializeUser((id: string, done) => {
  User.findById(id, (err: Error, user: IUser | null) => {
    done(err, user);
  });
});

export default passport;
