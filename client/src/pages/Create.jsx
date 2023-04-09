import { useState } from "react";

import Loading from "../components/Loading";
import FormInput from "../components/FormInput";

function Create() {
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generateImage() {
    if (!prompt) {
      console.log("debug");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/api/image?prompt=${prompt}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setPreviewImg(data.data[0].b64_json);
    } catch (err) {
      console.log(err.data?.message);
    } finally {
      setLoading(false);
    }
  }

  async function createPost() {
    try {
      const response = await fetch("http://localhost:8080/api/image/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: name,
          prompt,
          imageData: previewImg,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="p-16">
      <h1 className="mb-16 text-4xl font-bold">
        Create awesome images in an instant
      </h1>
      <form>
        <FormInput
          id="name"
          title="Your name"
          type="text"
          value={name}
          setValue={setName}
        />
        <FormInput
          id="prompt"
          title="Prompt"
          type="text"
          value={prompt}
          setValue={setPrompt}
        />
      </form>
      <div className="relative mt-8">
        <img
          className="rounded-lg object-contain"
          src={
            previewImg
              ? `data:image/png;base64,${previewImg}`
              : "http://via.placeholder.com/500x500"
          }
          alt="preview"
          width={500}
          height={500}
        />
        {loading && <Loading />}
      </div>
      <button
        className="mt-2 block w-[500px] rounded-md bg-green-600 p-2 text-lg text-white hover:bg-green-800"
        type="button"
        onClick={generateImage}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>
      <button
        className="mt-2 block w-[500px] rounded-md bg-blue-600 p-2 text-lg text-white hover:bg-blue-800"
        type="button"
        onClick={createPost}
        disabled={!previewImg}
      >
        Submit
      </button>
    </section>
  );
}

export default Create;
