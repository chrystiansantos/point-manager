import { create } from "zustand";

interface Notification {
  open: boolean;
  type: "DEFAULT" | "ERROR";
  title: string;
  subtitle: string;
  callbackFunctionName: "saveAreaAndPins" | "close";
  alertDurationInSeconds?: number | null;
}

interface NotificationState {
  notification: Notification;
  updateNotification: (notification: Notification) => void;
  close: () => void;
}

export const useNotificationStore = create<NotificationState>()((set) => ({
  notification: {
    open: false,
    type: "DEFAULT",
    title: "",
    subtitle: "",
    callbackFunctionName: "saveAreaAndPins",
    alertDurationInSeconds: null,
  },
  updateNotification: (notification) =>
    set(() => ({
      notification,
    })),
  close: () =>
    set((state) => ({
      notification: {
        ...state.notification,
        open: false,
        alertDurationInSeconds: null,
      },
    })),
}));
