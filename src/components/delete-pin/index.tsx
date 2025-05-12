import { Trash } from "@phosphor-icons/react/dist/ssr";
import { Modal } from "../modal";
import { useDeletePin } from "./use-delete-pin";

interface DeletePinProps {
  closeModal: () => void;
}

export function DeletePin({ closeModal }: DeletePinProps) {
  const { handleDeletePin } = useDeletePin({ closeModal });

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
