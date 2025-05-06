import { useNotificationStore } from "@/store/notification.store";
import { Trash } from "@phosphor-icons/react/dist/ssr";
import { useAreaMarkersStore } from "../store/useAreaMarkers.store";
import { Modal } from "./modal";

interface DeletePinProps {
  closeModal: () => void;
}

export function DeletePin({ closeModal }: DeletePinProps) {
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

  return (
    <Modal>
      <Modal.Header onClose={closeModal} />
      <Modal.Title title="Excluir ponto selecionado?" />
      <Modal.Warning
        title="Atenção!"
        subtitle="Essa ação não poderá ser desfeita."
      />
      <Modal.Footer>
        <Modal.WarningButton onClick={handleDeletePin}>
          <Trash size={16} color="#f00000" weight="fill" />
          Excluir
        </Modal.WarningButton>
        <Modal.CancelButton onClick={closeModal}>Cancelar</Modal.CancelButton>
      </Modal.Footer>
    </Modal>
  );
}
