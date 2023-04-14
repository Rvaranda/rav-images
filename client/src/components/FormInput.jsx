function FormInput({ className, id, title, type, value, setValue }) {
  return (
    <div className="w-full">
      <label className="mb-2 ml-2 block" htmlFor={id}>
        {title}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="off"
        className={`${className} block w-full rounded-full border-2 px-4 py-2 outline-none`}
        required
      />
    </div>
  );
}

export default FormInput;
