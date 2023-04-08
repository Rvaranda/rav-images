import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="p-4">
      <section className="m-auto flex max-w-7xl items-center justify-between">
        <div>
          <Link to="/">
            {/* <img src="http://via.placeholder.com/100x50" alt="logo" /> */}
            <p className="text-3xl font-bold text-slate-500">RAV Images</p>
          </Link>
        </div>
        <Link
          to="/create"
          className="rounded-md bg-blue-400 px-4 py-2 text-xl text-white hover:bg-blue-600"
        >
          Create
        </Link>
      </section>
    </header>
  );
}

export default Header;
