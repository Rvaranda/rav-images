import RenderCards from "../components/RenderCards";

function Showcase() {
  return (
    <section className="min-h-[32rem]">
      <div className="flex h-96 items-center justify-center bg-gradient-to-tl from-yellow-300 to-blue-500 px-8">
        <h1 className="text-center text-4xl font-bold">
          Check awesome images made by the community
        </h1>
      </div>
      {/*<input
        className="m-auto block w-1/2 rounded-full border-2 border-slate-300 px-4 py-2 outline-none focus:border-slate-500"
        type="text"
        placeholder="Search here"
  />*/}
      {/* <div className="mt-8 flex items-center justify-center">
        <p className="text-3xl text-slate-500">No images found</p>
      </div> */}
      <RenderCards />
    </section>
  );
}

export default Showcase;
