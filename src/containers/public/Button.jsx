import React from "react";
const Button = (props) => {
  const {
    onClick,
    title = "Text",
    bgColor,
    textColor,
    textSize,
    hover,
  } = props;
  return (
    <button
      className={`border border-[#493EFF] text-[10px] p-2 rounded-md ${
        textSize ? `md:${textSize}` : "md:text-[14px]"
      } ${textColor ? textColor : "text-[#493EFF]"} ${
        bgColor ? bgColor : "bg-white"
      } ${hover && hover}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
