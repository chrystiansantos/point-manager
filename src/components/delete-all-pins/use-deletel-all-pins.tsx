import { useNotificationStore } from "@/store/notification.store";
import { useAreaMarkersStore } from "@/store/useAreaMarkers.store";

interface UseDeleteAllPinsProps {
  closeModal: () => void;
}

export function useDeleteAllPins({ closeModal }: UseDeleteAllPinsProps) {
  const { areaSelectId, removeAllPins } = useAreaMarkersStore();
  const { updateNotification } = useNotificationStore();

  const handleDeleteAllPins = () => {
    if (areaSelectId) {
      removeAllPins(areaSelectId);
      closeModal();
      updateNotification({
        open: true,
        callbackFunctionName: "saveAreaAndPins",
        title: "Salvar pontos",
        subtitle: "Para salvar os pontos alterados clique em salvar",
        type: "DEFAULT",
      });
    }
  };

  return {
    handleDeleteAllPins,
  };
}
