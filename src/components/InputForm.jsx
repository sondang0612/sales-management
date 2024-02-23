import React from "react";
const inputClassName =
  "rounded-md border border-gray-400 w-full p-2 outline-none md:text-[14px] text-[10px] focus:border focus:border-[#493EFF]";
const InputForm = (props) => {
  const { labelName, placeholder, type, isArea, fieldName, value, onChange } =
    props;
  return (
    <div className="w-full">
      {labelName && (
        <label className="block mb-2 text-[10px] md:text-sm font-medium text-gray-900">
          {labelName}
        </label>
      )}
      {isArea ? (
        <textarea
          className={inputClassName}
          placeholder={placeholder || `Hãy nhập ${labelName}`}
          style={{ height: 100 }}
          onChange={(e) => onChange(e, fieldName)}
          value={value}
        />
      ) : (
        <input
          type={type}
          className={inputClassName}
          placeholder={placeholder || `Hãy nhập ${labelName}`}
          onChange={(e) => onChange(e, fieldName)}
          value={value}
        />
      )}
    </div>
  );
};

export default React.memo(InputForm);
