import Card from "./Card";

function RenderCards({ posts }) {
  return (
    <div className="grid grid-cols-1 place-items-center gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {posts.map((post) => (
        <Card key={post._id} post={post} />
      ))}
    </div>
  );
}

export default RenderCards;
