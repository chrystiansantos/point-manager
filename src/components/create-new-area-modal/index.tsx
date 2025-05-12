import { MapPinArea } from "@phosphor-icons/react/dist/ssr";
import { Modal } from "../modal";
import { useCreateNewAreaModal } from "./use-create-new-area-modal";

interface CreateAreaModalProps {
  closeModal: () => void;
}

export function CreateNewAreaModal({ closeModal }: CreateAreaModalProps) {
  const { register, handleSubmit, submitForm, errors, isValid } =
    useCreateNewAreaModal({ closeModal });

  return (
    <Modal>
      <Modal.Header onClose={closeModal} />
      <Modal.Title title="Cadastrar nova área?" />
      <form onSubmit={handleSubmit(submitForm)} className="bg-neutral-light-50">
        <Modal.Input
          error={!!errors.name?.message}
          {...register("name")}
        ></Modal.Input>
        <Modal.Footer>
          <Modal.SuccessButton type="submit" disabled={!isValid}>
            <MapPinArea size={16} color="#739e08" weight="fill" />
            Cadastrar
          </Modal.SuccessButton>
          <Modal.CancelButton onClick={closeModal} type="button">
            Cancelar
          </Modal.CancelButton>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
