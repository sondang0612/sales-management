import UserLayout from "@/src/components/layout/UserLayout";
import useProfile from "@/src/react-query/useProfile";
import useUpdateProfile from "@/src/react-query/useUpdateProfile";
import authClient from "@/src/utils/authClient";
import Form from "antd/lib/form/Form";
import { Button } from "antd/lib/index";
import Input from "antd/lib/input/Input";
import React from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [form] = Form.useForm();
  const { data: profile } = useProfile();
  const ref = React.useRef(null);
  const { mutate: updateProfile, isPending: isLoadingUpdateProfile } =
    useUpdateProfile({
      onSuccess: () => {
        form.setFieldsValue({
          ...form.getFieldsValue(),
          oldPassword: "",
          password: "",
          confirm: "",
        });
      },
    });

  const arrayFormAccount = React.useMemo(
    () => [
      {
        label: "Tên",
        name: "username",
        rules: [
          {
            required: true,
          },
        ],
        labelAlign: "left",
        className: "",
        component: <Input />,
      },
      {
        label: "Số điện thoại",
        name: "phone",
        rules: [{ len: 10 }],
        labelAlign: "left",
        className: "",
        component: <Input className="rounded-md" disabled />,
      },
      {
        label: "Mật khẩu cũ: ",
        name: "oldPassword",
        labelAlign: "left",
        className: "",
        component: <Input.Password className="rounded-md" />,
      },
      {
        label: "Mật khẩu mới: ",
        name: "password",
        labelAlign: "left",
        className: "",
        component: <Input.Password className="rounded-md" />,
      },
      {
        label: "Xác nhận mật khẩu: ",
        name: "confirm",
        labelAlign: "left",
        className: "",
        component: <Input.Password className="rounded-md" />,
      },
      {
        component: (
          <Button
            type="primary"
            htmlType="submit"
            className="rounded-md hover:bg-blue-500 bg-blue-400"
            loading={isLoadingUpdateProfile}
          >
            Lưu
          </Button>
        ),
      },
    ],
    [isLoadingUpdateProfile]
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

  const onFinish = (data) => {
    if (data.password && data.oldPassword && data.confirm) {
      if (data.password !== data.confirm) {
        toast.error("Mật khẩu chưa trùng khớp");
        return undefined;
      }
    }

    if (!data.username) {
      toast.error("Vui lòng nhập đủ");
      return undefined;
    }
    updateProfile(data);
  };

  const onFormValuesChangeHandler = (changedValues, values) => {
    const [name] = Object.keys(changedValues);
    if (name === "phone" && /[^0-9]/g.test(values[name])) {
      const validValue = values[name].replace(/[^0-9]/g, "");
      form.setFieldValue(name, validValue);
    }
  };

  React.useEffect(() => {
    if (profile && ref?.current?.setFieldsValue) {
      ref.current.setFieldsValue({
        username: profile?.username,
        phone: profile?.phone,
      });
    }
  }, [profile, ref.current?.setFieldsValue]);
  return (
    <UserLayout title={"Thông tin cá nhân"}>
      <div className="p-4 bg-white rounded-md">
        <div className="mt-7 ml-10">
          <Form
            ref={ref}
            form={form}
            name="accountInformation"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              name: profile?.username,
              phone: profile?.phone,
            }}
            onValuesChange={onFormValuesChangeHandler}
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
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
