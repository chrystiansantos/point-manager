import { deleteArea } from "@/services";
import { useNotificationStore } from "@/store/notification.store";
import { useAreaMarkersStore } from "@/store/useAreaMarkers.store";

interface UseDeleteAreaProps {
  closeModal: () => void;
}

export function useDeleteArea({ closeModal }: UseDeleteAreaProps) {
  const { areaSelectId, selectAreaAndPinId, fetchAreas } =
    useAreaMarkersStore();
  const { close } = useNotificationStore();

  const handleDeleteArea = async () => {
    if (areaSelectId) {
      await deleteArea(areaSelectId);
      selectAreaAndPinId(null);
      fetchAreas();
      closeModal();
      close();
    }
  };

  return {
    handleDeleteArea,
  };
}
