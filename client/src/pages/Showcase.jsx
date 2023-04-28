import { useState, useEffect } from "react";

import RenderCards from "../components/RenderCards";
import Loading from "../components/Loading";

function Showcase() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const debug = false;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/posts");
        if (response.ok) {
          if (response.status === 204) setMessage("No images found");
          else {
            const data = await response.json();
            setPosts(data);
          }
        } else {
          const data = await response.json();
          setMessage(data.message);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="flex grow flex-col">
      <div className="flex h-96 items-center justify-center bg-gradient-to-tl from-yellow-300 to-blue-500 px-8">
        <h1 className="text-center text-4xl font-bold">
          Check awesome images made by the community
        </h1>
      </div>
      {!loading && !debug ? (
        posts.length === 0 ? (
          <div className="my-8 flex grow items-center justify-center">
            <p className="text-3xl text-slate-500">{message}</p>
          </div>
        ) : (
          <RenderCards posts={posts} />
        )
      ) : (
        <div className="relative my-8 flex grow items-center justify-center">
          <Loading />
        </div>
      )}
    </section>
  );
}

export default Showcase;
