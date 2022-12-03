import { Request, Response } from 'express';
import Item from '../models/itemModel';
import { Items, IItem } from '../models/interfaces';

// userSchema.add({education: String, age: Number, profile_pic: String});

const addItem = async (req: Request, res: Response) => {
  const { name, comment, category, released, imageUrl, rating, extraFields } =
    req.body;
  const user = req.user;
  if (user) {
    const item = await Item.create({
      uId: user._id,
      category,
      name,
      comment,
      rating,
      released,
      imageUrl,
      extraFields,
    });
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(400).json({ error: 'Could not create item' });
    }
  }
};

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

interface SortedItem {
  [key: string]: Array<Items>;
}

const getItems = async (req: Request, res: Response) => {
  const user = req.user;
  if (user) {
    const allItems = await Item.find({ uId: user._id });
    if (allItems) {
      const sorted = {} as SortedItem;
      allItems.forEach((item: IItem) => {
        let categoryName = item.category;
        // Adds category if it doesn't exist already
        if (!(categoryName in sorted)) {
          sorted[categoryName] = [];
        }
        // Adds item
        sorted[categoryName].push({
          name: item.name,
          comment: item.comment,
          rating: item.rating,
          released: item.released,
          imageUrl: item.imageUrl,
          extraFields: item.extraFields,
        });
      });
      // Sorts items of each category by rating
      Object.keys(sorted).forEach((key) =>
        sorted[key].sort((a, b) => b.rating - a.rating)
      );
      res.status(200).json(sorted);
    } else {
      res.status(400).json({ error: 'Could not find item' });
    }
  }
};
export { addItem, updateItem, deleteItem, getItems };
