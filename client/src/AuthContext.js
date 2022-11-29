import { createContext } from 'react';

// const register = async (userData) => {
//   const res = await axios.post(
//     'http://localhost:5000/users/register',
//     userData
//   );
//
//   if (res.data) {
//     localStorage.setItem('user', JSON.stringify(res.data));
//     setUser(res.data);
//   }
// };
//
// const login = async (userData) => {
//   const res = await axios.post('http://localhost:5000/users/login', userData);
//
//   if (res.data) {
//     localStorage.setItem('user', JSON.stringify(res.data));
//     setUser(res.data);
//   }
// };
//
// const logout = () => {
//   localStorage.removeItem('user');
//   setUser(null);
// };

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
