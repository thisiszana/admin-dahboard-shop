import { useEffect, useState } from "react";
import { EyeOpen, EyeClosed } from "@/components/icons/Icon"; // فرض می‌کنیم که این آیکون‌ها در پروژه شما موجود هستند

export default function CustomInp({
  type,
  name,
  value,
  onChange,
  label,
  wrapperClassName,
  min,
  max,
  readOnly,
  disabled,
}) {
  const [active, setActive] = useState(false);
  const [inputType, setInputType] = useState(type || "text");

  const onFocus = () => {
    setActive(true);
  };

  const onBlur = () => {
    if (value?.length === 0) setActive(false);
  };

  useEffect(() => {
    if (value?.length !== 0) setActive(true);
  }, [value]);

  const togglePasswordVisibility = () => {
    setInputType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  return (
    <div className={`input-group ${wrapperClassName && wrapperClassName}`}>
      <input
        type={inputType}
        name={name || "input"}
        value={value}
        onChange={onChange}
        min={min || min}
        max={max || max}
        readOnly={readOnly || false}
        disabled={disabled || false}
        className="input w-full"
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {label && (
        <label className={`user-label ${active && "active"}`}>{label}</label>
      )}
      {type === "password" && (
        <div
          className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
          onClick={togglePasswordVisibility}
        >
          {inputType === "password" ? <EyeClosed /> : <EyeOpen />}
        </div>
      )}
    </div>
  );
}