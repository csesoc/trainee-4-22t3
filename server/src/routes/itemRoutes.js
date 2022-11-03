import express from 'express';
const router = express.Router();
import {
  addItem,
  deleteItem,
  updateItem,
  getItemInfo,
} from '../controllers/itemController';

router.post('/add', addItem);
router.delete('/delete/:id', deleteItem);
router.put('/update/:id', updateItem);
router.get('/get/:id', getItemInfo);

app.post('/item', (req, res) => {
  const { category, itemName, rating, uId } = req.body;
  const user = dataStore.users.find((user) => user.uId === uId);
  const itemId = dataStore.totalItems;
  user.userItems.push({ itemId, rating });
  dataStore.totalItems += 1;
  dataStore.items.push({ itemId, category, itemName, custom: [] });
  save();
  res.json({ itemId });
});

app.get('/item/:uId', (req, res) => {
  const uId = parseInt(req.params.uId);
  const allItems = getItem(uID);
  res.json(allItems);
});

export default router;
