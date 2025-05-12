import { createArea } from "@/services";
import { useNotificationStore } from "@/store/notification.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAreaMarkersStore } from "../../store/useAreaMarkers.store";

const createAreaSchema = z.object({
  name: z.string().min(3, { message: "Nome obrigatório" }),
});

type CreateArea = z.infer<typeof createAreaSchema>;

interface UseCreateAreaModalProps {
  closeModal: () => void;
}
export function useCreateNewAreaModal({ closeModal }: UseCreateAreaModalProps) {
  const { createPositionsArea, resetCreateArea, fetchAreas } =
    useAreaMarkersStore();
  const { close } = useNotificationStore();
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
    close();
  };

  return {
    register,
    handleSubmit,
    submitForm,
    errors,
    isValid,
  };
}
