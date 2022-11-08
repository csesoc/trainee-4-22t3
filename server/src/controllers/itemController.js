// gets information about one item, given an itemId
const getOneItem = (req, res) => {
  const { itemId } = req.body;
  const foundUser = dataStore.users.find((user) =>
    user.categories.some((category) =>
      category.items.some((item) => item.itemId === itemId)
    )
  );

  const foundCategory = foundUser.categories.some((category) =>
    category.items.some((item) => item.itemId === itemId)
  );

  const foundItem = foundCategory.items.find((item) => item.itemId === itemId);
  res.json(foundItem);
};

// given a uId and a categoryId, returns all items associated with a given
const getItemsForCategory = (req, res) => {
  const uId = req.params.id;
  const { categoryId } = req.body;
  const foundUser = dataStore.users.find((user) =>
    user.categories.some((category) => category.categoryId === categoryId)
  );
  const foundCategory = foundUser.categories.find(
    (category) => category.categoryId === categoryId
  );
  const allItems = [...foundCategory.items];
  res.json(allItems);
};

// adds a new item to a given category for a particular user
const addItem = (req, res) => {
  const uId = req.params.id;
  const { categoryId, name, comment, rating, imageUrl } = req.body;
  const user = dataStore.users.find((user) => user.uId === uId);
  const newId = dataStore.totalItems;
  const newItem = {
    itemId: newId,
    name,
    comment,
    rating,
    imageUrl,
  };
  dataStore.totalUsers += 1;
  const categoryToAddTo = user.categories.find(
    (category) => category.categoryId === categoryId
  );
  categoryToAddTo.items.push(newItem);
  res.json(itemId);
};

const deleteItem = (req, res) => {
  const uId = req.params.id;
  const { itemId } = parseInt(req.query.itemId);
};
export { getItem, addItem };
