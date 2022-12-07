import ListItem from './ListItem';
function CategoryCard({ token, category, items, setSuccess }) {
  return (
    <div className="flex flex-col overflow-auto m-4 bg-slate-100 rounded shadow-lg rounded-lg px-10 shadow-lg border-4 bg-cyan-300/20">
      <h1 className="text-5xl font-bold text-center pt-4">{category}</h1>
      <div className="flex">
        {items.map((item) => (
          <ListItem item={item} setSuccess={setSuccess} token={token} />
        ))}
      </div>
    </div>
  );
}

export default CategoryCard;
