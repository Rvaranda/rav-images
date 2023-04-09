import { useState, useEffect } from "react";
import Card from "./Card";

function RenderCards() {
  const [imagesUrls, setImagesUrls] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/images");
        const data = await response.json();
        setImagesUrls(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchImageUrls();
  }, []);

  return (
    <div className="grid grid-cols-1 place-items-center gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {imagesUrls.map((image) => (
        <Card key={image} src={image} />
      ))}
    </div>
  );
}

export default RenderCards;
