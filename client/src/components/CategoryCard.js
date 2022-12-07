import ListItem from './ListItem';
function CategoryCard({ token, category, items, setSuccess }) {
  return (
    <div className="flex flex-col  overflow-auto m-4 bg-slate-100 rounded shadow-lg rounded-lg px-10 shadow-lg border-4 bg-cyan-300/20">
      <h1 className="text-5xl font-bold text-center pt-4">{category}</h1>
      <ul className="flex gap-x-10">
        {items.map((item) => (
          <ListItem item={item} setSuccess={setSuccess} token={token} />
        ))}
      </ul>
    </div>
  );
}

export default CategoryCard;
