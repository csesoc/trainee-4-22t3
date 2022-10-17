import express, { response } from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

// NOTE: This datastore is not complete
// YOu might have a list of categories, and within each, nest a list of category items
// Also, maybe come up with a name other than identiFunners (yea ik it's quite impossible but try your best)
const sampleDataStore = {
  users: [],
  identiFunners: [
    {
      category: 'Music',
      categoryItem: 'Jacob Sartorius - swatshirt',
      rating: 10000,
    },
    {
      category: 'Anime',
      categoryItem: 'Spy X Family',
      rating: 10,
    },
  ],
  totalIdentiFunners: 0,
};

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
  }

  const newId = sampleDataStore.totalIdentiFunners;
  sampleDataStore.totalIdentiFunners += 1;
  sampleDataStore.identiFunners.push({
    id: newId,
    category,
    categoryItem,
    rating,
  });

  res.json({ id: newId });
});

app.listen(port, () => {
  console.log(`Server listening at port ${port} 🚀`);
});
