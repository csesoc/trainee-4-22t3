interface DataStore {
  users: Array<User>;
  //   categories: Array<Category>;
  //   items: Array<Item>;
}

interface User {
  details: Details;
  categories: Array<Category>; // categories are uniquely identified by name
}

interface Category {
  categoryId: number;
  name: string;
  items: Array<Item>;
}

interface Item {
  itemID: number;
  name: string;
  comment: string;
  imageUrl: string;
}

interface Details {
  username: string; // surely we just make the username the unique identifier
  email: string;
  password: string;
}

interface UserItem {
  category: string; // must be in categories else error
  itemId: string;
  itemName: string;
  custom: Array<Custom>;
}

// unlimited? might be weird tho
interface Custom {
  literallyAnyFieldName: string;
  anotherFieldName: string;
  andAnotherFieldName: string;
}

// if we want, we can give them a limit of 3 custom fields rather than unlimited? so not too ugly
interface Custom {
  field1: { literallyAnyFieldName: string };
  field2: { anotherFieldName: string };
  field3: { andAnotherFieldName: string };
}

/**
 * TODO:
 *  - current:
 *      - Item: get, create, update, delete
 *      - Category, User (details)
 *      -       get, post,   put,    delete
 */
