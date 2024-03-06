import SelectImageFiles from "@/src/components/SelectImageFiles";
import UserLayout from "@/src/components/layout/UserLayout";
import { SALON_CATEGORIES } from "@/src/constant";
import useAllMySalons from "@/src/react-query/useAllMySalons";
import useCreateSalonReport from "@/src/react-query/useCreateSalonReport";
import useProfile from "@/src/react-query/useProfile";
import authClient from "@/src/utils/authClient";
import { uploadImages } from "@/src/utils/upload";
import Form from "antd/lib/form/Form";
import { Button, Select, Upload } from "antd/lib/index";
import Input from "antd/lib/input/Input";
import React from "react";
import toast from "react-hot-toast";
const { TextArea } = Input;

const Page = () => {
  const [form] = Form.useForm();
  const { data: profile } = useProfile();
  const [uploading, setUploading] = React.useState(false);
  const [localImages, setLocalImages] = React.useState([]);
  const ref = React.useRef(null);
  const { data: mySalons } = useAllMySalons();
  const [isOldSalon, setIsOldSalon] = React.useState(false);
  const { mutate: createSalonReport } = useCreateSalonReport({
    onSuccess: () => {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        name: "",
        phone: "",
        address: "",
        content: "",
      });
      setLocalImages([]);
      setUploading(false);
    },
  });

  const arrayFormAccount = React.useMemo(
    () => [
      {
        label: "Hình thức",
        name: "category",
        labelAlign: "left",
        className: "",
        component: (
          <Select>
            {SALON_CATEGORIES?.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        ),
      },
      {
        label: "Tên Salon",
        name: "name",
        rules: [
          {
            required: true,
          },
        ],
        labelAlign: "left",
        className: "",
        component: !isOldSalon ? (
          <Input className="rounded-md" />
        ) : (
          <Select showSearch>
            {mySalons?.salons?.map((item) => (
              <Select.Option key={item?.name} value={item?.name}>
                {item?.name}
              </Select.Option>
            ))}
          </Select>
        ),
      },
      {
        label: "Số điện thoại",
        name: "phone",
        rules: [{ required: true }],
        labelAlign: "left",
        className: "",
        component: <Input className="rounded-md" disabled={isOldSalon} />,
      },
      {
        label: "Địa chỉ",
        name: "address",
        rules: [{ required: true }],
        labelAlign: "left",
        className: "",
        component: <Input className="rounded-md" disabled={isOldSalon} />,
      },
      {
        label: "Nội dung báo cáo",
        name: "content",
        rules: [{ required: true }],
        labelAlign: "left",
        className: "",
        component: <TextArea className="rounded-md" rows={4} />,
      },
      {
        label: "Ảnh kệ",
        labelAlign: "left",
        className: "",
        component: (
          <Upload
            accept=".png,.jpg"
            multiple
            onChange={(info) => {
              setLocalImages(info.fileList);
            }}
            fileList={localImages}
          >
            <Button>Tải hình</Button>
          </Upload>
        ),
      },
      {
        component: (
          <Button
            type="primary"
            htmlType="submit"
            className="rounded-md hover:bg-blue-500 bg-blue-400"
            loading={uploading}
            disabled={uploading}
          >
            Nộp
          </Button>
        ),
      },
    ],
    [mySalons, isOldSalon, localImages, uploading]
  );

  const renderForm = ({ component, ...itemProps }, i) => {
    return (
      <Form.Item {...itemProps} key={i}>
        {component}
      </Form.Item>
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  const onFinish = async (data) => {
    setUploading(true);
    if (localImages.length === 0) {
      toast.error("Vui lòng chọn ảnh kệ");
      return undefined;
    }
    const images = await uploadImages(
      localImages,
      `${profile?.username}/${data.name}`
    );
    createSalonReport({ ...data, images });
  };

  const onFormValuesChangeHandler = (changedValues, values) => {
    const [name] = Object.keys(changedValues);
    if (name === "category") {
      setIsOldSalon(values[name] !== SALON_CATEGORIES[0].value);
      form.setFieldsValue({
        ...form.getFieldsValue(),
        phone: "",
        name: "",
        address: "",
        content: "",
      });
    } else if (name === "name") {
      const salonInfo = mySalons?.salons?.filter(
        (item) => item.name === values[name]
      );

      if (salonInfo?.length !== 0) {
        form.setFieldsValue({
          ...form.getFieldsValue(),
          phone: salonInfo[0].phone,
          address: salonInfo[0].address,
        });
      }
    }
  };

  return (
    <UserLayout title={"Nhập báo cáo"}>
      <div className="p-4 bg-white rounded-md">
        <div className="mt-7 ml-10">
          <Form
            ref={ref}
            form={form}
            name="accountInformation"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onValuesChange={onFormValuesChangeHandler}
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
            initialValues={{ category: SALON_CATEGORIES[0].value }}
            size="large"
          >
            {arrayFormAccount
              .filter((item) => !(item.show === false))
              .map(renderForm)}
          </Form>
        </div>
      </div>
    </UserLayout>
  );
};

export default authClient(Page);
