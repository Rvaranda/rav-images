import { useState } from "react";

import Loading from "../components/Loading";
import FormInput from "../components/FormInput";

function Create() {
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const [promptError, setPromptError] = useState(false);

  async function generateImage() {
    if (!prompt) {
      setPromptError(true);
      return;
    }
    setLoading(true);
    setPromptError(false);

    try {
      const response = await fetch(`http://localhost:8080/api/image?prompt=${prompt}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

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
    <section className="">
      <div className="flex h-96 items-center justify-center bg-gradient-to-tl from-yellow-300 to-blue-500">
        <h1 className="text-4xl font-bold">Create awesome images in an instant</h1>
      </div>
      <div className="mt-8 flex justify-between gap-16 px-16">
        <div className="relative h-[600px] w-[600px]">
          <img
            className="rounded-lg object-contain"
            src={
              previewImg
                ? `data:image/png;base64,${previewImg}`
                : "http://via.placeholder.com/600x600"
            }
            alt="preview"
            width={600}
            height={600}
          />
          {loading && <Loading />}
        </div>
        <div className="flex grow flex-col">
          <div className="mb-16 flex flex-col items-end gap-4">
            <FormInput
              className={`${promptError ? "border-red-600 focus:border-red-600" : ""}`}
              id="prompt"
              title="Enter your prompt"
              type="text"
              value={prompt}
              setValue={setPrompt}
            />

            <button
              className="w-36 rounded-md bg-green-600 py-2 text-lg text-white hover:bg-green-800 disabled:bg-green-300"
              type="button"
              onClick={generateImage}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
          <div className="flex w-1/2 max-w-md flex-col items-end gap-4 self-end">
            <h3 className="w-full text-center text-2xl font-bold">Want to share your image?</h3>
            <FormInput id="name" title="Your name" type="text" value={name} setValue={setName} />
            <button
              className="w-36 rounded-md bg-blue-600 py-2 text-lg text-white hover:bg-blue-800 disabled:bg-neutral-400"
              type="button"
              onClick={createPost}
              disabled={!previewImg || !name}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Create;
