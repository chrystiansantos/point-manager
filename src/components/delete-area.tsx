import { deleteArea } from "@/services";
import { Trash } from "@phosphor-icons/react/dist/ssr";
import { useAreaMarkersStore } from "../store/useAreaMarkers.store";
import { Modal } from "./modal";

interface DeleteAreaProps {
  closeModal: () => void;
}

export function DeleteArea({ closeModal }: DeleteAreaProps) {
  const { areaSelectId, selectAreaAndPinId, fetchAreas } =
    useAreaMarkersStore();
  const handleDeleteArea = async () => {
    if (areaSelectId) {
      await deleteArea(areaSelectId);
      selectAreaAndPinId(null);
      fetchAreas();
      closeModal();
    }
  };

  return (
    <Modal>
      <Modal.Header onClose={closeModal} />
      <Modal.Title title="Excluir área selecionada?" />
      <Modal.Warning
        title="Atenção!"
        subtitle="Essa ação não poderá ser desfeita."
      />
      <Modal.Footer>
        <Modal.WarningButton onClick={handleDeleteArea}>
          <Trash size={16} color="#f00000" weight="fill" />
          Excluir
        </Modal.WarningButton>
        <Modal.CancelButton onClick={closeModal}>Cancelar</Modal.CancelButton>
      </Modal.Footer>
    </Modal>
  );
}
