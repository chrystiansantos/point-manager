import { useNotificationStore } from "@/store/notification.store";
import { useAreaMarkersStore } from "@/store/useAreaMarkers.store";
import { useState } from "react";

enum ModalType {
  CreateArea = "CreateArea",
  DeleteArea = "DeleteArea",
  DeletePin = "DeletePin",
  DeleteAllPins = "DeleteAllPins",
}

export function useManagerButtons() {
  const { updateNotification } = useNotificationStore();
  const {
    areas,
    isCreateNewArea,
    createArea,
    createPositionsArea,
    removeLastBorder,
    resetCreateArea,
    areaSelectId,
    pinSelectId,
    cratePin,
  } = useAreaMarkersStore();

  const [showModalType, setShowModalType] = useState<ModalType | null>(null);

  const selectArea = areas.find((area) => area.id === areaSelectId);

  const handleAddNewArea = () => createArea(true);

  const handleRemoveLastBorder = () => {
    if (createPositionsArea.length === 2) {
      return resetCreateArea();
    }
    removeLastBorder();
  };

  const handleSaveNewArea = async () => {
    setShowModalType(ModalType.CreateArea);
  };

  const handleDeleteArea = async () => {
    setShowModalType(ModalType.DeleteArea);
  };

  const handleAddNewPin = () => {
    if (areaSelectId) {
      cratePin(areaSelectId);
      updateNotification({
        open: true,
        callbackFunctionName: "saveAreaAndPins",
        title: "Salvar pontos",
        subtitle: "Para salvar os pontos alterados clique em salvar",
        type: "DEFAULT",
      });
    }
  };

  const handleDeleteAllPins = () => {
    setShowModalType(ModalType.DeleteAllPins);
  };

  const handleDeletePin = () => {
    setShowModalType(ModalType.DeletePin);
  };

  const closeModal = () => {
    setShowModalType(null);
  };

  return {
    pinSelectId,
    handleDeletePin,
    areaSelectId,
    selectArea,
    handleDeleteArea,
    handleAddNewPin,
    isCreateNewArea,
    createPositionsArea,
    handleRemoveLastBorder,
    handleSaveNewArea,
    handleAddNewArea,
    handleDeleteAllPins,
    showModalType,
    ModalType,
    closeModal,
  };
}
