"use client";
import React from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import InputForm from "@/src/components/InputForm";
import Button from "../public/Button";
import plusLogo from "@/public/plus.svg";
import deleteLogo from "@/public/delete.svg";
import useCreateSalonReport from "@/src/react-query/useCreateSalonReport";
import useMySalonReports from "@/src/react-query/useMySalonReports";
import useMySalons from "@/src/react-query/useMySalons";

const initialFormData = {
  name: "",
  address: "",
  content: "",
  category: "no-account",
  phone: "",
};

const FormSteps = () => {
  const [step, setStep] = React.useState(0);
  const [formData, setFormData] = React.useState([initialFormData]);
  const { mutate: createSalonReport } = useCreateSalonReport();
  const validate = ({ address, category, content, name, phone }) => {
    if (!category || !address || !content || !name || !phone) return false;
    return true;
  };

  const onSubmit = () => {
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
      return undefined;
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

  return (
    <div className="bg-white rounded-md w-full md:w-[60%] p-5 shadow-md">
      <div className="flex flex-row md:gap-[40px] gap-[10px]">
        <div className="bg-primary rounded-md flex flex-col py-5 md:py-8 gap-1 w-[20%]">
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
        </div>
        <div className="bg-white rounded-md w-[80%] flex flex-col gap-5">
          <select
            className={`border border-gray-500  text-sm rounded-lg block p-1.5 text-[14px]`}
            value={formData[step]?.category || "no-account"}
            onChange={(e) =>
              setFormData((prev) => {
                return prev.map((item, index) =>
                  index !== step ? item : { ...item, category: e.target.value }
                );
              })
            }
          >
            <option value="no-account">
              Salon mới tiếp cận (chưa có account)
            </option>
            <option value="re-take-care-no-account">
              Salon mới (chăm sóc lại)
            </option>
            <option value="re-take-care-have-account">
              Chăm sóc đã có account
            </option>
          </select>
          <InputForm
            labelName="Tên Salon"
            onChange={onChangeInput}
            fieldName="name"
            value={formData[step]?.name}
          />
          <InputForm
            labelName="Địa chỉ"
            onChange={onChangeInput}
            fieldName="address"
            value={formData[step]?.address}
          />
          <InputForm
            labelName="Số điện thoại"
            type="tel"
            onChange={onChangeInput}
            fieldName="phone"
            value={formData[step]?.phone}
          />
          <InputForm
            labelName="Báo cáo nội dung"
            isArea
            onChange={onChangeInput}
            fieldName="content"
            value={formData[step]?.content}
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
  );
};

export default FormSteps;
