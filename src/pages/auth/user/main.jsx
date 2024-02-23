import FormSteps from "@/src/containers/private/FormSteps";
import authClient from "@/src/utils/authClient";

const Main = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <FormSteps />
    </div>
  );
};

export default authClient(Main);
