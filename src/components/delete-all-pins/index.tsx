import { Trash } from "@phosphor-icons/react/dist/ssr";
import { Modal } from "../modal";
import { useDeleteAllPins } from "./use-deletel-all-pins";

interface DeleteAllPinsProps {
  closeModal: () => void;
}

export function DeleteAllPins({ closeModal }: DeleteAllPinsProps) {
  const { handleDeleteAllPins } = useDeleteAllPins({ closeModal });

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
