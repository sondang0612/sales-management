import axios from "axios";
const uploadImages = async (files) => {
  const upload_preset = process.env.NEXT_PUBLIC_UPLOAD_ASSETS_NAME;
  if (!upload_preset) return undefined;
  const formData = new FormData();
  const fileArrays = Object.keys(files).map((key) => [key, files[key]]);
  let images = [];

  for (let file of fileArrays) {
    formData.append("file", file[1]);
    formData.append("upload_preset", upload_preset);
    const response = await axios({
      method: "post",
      url: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      data: formData,
    });
    if (response.status === 200) images = [...images, response.data.secure_url];
  }

  return images;
};

export { uploadImages };
