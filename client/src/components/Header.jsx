import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="p-4">
      <section className="m-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link to="/">
            <p className="text-3xl font-bold text-slate-500">RAV Images</p>
          </Link>
        </div>
        <Link
          to="/create"
          className="w-full max-w-xs rounded-md bg-blue-400 px-4 py-2 text-center text-xl text-white hover:bg-blue-600 sm:w-auto"
        >
          Create
        </Link>
      </section>
    </header>
  );
}

export default Header;
