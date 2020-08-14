import { alerts } from "./store.js";

const defautPositionnig = "bottom";
const defautStyleObject = {
  border: "1px solid rgba(129, 129, 129, 0.2);",
  backgroundColor: "white;",
  borderRadius: "15px;",
  boxShadow: "-3px -4px 15px 4px rgba(189,189,189,0.3);",
};

export function sendAlertWithStyle(
  message,
  type = "",
  styleObject = defautStyleObject,
  timeout = 3000
) {
  alerts.update((allAlerts) => {
    console.log(allAlerts);
    return {
      key: ++allAlerts.key,
      array: [
        ...allAlerts.array,
        { id: allAlerts.key, message, type, styleObject, timeout },
      ],
    };
  });
}
export function sendAlertWithoutStyle(message, type = "", timeout = 3000) {
  sendAlertInfoWithStyle(message, type, defautStyleObject, timeout);
}
export function sendAlertInfoWithStyle(
  message,
  styleObject = defautStyleObject,
  timeout = 3000
) {
  sendAlertWithStyle(message, "info", styleObject, timeout);
}
export function sendAlertInfo(messsage, timeout = 3000) {
  sendAlertWithoutStyle(messsage, "info", timeout);
}
export function sendAlertAlertWithStyle(
  message,
  styleObject = defautStyleObject,
  timeout = 3000
) {
  sendAlertWithStyle(message, "alert", styleObject, timeout);
}
export function sendAlertAlert(messsage, timeout = 3000) {
  sendAlertWithoutStyle(messsage, "alert", timeout);
}
export function sendAlertWarmingWithStyle(
  message,
  styleObject = defautStyleObject,
  timeout = 3000
) {
  sendAlertWithStyle(message, "warning", styleObject, timeout);
}
export function sendAlertWarming(messsage, timeout = 3000) {
  sendAlertWithoutStyle(messsage, "warning", timeout);
}
export function sendAlertSuccessWithStyle(
  message,
  styleObject = defautStyleObject,
  timeout = 3000
) {
  sendAlertWithStyle(message, "success", styleObject, timeout);
}
export function sendAlertSuccess(messsage, timeout = 3000) {
  sendAlertWithoutStyle(messsage, "success", timeout);
}
