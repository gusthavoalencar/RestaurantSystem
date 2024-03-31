import { Request, Response } from "express";

const itemControllers = {
  getItems: (req: Request, res: Response) => {
    const items = { item: "bread" };
    try {
      return res.status(200).json(items);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  },

  getHelloWorld: (req: Request, res: Response) => {
    const items = { test: "hello world" };
    console.log("hello woeld");
    try {
      return res.status(200).json(items);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
};

export default itemControllers;
