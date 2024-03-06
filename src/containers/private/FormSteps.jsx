"use client";
import InputForm from "@/src/components/InputForm";
import useAllMySalons from "@/src/react-query/useAllMySalons";
import useCreateSalonReport from "@/src/react-query/useCreateSalonReport";
import React from "react";
import toast from "react-hot-toast";
import Button from "../public/Button";
import SelectImageFiles from "@/src/components/SelectImageFiles";
import { Modal, Spin } from "antd/lib/index";
import { uploadImages } from "@/src/utils/upload";

const initialFormData = {
  name: "",
  address: "",
  content: "",
  category: "no-account",
  phone: "",
  images: [],
  localImages: [],
};

const FormSteps = () => {
  const [step, setStep] = React.useState(0);
  const [formData, setFormData] = React.useState([initialFormData]);
  const { mutate: createSalonReport, isSuccess } = useCreateSalonReport({
    onSuccess: () => console.log("hello"),
  });
  const [modal, setModal] = React.useState(false);
  const { data: mySalons } = useAllMySalons();
  const validate = ({
    address,
    category,
    content,
    name,
    phone,
    localImages,
  }) => {
    if (!category || !address || !content || !name || !phone) return false;
    if (localImages.length === 0) {
      toast.error("Chưa chọn ảnh kệ");
      return false;
    }

    return true;
  };
  const onSubmit = async () => {
    setModal(true);
    const status = {
      isSuccess: true,
      index: 0,
    };
    for (let i = 0; i < formData.length; i++) {
      if (!validate(formData[i])) {
        status.isSuccess = false;
        status.index = i;
        break;
      }
    }

    if (!status.isSuccess) {
      toast.error(`Form thứ ${status.index + 1} chưa điền đủ`);
      setModal(false);

      return undefined;
    }
    for (let i = 0; i < formData.length; i++) {
      const images = await uploadImages(
        formData[i].localImages,
        `${formData[i].name} (${formData[i].address})`
      );
      formData[i].images = images;
    }
    createSalonReport({ formData });
  };

  const goNextStep = (type) => {
    if (type === "next") {
      if (step < formData.length - 1) {
        setStep(step + 1);
      } else {
        onSubmit();
      }
    } else {
      if (step !== 0) {
        setStep(step - 1);
      }
    }
  };

  const goToSpecificStep = (stepIndex) => {
    setStep(stepIndex);
  };

  const onChangeInput = React.useCallback(
    (e, type) => {
      setFormData((prev) => {
        return prev.map((item, index) =>
          index !== step ? item : { ...item, [`${type}`]: e.target.value }
        );
      });
    },
    [setFormData, step]
  );

  const handleSetLocalImagesToFormData = (files) => {
    setFormData((prev) => {
      return prev.map((item, index) =>
        index !== step ? item : { ...item, localImages: files }
      );
    });
  };

  React.useEffect(() => {
    if (isSuccess) {
      setFormData([initialFormData]);
      setModal(false);
    }
  }, [isSuccess]);

  return (
    <div className="relative">
      <div className="flex justify-center py-5">
        <div className="bg-white md:w-[60%] w-[80%] rounded-md shadow-md md:p-10 p-5">
          <div className="flex flex-row md:gap-[40px] gap-[10px]">
            {/* <div className="bg-primary rounded-md flex flex-col py-5 md:py-8 gap-1">
            {formData.map((_, index) => (
              <div
                onClick={() => goToSpecificStep(index)}
                key={index}
                className={`font-bold flex flex-row justify-between text-[10px] cursor-pointer md:text-[14px] w-full py-4 px-5 ${
                  index === step
                    ? "bg-secondary text-white"
                    : "transparent text-white"
                }`}
              >
                {`Salon ${index + 1}`}
                {index !== 0 && (
                  <Image
                    src={deleteLogo}
                    alt="delete-svg"
                    width={20}
                    height={20}
                    color="white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setStep(0);
                      setFormData((data) => data.filter((_, i) => index !== i));
                    }}
                  />
                )}
              </div>
            ))}
            {formData.length < 6 && (
              <div
                onClick={() => setFormData([...formData, initialFormData])}
                className={`text-white font-bold text-[10px] cursor-pointer md:text-[14px] py-3 px-5 flex items-center justify-center hover:bg-secondary`}
              >
                <div className="flex items-center justify-center rounded-full">
                  <Image src={plusLogo} alt="plus-svg" width={30} height={30} />
                </div>
              </div>
            )}
          </div> */}
            <div className="bg-white rounded-md w-full flex flex-col gap-5">
              <select
                className={`border border-gray-500 w-[100%] text-sm rounded-lg block p-1.5 text-[14px] text-black`}
                value={formData[step]?.category || "no-account"}
                onChange={(e) =>
                  setFormData((prev) => {
                    return prev.map((item, index) =>
                      index !== step
                        ? item
                        : { ...initialFormData, category: e.target.value }
                    );
                  })
                }
              >
                <option value="no-account" className="text-black">
                  Salon mới tiếp cận (chưa có account)
                </option>
                <option value="re-take-care-no-account" className="text-black">
                  Salon mới (chăm sóc lại)
                </option>
                <option
                  value="re-take-care-have-account"
                  className="text-black"
                >
                  Chăm sóc đã có account
                </option>
              </select>
              {formData[step].category === "no-account" ? (
                <InputForm
                  labelName="Tên Salon"
                  onChange={onChangeInput}
                  fieldName="name"
                  value={formData[step]?.name}
                />
              ) : (
                <div>
                  <label className="block mb-2 text-[10px] md:text-sm font-medium text-gray-900">
                    Tên Salon
                  </label>
                  <select
                    className={`border border-gray-500 w-[100%] text-sm rounded-lg block p-1.5 text-[14px] text-black`}
                    value={formData[step]?.name}
                    onChange={(e) => {
                      const salons = mySalons?.salons?.filter(
                        (item) => item.name === e.target.value
                      );
                      if (salons.length !== 0) {
                        const { name, address, phone } = salons[0];
                        setFormData((prev) => {
                          return prev.map((item, index) =>
                            index !== step
                              ? item
                              : {
                                  ...item,
                                  name,
                                  address,
                                  phone,
                                }
                          );
                        });
                      }
                    }}
                  >
                    <option value={"no-select"} className="text-black">
                      Chọn tên salon
                    </option>
                    {mySalons?.salons?.map((item) => (
                      <option
                        value={item.name}
                        className="text-black"
                        key={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <InputForm
                labelName="Địa chỉ"
                onChange={onChangeInput}
                fieldName="address"
                value={formData[step]?.address}
                readOnly={
                  formData[step].category !== "no-account" ? true : false
                }
              />
              <InputForm
                labelName="Số điện thoại"
                type="tel"
                onChange={onChangeInput}
                fieldName="phone"
                value={formData[step]?.phone}
                readOnly={
                  formData[step].category !== "no-account" ? true : false
                }
              />
              <InputForm
                labelName="Báo cáo nội dung"
                isArea
                onChange={onChangeInput}
                fieldName="content"
                value={formData[step]?.content}
              />
              <SelectImageFiles
                onChange={handleSetLocalImagesToFormData}
                isSuccess={isSuccess}
              />
              <div className="w-full">
                {step !== 0 && (
                  <Button title="Quay lại" onClick={() => goNextStep("prev")} />
                )}
                <div className="float-right">
                  <Button
                    title={step < formData.length - 1 ? "Tiếp theo" : "Nộp"}
                    bgColor="bg-primary"
                    textColor="text-white"
                    onClick={() => goNextStep("next")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <div className="flex items-center justify-center top-0 absolute w-full h-full bg-[rgba(0,0,0,0.5)] z-10">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default FormSteps;
