"use client";

import { useEffect, useState } from "react";

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

  const onFocus = () => {
    setActive(() => true);
  };

  const onBlur = () => {
    if (value?.length === 0) setActive(() => false);
  };

  useEffect(() => {
    if (value?.length !== 0) setActive(() => true);
  }, []);
  return (
    <div className={`input-group ${wrapperClassName && wrapperClassName}`}>
      <input
        type={type || "text"}
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
    </div>
  );
}
