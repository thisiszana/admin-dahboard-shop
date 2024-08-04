export default function RadioList({ form, setForm }) {
  const { gender } = form;

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };
  return (
    <div className="flex flex-col gap-1 border-dashed bg-gray-50 border-2 rounded-xl p-3">
      <p className="font-light text-[12px] mb-[5px]">Gender</p>
      <div className="flex items-center">
        <div className="flex items-center justify-evenly bg-white shadow text-black ml-[30px] w-[80px] px-[5px] py-[3px] rounded-[5px] pointer-events-auto">
          <label htmlFor="female">Female</label>
          <input
            type="radio"
            name="gender"
            value="female"
            id="female"
            checked={gender === "female"}
            onChange={changeHandler}
          />
        </div>
        <div className="flex items-center justify-evenly bg-white shadow text-black ml-[30px] w-[80px] px-[5px] py-[3px] rounded-[5px] pointer-events-auto">
          <label htmlFor="man">Man</label>
          <input
            type="radio"
            name="gender"
            value="man"
            id="man"
            checked={gender === "man"}
            onChange={changeHandler}
          />
        </div>
        <div className="flex items-center justify-evenly bg-white shadow text-black ml-[30px] w-[80px] px-[5px] py-[3px] rounded-[5px] pointer-events-auto">
          <label htmlFor="etc">etc</label>
          <input
            type="radio"
            name="gender"
            value="etc"
            id="etc"
            checked={gender === "etc"}
            onChange={changeHandler}
          />
        </div>
      </div>
    </div>
  );
}
