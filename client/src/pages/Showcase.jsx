function Showcase() {
  return (
    <section className="mt-12 min-h-[32rem] p-8">
      <input
        className="m-auto block w-1/2 rounded-full border-2 border-slate-300 px-4 py-2 outline-none focus:border-slate-500"
        type="text"
        placeholder="Search here"
      />
      <div className="mt-8 flex items-center justify-center">
        <p className="text-3xl text-slate-500">No images found</p>
      </div>
    </section>
  );
}

export default Showcase;
