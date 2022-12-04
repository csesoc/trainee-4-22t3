import { FaWindowClose, FaStar } from 'react-icons/fa';
function ListItem({ item }) {
  console.log(item);
  return (
    <li class="btn-fav" title="Shingeki no Kyojin">
      <a
        href="https://myanimelist.net/anime/16498/Shingeki_no_Kyojin"
        class="link bg-center"
      >
        <span>Attack on Titan</span>
        <img
          src="https://cdn.myanimelist.net/r/140x220/images/anime/10/47347.webp?s=fa1924f02140fa3fda9ef6fcf1002c44"
          className="w-auto h-auto b-0"
          alt="Shingeki no Kyojin"
        ></img>
        <span className="text-xs">I love this TV Show</span>
        <br></br>
        <div className="grid gap-x-0 gap-y-4 lg:grid-cols-10  md:grid-cols-2 ">
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
        </div>
        <div className="m-4 bg-slate-100 rounded shadow-lg h-auto">
          <div className="text-xs">Year</div>
          <div className="text-xs">2013</div>
          <div className="text-xs">Produced by</div>
          <div className="text-xs">Wit Studio / Mappa</div>
          <div className="text-xs">dflgdflgdfhjgdfhgjkdhfljgdfjl</div>
          <div className="text-xs">dflgdflgdfhjgdfhgjkdhfljgdfjl</div>
          <div className="text-xs">dflgdflgdfhjgdfhgjkdhfljgdfjl</div>
          <div className="text-xs">dflgdflgdfhjgdfhgjkdhfljgdfjl</div>
          <div className="text-xs">dflgdflgdfhjgdfhgjkdhfljgdfjl</div>
          <div className="text-xs">dflgdflgdfhjgdfhgjkdhfljgdfjl</div>
          <div className="text-xs">dflgdflgdfhjgdfhgjkdhfljgdfjl</div>
        </div>
      </a>
    </li>
  );
}

export default ListItem;
