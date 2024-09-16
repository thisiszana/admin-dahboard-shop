"use client";

import { useEffect, useState } from "react";

export default function CustomSelect({
  name,
  label,
  value,
  onChange,
  wrapperClassName,
  options,
}) {
  const [active, setActive] = useState(false);

  const onFocus = () => {
    setActive(() => true);
  };

  const onBlur = () => {
    if (!value) {
      setActive(() => false);
    }
  };

  useEffect(() => {
    if (value) {
      setActive(() => true);
    }
  }, [value]);

  return (
    <div className={`input-group ${wrapperClassName || ""}`}>
      <select
        name={name}
        className="input w-full"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <option value=""></option>
        {options.map((optionGroup, groupIndex) =>
          optionGroup.map((op, optionIndex) => (
            <option key={`${groupIndex}-${optionIndex}`} value={op.name}>
              {op.name}
            </option>
          ))
        )}
      </select>
      {label && (
        <label className={`user-label ${active ? "active" : ""}`}>
          {label}
        </label>
      )}
    </div>
  );
}
