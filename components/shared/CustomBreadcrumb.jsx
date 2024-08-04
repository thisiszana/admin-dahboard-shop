import { Fragment } from "react";

const CustomBreadcrumb = ({ items }) => {
  return (
    <div className="flex items-center flex-wrap gap-3 mb-8">
      {items.map((item, index) => (
        <Fragment key={index}>
          <div
            className={`py-1 px-2 rounded-btn text-p1 ${
              item.inActive ? "text-gray-400" : "hoverable"
            }`}
          >
            {item.title}
          </div>
          {index < items.length - 1 && <p>&#8226;</p>}
        </Fragment>
      ))}
    </div>
  );
};

export default CustomBreadcrumb;
