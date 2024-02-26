/* eslint-disable @next/next/no-img-element */
import React from "react";

const SelectImageFiles = ({ onChange }) => {
  const [images, setImages] = React.useState([]);

  const handleChangeFiles = async (e) => {
    e.stopPropagation();
    const files = [...e.target.files];
    const formatFiles = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...formatFiles]);
  };

  const deleteImage = (image) => {
    setImages((prev) => prev.filter((item) => item !== image));
  };

  React.useEffect(() => {
    onChange(images);
  }, [onChange, images]);

  return (
    <div>
      <div className="flex flex-row gap-2 items-center mb-2 ">
        <label className="text-[10px] md:text-sm font-medium text-gray-900">
          Ảnh kệ (6 tấm)
        </label>
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
            <img src={image} alt="test" className="rounded-sm size-[40px]" />
            <div
              className="cursor-pointer size-[20px] bg-[#333] absolute top-0 right-0  flex items-center justify-center rounded-full"
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
