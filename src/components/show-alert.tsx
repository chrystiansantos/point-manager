import { updatePins } from "@/services/update-pins";
import { useNotificationStore } from "@/store/notification.store";
import { useAreaMarkersStore } from "@/store/useAreaMarkers.store";
import { useEffect } from "react";
import { Toast } from "./toast";

export function ShowAlert() {
  const { areas, fetchAreas } = useAreaMarkersStore();
  const { notification, close } = useNotificationStore();

  const handleSaveAreaAndPins = async () => {
    await updatePins(areas);
    await fetchAreas();
    close();
  };

  const closeModal = () => {
    close();
  };

  useEffect(() => {
    if (notification.alertDurationInSeconds && notification.open) {
      const millisecondsUnit = 1000;
      const seconds = notification.alertDurationInSeconds * millisecondsUnit;
      setTimeout(() => {
        close();
      }, seconds);
    }
  }, [notification.open, notification.alertDurationInSeconds, close]);

  const callbackFunctions = {
    close: {
      action: closeModal,
      buttonName: "Fechar",
    },
    saveAreaAndPins: {
      action: handleSaveAreaAndPins,
      buttonName: "Salvar",
    },
  };

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
