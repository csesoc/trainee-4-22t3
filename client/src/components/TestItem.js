import ListItem from '../components/ListItem';
function TestItem({ category, items, setSuccess }) {
  return (
    <div className="flex flex-col m-4 bg-slate-100 rounded shadow-lg h-auto max-w-xl rounded-lg px-10 shadow-lg border-4 bg-cyan-300/20">
      <div className="overflow-auto">
        <h1 className="text-5xl font-bold text-center pt-4">{category}</h1>
        <br></br>
        <ol className="grid md:grid-cols-2 lg:grid-cols-2">
          {items.map((item) => (
            <ListItem item={item} />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default TestItem;
