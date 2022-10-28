import express, { response } from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const port = 8000;

// NOTE: This datastore is not complete
// YOu might have a list of categories, and within each, nest a list of category items
// Also, maybe come up with a name other than identiFunners (yea ik it's quite impossible but try your best)
let sampleDataStore = {
  users: [],
  identiFunners: [],
  totalIdentiFunners: 0,
};

let dataStore = {
  users: [],
  categories: [],
  items: [],
  totalUsers: 0,
  totalItems: 0,
};
/**
 * Reads data.json into the in-memory data store
 */
fs.readFile('./data.json', (err, data) => {
  if (err) {
    console.log(err);
    return;
  } //
  dataStore = JSON.parse(data);
});

/**
 * Saves the dataStore to the JSON
 */
const save = () => {
  fs.writeFile('./data.json', JSON.stringify(dataStore), (err) => {
    if (err) {
      console.log(err);
    }
  });
};
// const save = () => {
//   try {
//     fs.writeFileSync('data.json', JSON.stringify(sampleDataStore));
//   } catch (err) {
//     console.log(err);
//   }
// };

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send({ message: 'Hello' });
});

app.post('/user/register', (req, res) => {
  const { email, username, password } = req.body;
});

/**
 * GET /demo
 * Gets a list of dummy identiFunners from a sample data store
 * @returns An array of identiFunners bruh idk how to do documentation :/
 * DO NOT UNDER ANY CIRCUMSTANCES MODEL THIS FOR YOUR 1531 YOUR MARK WILL SINK
 */
app.get('/demo', (req, res) => {
  res.json(sampleDataStore.identiFunners);
});

/**
 * POST /demo
 * Creates a new sample identiFunner
 * @param The category name
 * @param The category item
 * @param The rating of the item
 * @returns The userID
 */
app.post('/demo', (req, res) => {
  // Get data from JSON body
  const { category, categoryItem, rating } = req.body;
  if (!category || !categoryItem || !rating) {
    res.status(500).json({ error: 'Please fill in all fields' });
    return;
  }

  const newId = sampleDataStore.totalIdentiFunners;
  sampleDataStore.totalIdentiFunners += 1;
  sampleDataStore.identiFunners.push({
    id: newId,
    category,
    categoryItem,
    rating,
  });
  save();
  res.json({ id: newId });
});

app.delete('/demo/:id', (req, res) => {
  if (
    !sampleDataStore.identiFunners.find(
      (item) => item.id === parseInt(req.params.id)
    )
  ) {
    res.status(500).json({ error: 'Item not found' });
    return;
  }
  sampleDataStore.identiFunners = sampleDataStore.identiFunners.filter(
    (item) => item.id !== parseInt(req.params.id)
  );
  save();
  res.json({});
});

app.post('/item', (req, res) => {
  const { categoryName, itemName, rating, uId } = req.body;
  const user = dataStore.users.find((user) => user.uId === uId);
  const itemId = dataStore.totalItems;
  user.userItems.push({ itemId, rating });
  dataStore.totalItems += 1;
  dataStore.items.push({ itemId, categoryName, itemName, custom: [] });
  save();
  res.json({ itemId });
});

app.post('/category', (req, res) => {
  const { name } = req.body;
  const foundCategory = dataStore.categories.some(
    (a) => a.category === category
  );
  if (!foundCategory) {
    dataStore.categories.push({ name, custom: [] });
  }
  save();
  res.json({ name });
});

app.get('/item/:uId', (req, res) => {
  const uId = parseInt(req.params.uId);
  const user = dataStore.users.find((a) => a.uId === uId);
  const allItems = user.userItems.map((item) =>
    dataStore.items.find((a) => a.itemId === item.itemId)
  );

  // for each item, check its categoryId and find it in dataStore.categories
  const allCategories = allItems.map((item) =>
    dataStore.categories.find(
      (category) => item.categoryId === category.categoryId
    )
  );
  const combined = [];
  for (let i = 0; i < allItems.length; i++) {
    combined.push({
      itemName: allItems[i].itemName,
      category: allCategories[i].category,
      customItemFields: allItems[i].custom,
      customCategoryFields: allCategories[i].custom,
    });
  }

  res.json(combined);
});

// for each category, go through each item
app.get('/get/categories', (req, res) => {
  console.log('hi');
  const associatedCategories = dataStore.categories.map((category) => {
    console.log(category);
    const item = dataStore.items.find(
      (item) => item.categoryName === category.name
    );
    console.log(item);
    return { category, item };
  });
  res.json(associatedCategories);
});

app.delete('/clear', (req, res) => {
  dataStore = {
    users: [],
    items: [],
    categories: [],
    totalUsers: 0,
    totalItems: 0,
  };
  save();
  res.json({});
});

app.post('/register', (req, res) => {
  const { email, password, username } = req.body;
  const foundEmail = dataStore.users.some((user) => user.email === email);
  if (foundEmail) {
    res.status(696).json({ error: 'Email is already in use' });
    return;
  }

  const foundUsername = dataStore.users.some(
    (user) => user.username === username
  );
  if (foundUsername) {
    res.status(696).json({ error: 'Email is already in use' });
    return;
  }
  const uId = dataStore.totalUsers;
  dataStore.users.push({ email, password, username, uId, userItems: [] });
  dataStore.totalUsers += 1;
  save();
  res.json({ uId });
});

app.listen(port, () => {
  console.log(`Server listening at port ${port} 🚀`);
});
