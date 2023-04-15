import { FaRegUserCircle } from "react-icons/fa";

function Card({ post }) {
  function trimPrompt() {
    let maxLength = 350;
    return post.prompt.length > maxLength ? `${post.prompt.slice(0, maxLength)}...` : post.prompt;
  }

  return (
    <div className="group relative max-w-xs overflow-hidden rounded-md shadow-md">
      <img className="object-fit h-80 w-80" src={post.image} alt="image" />
      <div className="absolute bottom-0 hidden w-full bg-black/70 p-4 text-white group-hover:block">
        <p className="mb-4">{trimPrompt()}</p>
        <div className="flex items-center gap-1">
          <FaRegUserCircle />
          <p className="text-xs">{post.user}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
