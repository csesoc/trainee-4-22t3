import { Request, Response } from 'express';
import Item from '../models/itemModel';
import User from '../models/userModel';
import { Items, IItem, User as UserType } from '../models/interfaces';

interface CategoryItems {
  [key: string]: Array<Items>;
}

/**
 * @desc    Gets all items belonging to authorized user
 * @routes  GET /items/get
 */
const getItems = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  res.status(200).json(await groupUserItems(req.user));
};

/**
 * @desc    Adds a user-created item
 * @route   POST /items/add
 */
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

// TODO: Actually test update and delete routes lol

/**
 * @desc    Deletes a user-created item
 * @route   DELETE items/delete/:id
 */
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

/**
 * @desc    Updates a user-created item
 * @route   PUT items/update/:id
 */
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

/*
 * @desc    Gets the items of 3 random users to display on the homepage
 * @route   GET /homepage/get
 */
const getHomepageItems = async (req: Request, res: Response) => {
  const users = await User.aggregate([{ $sample: { size: 3 } }]);
  const homepageItems = [];

  for (const user of users) {
    homepageItems.push({
      user: { username: user.username },
      items: await groupUserItems(user),
    });
  }

  res.status(200).json(homepageItems);
};

/*
 * Groups all of a user's items by category
 */
const groupUserItems = async (user: UserType) => {
  const allItems = await Item.find({ uId: user._id });
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
  // Sorts items of each category by rating
  Object.keys(categoryItems).forEach((key) =>
    categoryItems[key].sort((a, b) => b.rating - a.rating)
  );
  console.log(categoryItems);
  return categoryItems;
};

export { addItem, updateItem, deleteItem, getItems, getHomepageItems };
