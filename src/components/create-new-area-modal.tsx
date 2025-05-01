import { createArea } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPinArea } from "@phosphor-icons/react/dist/ssr";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAreaMarkersStore } from "../store/useAreaMarkers.store";
import { Modal } from "./modal";

const createAreaSchema = z.object({
  name: z.string().min(3, { message: "Nome obrigatório" }),
});

type CreateArea = z.infer<typeof createAreaSchema>;

interface CreateAreaModalProps {
  closeModal: () => void;
}

export function CreateNewAreaModal({ closeModal }: CreateAreaModalProps) {
  const { createPositionsArea, resetCreateArea, fetchAreas } =
    useAreaMarkersStore();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<CreateArea>({
    resolver: zodResolver(createAreaSchema),
    mode: "onChange",
  });

  const submitForm = async ({ name }: CreateArea) => {
    await createArea({
      id: new Date().getTime().toString(),
      position: createPositionsArea,
      name,
      pins: [],
    });

    resetCreateArea();
    fetchAreas();
    closeModal();
  };

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
