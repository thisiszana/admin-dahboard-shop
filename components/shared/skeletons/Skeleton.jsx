const Skeleton = ({ className, children, bgColor }) => {
  return (
    <div
      className={`animate-pulse ${
        bgColor ? bgColor : "bg-gray-200"
      }  ${className}`}
    >
      {children}
    </div>
  );
};

export default Skeleton;
