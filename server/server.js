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

fs.readFile('data.json', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  sampleDataStore = JSON.parse(data);
});

const save = () => {
  fs.writeFile('data.json', JSON.stringify(sampleDataStore), (err) => {
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

app.listen(port, () => {
  console.log(`Server listening at port ${port} 🚀`);
});
