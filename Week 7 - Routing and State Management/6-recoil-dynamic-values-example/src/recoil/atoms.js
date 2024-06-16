import { atom, selector } from "recoil";

export const allNotificationsAtom = atom({
  key: "allNotificationsAtom",
  default: selector({
    key: "notificationsGetter",
    get: async () => {
      const response = await fetch("https://sum-server.100xdevs.com/notifications");
      const parsedData = await response.json();
      return parsedData;
    },
  }),
});

export const allNotificationsCountSelector = selector({
  key: "allNotificationsCountSelector",
  get: ({ get }) => {
    const allNotifications = get(allNotificationsAtom);
    return (
      allNotifications.network +
      allNotifications.jobs +
      allNotifications.messaging +
      allNotifications.notifications
    );
  },
});
