function Card() {
  return (
    <div className="group relative max-w-md rounded-full">
      <img
        className="object-contain"
        src="http://via.placeholder.com/400x400"
        alt="image"
        width="400"
        height="400"
      />
      <div className="absolute bottom-0 hidden bg-black/50 p-4 text-white group-hover:block">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </div>
    </div>
  );
}

export default Card;
