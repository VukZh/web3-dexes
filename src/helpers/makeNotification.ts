import {notifications} from "@mantine/notifications";

export const makeNotification = (msg: string) => {
  notifications.show({
    title: "Error",
    message: msg,
    autoClose: 5000,
    style: {position: "fixed", bottom: "50px", right: "10px", maxWidth: "600px"},
    color: "red",
  });
};