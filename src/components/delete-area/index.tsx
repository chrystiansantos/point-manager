import { Trash } from "@phosphor-icons/react/dist/ssr";
import { Modal } from "../modal";
import { useDeleteArea } from "./use-delete-area";

interface DeleteAreaProps {
  closeModal: () => void;
}

export function DeleteArea({ closeModal }: DeleteAreaProps) {
  const { handleDeleteArea } = useDeleteArea({ closeModal });
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
