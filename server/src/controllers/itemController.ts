import { Request, Response } from 'express';

const addItem = (req: Request, res: Response) => {};

const deleteItem = (req: Request, res: Response) => {};

const updateItem = (req: Request, res: Response) => {};

const getItem = (req: Request, res: Response) => {
  // const user = dataStore.users.find((a) => a.uId === uId);
  // const allItems = user.userItems.map((item) =>
  //   dataStore.items.find((a) => a.itemId === item.itemId)
  // );
  // res.json(allItems);
};

export { addItem, updateItem, deleteItem, getItem };
