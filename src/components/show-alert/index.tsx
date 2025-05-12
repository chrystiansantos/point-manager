import { Toast } from "../toast";
import { useShowAlert } from "./use-show-alert";

export function ShowAlert() {
  const { notification, callbackFunctions } = useShowAlert();
  return (
    <Toast.Root open={notification.open} type={notification.type}>
      <Toast.WrapperInfo>
        <Toast.Title>{notification.title}</Toast.Title>
        <Toast.SubTitle>{notification.subtitle}</Toast.SubTitle>
      </Toast.WrapperInfo>
      <Toast.Button
        onClick={callbackFunctions[notification.callbackFunctionName].action}
      >
        {callbackFunctions[notification.callbackFunctionName].buttonName}
      </Toast.Button>
    </Toast.Root>
  );
}
