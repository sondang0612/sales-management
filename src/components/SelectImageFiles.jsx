/* eslint-disable @next/next/no-img-element */
import React from "react";

const SelectImageFiles = ({ onChange, isSuccess }) => {
  const [images, setImages] = React.useState([]);
  const handleChangeFiles = async (e) => {
    e.stopPropagation();
    const files = [...e.target.files];
    console.log(files);
    const formatFiles = files.map((file) => URL.createObjectURL(file));
    setImages(formatFiles);
    onChange(files);
  };

  const deleteImage = (image) => {
    setImages((prev) => prev.filter((item) => item !== image));
  };

  React.useEffect(() => {
    if (isSuccess) setImages([]);
  }, [isSuccess]);

  return (
    <div>
      <div className="flex flex-row gap-2 items-center mb-2">
        <input
          accept="image/*"
          type="file"
          id="imgInp"
          multiple
          onChange={handleChangeFiles}
        />
      </div>
      <div className="mb-2 flex flex-row flex-wrap gap-2">
        {images?.map((image, index) => (
          <div key={index} className="relative">
            <img src={image} alt="test" className="rounded-sm size-[100px]" />
            <div
              className="cursor-pointer size-[20px] bg-[#333] text-white absolute top-1 right-1  flex items-center justify-center rounded-full"
              onClick={() => deleteImage(image)}
            >
              x
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectImageFiles;
