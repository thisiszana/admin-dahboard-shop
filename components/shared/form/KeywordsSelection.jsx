"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { CircleClose, Trash } from "@/components/icons/Icon";
import CustomInp from "./CustomInp";
import CustomBtn from "../CustomBtn";

const KeywordsSelection = ({ form, setForm }) => {
  const [keywords, setKeyWords] = useState(form.keywords);
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onClick = (e) => {
    e.preventDefault();

    if (!value) {
      toast.error("Type a keyword please!");
      return;
    }

    if (keywords.find((item) => item === value)) {
      toast.error("You've already pick this keyword");
      return;
    }
    setKeyWords([...keywords, value]);
    setValue("");
    toast.success("Keyword added");
  };

  useEffect(() => {
    setForm({
      ...form,
      keywords: keywords,
    });
  }, [keywords]);

  const removeKeyword = (keyword) => {
    const newKeywords = keywords.filter((item) => item !== keyword);
    setKeyWords(newKeywords);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-2">
        <CustomInp
          type="text"
          value={value}
          onChange={onChange}
          label="Type a Keyword"
        />
        <CustomBtn
          type="button"
          title="Add"
          onClick={onClick}
          classNames="w-fit p-btn bg-lightGray rounded-btn"
        />
      </div>
      {keywords.length !== 0 && (
        <div className="flex gap-2 items-center flex-wrap mt-3">
          {keywords.map((keyword) => (
            <CustomBtn
              key={keyword}
              type="button"
              onClick={() => removeKeyword(keyword)}
              classNames="rounded-btn flex items-center gap-btn bg-dark1 hover:bg-dark2 Transition py-[2.5px] px-1.5 group"
              title={
                <>
                  <span className="text-lightGray text-p2">{keyword}</span>
                  <CircleClose
                    size={18}
                    className="text-darkGray group-hover:text-lightGray Transition"
                  />
                </>
              }
            />
          ))}
          <CustomBtn
            type="button"
            onClick={() => setKeyWords([])}
            classNames="rounded-btn flex items-center gap-btn text-[#ff5630] hover:bg-lightOrange Transition p-2"
            title={<p className="text-p1 font-bold">Clear</p>}
            icon={<Trash />}
          />
        </div>
      )}
    </div>
  );
};

export default KeywordsSelection;
