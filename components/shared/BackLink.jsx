import Link from "next/link";

const BackLink = ({ href, icon, title, classNames, titleClassName }) => {
  const bassClassNames = `rounded-lg px-3 py-1.5 Transition flex items-center gap-2 hoverable`;

  return (
    <Link
      href={href || "/"}
      className={classNames ? classNames : bassClassNames}
    >
      {icon && icon}
      {title && (
        <p className={titleClassName || "text-sm font-medium"}>{title}</p>
      )}
    </Link>
  );
};

export default BackLink;
