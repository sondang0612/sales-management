import FormSteps from "@/src/containers/private/FormSteps";
import authClient from "@/src/utils/authClient";

const Main = () => {
  return <FormSteps />;
};

export default authClient(Main);
