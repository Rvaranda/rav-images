function CardModal({ prompt, imageUrl, user, setShowModal }) {
  return (
    <>
      <div
        className="fixed left-0 top-0 z-10 h-full w-full bg-black bg-opacity-60"
        onClick={() => setShowModal(false)}
      ></div>
      <div className="fixed left-1/2 top-1/2 z-20 flex w-3/4 -translate-x-2/4 -translate-y-2/4 justify-between bg-neutral-100">
        <img src={imageUrl} alt="image" width={800} height={800} />
        <p className="grow p-4">
          {prompt}
          <br />
          <br />
          {`- ${user}`}
        </p>
      </div>
    </>
  );
}

export default CardModal;
