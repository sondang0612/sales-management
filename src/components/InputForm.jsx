import React from "react";
const inputClassName =
  "rounded-md border border-gray-400 w-full text-black p-2 outline-none md:text-[14px] text-[10px] focus:border focus:border-[#493EFF]";
const InputForm = (props) => {
  const {
    labelName,
    placeholder,
    type,
    isArea,
    fieldName,
    value,
    onChange,
    readOnly,
  } = props;
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
          style={{ height: 200 }}
          onChange={(e) => onChange(e, fieldName)}
          value={value}
        />
      ) : (
        <input
          type={type}
          className={`${inputClassName} ${
            readOnly ? "focus:border-gray-500 text-gray-500" : ""
          }`}
          placeholder={placeholder || `Hãy nhập ${labelName}`}
          onChange={(e) => onChange(e, fieldName)}
          value={value}
          readOnly={readOnly}
        />
      )}
    </div>
  );
};

export default React.memo(InputForm);
