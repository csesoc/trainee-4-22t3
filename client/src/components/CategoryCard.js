import ListItem from './ListItem';
function CategoryCard({ token, category, items, setSuccess }) {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold pt-8">{category}</h1>
      <div className="flex flex-col overflow-auto m-4 bg-slate-100 rounded shadow-lg rounded-lg px-10 shadow-lg border-4 bg-cyan-300/20">
        <div className="flex gap-x-12 px-4 py-4 w-40">
          {items.map((item) => (
            <ListItem item={item} setSuccess={setSuccess} token={token} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
