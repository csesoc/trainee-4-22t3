import { save } from '../server';
const registerUser = (req, res) => {
  /*
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
  */
  res.json({ register: 'yay token' });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  res.json({ login: 'yay token' });
  /*
  const foundUser = dataStore.users.find((user) => user.email === email);
  if (!foundUser) {
    res.status(696).json({ error: 'Email is already in use' });
    return;
  }
  if (foundUser.password === password) 
  */
};

export default { registerUser, loginUser };
