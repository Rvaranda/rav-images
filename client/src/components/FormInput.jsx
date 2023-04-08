function FormInput({ id, title, type, value, setValue }) {
  return (
    <>
      <label className="mb-4 ml-4 block" htmlFor={id}>
        {title}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="block w-1/2 rounded-full border-2 border-slate-300 px-4 py-2 outline-none focus:border-slate-500"
        required
      />
    </>
  );
}

export default FormInput;
