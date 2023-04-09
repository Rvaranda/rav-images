function Card({ src }) {
  return (
    <div className="group relative max-w-xs overflow-hidden rounded-md shadow-md">
      <img
        className="object-fit h-80 w-80"
        // src="http://via.placeholder.com/320x320"
        src={src}
        alt="image"
      />
      <div className="absolute bottom-0 hidden bg-black/50 p-4 text-white group-hover:block">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </div>
    </div>
  );
}

export default Card;
