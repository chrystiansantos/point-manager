import { useNotificationStore } from "@/store/notification.store";
import { Trash } from "@phosphor-icons/react/dist/ssr";
import { useAreaMarkersStore } from "../store/useAreaMarkers.store";
import { Modal } from "./modal";

interface DeleteAllPinsProps {
  closeModal: () => void;
}

export function DeleteAllPins({ closeModal }: DeleteAllPinsProps) {
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

  return (
    <Modal>
      <Modal.Header onClose={closeModal} />
      <Modal.Title title="Excluir todos os pontos?" />
      <Modal.Warning
        title="Atenção!"
        subtitle="Essa ação não poderá ser desfeita."
      />
      <Modal.Footer>
        <Modal.WarningButton onClick={handleDeleteAllPins}>
          <Trash size={16} color="#f00000" weight="fill" />
          Excluir
        </Modal.WarningButton>
        <Modal.CancelButton onClick={closeModal}>Cancelar</Modal.CancelButton>
      </Modal.Footer>
    </Modal>
  );
}
