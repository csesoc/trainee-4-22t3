import express, { response } from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

const dataStore = {
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
  console.log(req.query.message);
  res.send({ message: 'Hello' });
});

app.post('/user/register', (req, res) => {
  const { email, username, password } = req.body;
  console.log(email, username, password);
});

app.get('/demo', (req, res) => {
  console.log(dataStore.identiFunners);
  res.json(dataStore.identiFunners);
});

app.post('/demo', (req, res) => {
  const { category, categoryItem, rating } = req.body;
  if (!category || !categoryItem || !rating) {
    res.status(500).json({ error: 'Please fill in all fields' });
  }

  const newId = dataStore.totalIdentiFunners;
  dataStore.totalIdentiFunners += 1;
  dataStore.identiFunners.push({
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
