import { Request, Response } from 'express';

const itemControllers = {
  getItems: (req: Request, res: Response) => {
    let items = { item: 'bread' };
    try {
      return res.status(200).json(items);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },

  getHelloWorld: (req: Request, res: Response) => {
    let items = { test: 'hello world' };
    console.log('hello woeld');
    try {
      return res.status(200).json(items);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },
};

export default itemControllers;
