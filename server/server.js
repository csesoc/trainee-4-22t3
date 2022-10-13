import fs from 'fs';
import express from 'express';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/', (req, res) => {
  console.log(req.query.message);
  res.send({ message: 'Hello' });
});

app.post('/user/register', (req, res) => {
  const { email, username, password } = req.body;
  console.log(email, username, password);
});

app.listen(port, () => {
  console.log(`Server listening at port ${port} 🚀`);
});
