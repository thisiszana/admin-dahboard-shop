
import Link from "next/link";

const CustomLink = ({ href, title, icon, className, titleClassName }) => {
  return (
    <Link href={href || "/"} className={className || ""}>
      {icon && icon}
      {title && (
        <p className={titleClassName || "text-sm font-medium"}>{title}</p>
      )}
    </Link>
  );
};

export default CustomLink;
