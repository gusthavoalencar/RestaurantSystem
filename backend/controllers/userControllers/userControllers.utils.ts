import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { IUser } from "../../models/user";
import { Request, Response, NextFunction } from "express";

async function sendPasswordResetEmail(email: string) {
  const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: "600" });
  const resetLink = `${process.env.FRONTEND_URL}/resetpassword/?token=${token}&email=${email}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL as string,
      pass: process.env.CODE2 as string
    }
  });

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Password Reset Request",
    html: `Please click on the following link to reset your password: <a href="${resetLink}">${resetLink}</a>. Your link will expire in 10 minutes.`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader;

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, {}, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      } else {
        return res.status(403).json({ message: "Invalid token" });
      }
    }

    if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
      return res.sendStatus(403);
    }

    req.user = decoded as IUser;
    next();
  });
};

export { sendPasswordResetEmail, authenticateToken };
