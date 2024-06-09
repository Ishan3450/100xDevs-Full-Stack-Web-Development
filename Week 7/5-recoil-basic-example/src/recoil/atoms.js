import { atom, selector } from "recoil";

export const networkAtom = atom({
  key: "networkAtom",
  default: 102,
});

export const jobsAtom = atom({
  key: "jobsAtom",
  default: 4,
});

export const messagingAtom = atom({
  key: "messagingAtom",
  default: 105,
});

export const notificationsAtom = atom({
  key: "notificationsAtom",
  default: 79,
});

export const allNotificationsCount = selector({
    key: "allNotificationsCount",
    get: ({get}) => {
        const networkNotifications = get(networkAtom); // atoms passed in the get() method acts as a dependency
        const jobsNotification = get(jobsAtom);
        const messagesNotification = get(notificationsAtom);
        const notifications = get(notificationsAtom);

        return networkNotifications + jobsNotification + messagesNotification + notifications;
    }
});