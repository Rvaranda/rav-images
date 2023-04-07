import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-slate-200 p-4">
      <section className="m-auto flex max-w-4xl items-center justify-between">
        <div>
          <Link to="/">
            <img src="http://via.placeholder.com/100x50" alt="logo" />
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
