import Card from "./Card";

function RenderCards() {
  return (
    <div className="grid grid-cols-1 place-items-center gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}

export default RenderCards;
