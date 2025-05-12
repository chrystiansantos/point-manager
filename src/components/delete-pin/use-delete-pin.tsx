import { useNotificationStore } from "@/store/notification.store";
import { useAreaMarkersStore } from "../../store/useAreaMarkers.store";

interface UseDeletePinProps {
  closeModal: () => void;
}

export function useDeletePin({ closeModal }: UseDeletePinProps) {
  const { areaSelectId, pinSelectId, removePin } = useAreaMarkersStore();
  const { updateNotification } = useNotificationStore();

  function handleDeletePin() {
    if (areaSelectId && pinSelectId) {
      removePin(areaSelectId, pinSelectId);
      closeModal();
      updateNotification({
        open: true,
        callbackFunctionName: "saveAreaAndPins",
        title: "Salvar pontos",
        subtitle: "Para salvar os pontos alterados clique em salvar",
        type: "DEFAULT",
      });
    }
  }

  return {
    handleDeletePin,
  };
}
