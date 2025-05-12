/* eslint-disable prettier/prettier */
import {
  Backspace,
  FloppyDiskBack,
  MapPin,
  MapPinArea,
  TrashSimple,
} from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";
import { Button } from "../button";
import { CreateNewAreaModal } from "../create-new-area-modal";
import { DeleteAllPins } from "../delete-all-pins";
import { DeleteArea } from "../delete-area";
import { DeletePin } from "../delete-pin";
import { useManagerButtons } from "./use-manager-buttons";

export function ManagerButtons() {
  const {
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
    ModalType,
    showModalType,
    closeModal,
  } = useManagerButtons();

  return (
    <div className="absolute right-0 bottom-0">
      <div className="relative right-6 bottom-6 flex h-[112px] w-[164px] flex-col gap-2">
        <Button
          variant="primary"
          className={twMerge(
            "absolute top-20 opacity-0",
            pinSelectId && "top-0 opacity-100",
          )}
          onClick={handleDeletePin}
        >
          Deletar pin <TrashSimple size={20} weight="bold" />
        </Button>

        <Button
          variant="primary"
          className={twMerge(
            "absolute top-20 opacity-0",
            areaSelectId && !pinSelectId && "top-0 opacity-100",
            areaSelectId &&
            !pinSelectId &&
            !selectArea?.pins.length &&
            "top-10 opacity-100",
          )}
          onClick={handleDeleteArea}
        >
          Deletar perímetro <TrashSimple size={20} weight="bold" />
        </Button>

        <Button
          variant="secondary"
          className={twMerge(
            "absolute top-20 z-20 opacity-0",
            areaSelectId && "opacity-100",
            areaSelectId && selectArea?.pins.length && "top-10 opacity-100",
          )}
          onClick={handleAddNewPin}
        >
          Adicionar Novo
          <MapPin color="#556476" fill="#556476" weight="fill" size={20} />
        </Button>

        <Button
          variant="primary"
          className={twMerge(
            "absolute top-20 opacity-0",
            isCreateNewArea &&
            createPositionsArea?.length > 1 &&
            "top-10 opacity-100",
          )}
          onClick={handleRemoveLastBorder}
        >
          Desfazer
          <Backspace size={20} weight="bold" />
        </Button>

        <Button
          variant="secondary"
          className={twMerge(
            "absolute top-20 z-0 opacity-0",
            isCreateNewArea &&
            createPositionsArea.length > 1 &&
            "z-20 opacity-100",
          )}
          onClick={handleSaveNewArea}
        >
          Salvar
          <FloppyDiskBack size={20} weight="fill" />
        </Button>
        <Button
          variant="secondary"
          className={twMerge(
            "absolute top-20 z-20",
            ((isCreateNewArea && createPositionsArea.length > 1) ||
              areaSelectId) &&
            "z-0 opacity-0",
          )}
          onClick={handleAddNewArea}
        >
          Add Perímetro
          <MapPinArea size={20} weight="fill" />
        </Button>

        <Button
          variant="primary"
          className={twMerge(
            "absolute top-30 opacity-0",
            areaSelectId &&
            selectArea?.pins.length &&
            "top-20 z-20 opacity-100",
          )}
          onClick={handleDeleteAllPins}
        >
          Deletar todos <TrashSimple size={20} weight="bold" />
        </Button>
      </div>
      {showModalType === ModalType.CreateArea && (
        <CreateNewAreaModal closeModal={closeModal} />
      )}
      {showModalType === ModalType.DeleteArea && (
        <DeleteArea closeModal={closeModal} />
      )}
      {showModalType === ModalType.DeletePin && (
        <DeletePin closeModal={closeModal} />
      )}
      {showModalType === ModalType.DeleteAllPins && (
        <DeleteAllPins closeModal={closeModal} />
      )}
    </div>
  );
}
