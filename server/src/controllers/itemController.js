const getItem = (req, res) => {
  const user = dataStore.users.find((a) => a.uId === uId);
  const allItems = user.userItems.map((item) =>
    dataStore.items.find((a) => a.itemId === item.itemId)
  );
  res.json(allItems);
};

export default {
  getItem,
};
