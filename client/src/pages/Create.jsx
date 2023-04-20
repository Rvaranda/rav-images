import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";

import Loading from "../components/Loading";
import FormInput from "../components/FormInput";

function Create() {
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [promptError, setPromptError] = useState(false);

  const navigate = useNavigate();

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
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  async function downloadImage() {
    try {
      const response = await fetch(`data:image/png;base64,${previewImg}`);
      const blobImg = await response.blob();
      saveAs(blobImg, "image.png");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="">
      <div className="flex h-96 items-center justify-center bg-gradient-to-tl from-yellow-300 to-blue-500">
        <h1 className="p-4 text-center text-4xl font-bold">Create awesome images in an instant</h1>
      </div>
      <div className="mt-8 grid gap-4 px-8 lg:grid-cols-2 lg:grid-rows-2">
        <div className="order-2 row-span-2 justify-self-center lg:order-none">
          <div className="relative">
            <img
              className="rounded-lg object-contain"
              src={
                previewImg
                  ? `data:image/png;base64,${previewImg}`
                  : "public/preview_placeholder.jpg"
              }
              alt="preview"
              width={600}
              height={600}
            />
            {loading && <Loading />}
          </div>
          <button
            type="button"
            className="mt-4 block w-full rounded-md bg-black px-4 py-2 text-xl text-white disabled:bg-neutral-400"
            onClick={() => downloadImage()}
            disabled={!previewImg}
          >
            Download image
          </button>
        </div>
        <div className="order-1 mb-8 flex flex-col items-end gap-4 lg:order-none">
          <FormInput
            className={`${
              promptError
                ? "border-red-600 focus:border-red-600"
                : "border-slate-300 focus:border-slate-500"
            }`}
            id="prompt"
            title="Enter your prompt"
            type="text"
            value={prompt}
            setValue={setPrompt}
          />

          <button
            className="w-full rounded-md bg-green-600 py-2 text-lg text-white hover:bg-green-800 disabled:bg-green-300 sm:w-36"
            type="button"
            onClick={generateImage}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="order-3 mt-8 flex w-full max-w-2xl flex-col gap-4 sm:justify-self-center lg:order-none xl:justify-self-end">
          <h3 className="text-center text-2xl font-bold">Want to share your image?</h3>
          <FormInput
            className="border-slate-300 focus:border-slate-500"
            id="name"
            title="Your name"
            type="text"
            value={name}
            setValue={setName}
          />
          <button
            className="rounded-md bg-blue-600 py-2 text-lg text-white hover:bg-blue-800 disabled:bg-neutral-400 sm:w-36 sm:self-end"
            type="button"
            onClick={createPost}
            disabled={!previewImg || !name}
          >
            Share
          </button>
        </div>
      </div>
    </section>
  );
}

export default Create;
