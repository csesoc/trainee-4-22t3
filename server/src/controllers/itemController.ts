import { Request, Response } from 'express';
import Item from '../models/itemModel';
import { Items, IItem } from '../models/interfaces';

interface CategoryItems {
  [key: string]: Array<Items>;
}

const getItems = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  const allItems = await Item.find({ uId: req.user._id });
  const categoryItems: CategoryItems = {};
  allItems.forEach((item: IItem) => {
    let categoryName = item.category;
    // Adds category if it doesn't exist already
    if (!(categoryName in categoryItems)) {
      categoryItems[categoryName] = [];
    }
    // Adds item
    categoryItems[categoryName].push({
      name: item.name,
      comment: item.comment,
      rating: item.rating,
      released: item.released,
      imageUrl: item.imageUrl,
      extraFields: item.extraFields,
    });
  });
  res.json(categoryItems);
};

const addItem = async (req: Request, res: Response) => {
  const { name, comment, category, released, imageUrl, rating, extraFields } =
    req.body;
  if (!req.user) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  const item = await Item.create({
    uId: req.user._id,
    category,
    name,
    comment,
    rating,
    released,
    imageUrl,
    extraFields: extraFields ? extraFields : {},
  });
  res.status(200).json(item);
};

// TODO: Actually test these routes lol
const deleteItem = async (req: Request, res: Response) => {
  const user = req.user;
  const itemId = req.params.id;
  const item = await Item.findById(itemId);
  if (user) {
    if (item && item.uId.toString() === user._id.toString()) {
      const deleted = await Item.deleteOne({ _id: itemId });
      deleted
        ? res.status(200).json({})
        : res.status(400).json({ error: 'Could not delete item' });
    } else {
      res.status(400).json({ error: 'itemId not found' });
    }
  }
};

const updateItem = async (req: Request, res: Response) => {
  const user = req.user;
  const itemId = req.params.id;
  const item = await Item.findById(itemId);
  if (user) {
    if (item && item.uId.toString() === user._id.toString()) {
      const item = await Item.findByIdAndUpdate(itemId, req.body, {
        new: true,
      });
      item
        ? res.status(200).json({})
        : res.status(400).json({ error: 'Could not update item' });
    } else {
      res.status(400).json({ error: 'itemId not found' });
    }
  }
};

export { addItem, updateItem, deleteItem, getItems };
