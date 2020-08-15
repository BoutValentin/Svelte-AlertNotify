import { alerts, notifications } from "./store.js";
const defautStyleObject = {
  border: "1px solid rgba(129, 129, 129, 0.2);",
  backgroundColor: "white;",
  borderRadius: "15px;",
  boxShadow: "-3px -4px 15px 4px rgba(189,189,189,0.3);",
};
const defaultNotificationsstyleObject = {
  border: "1px solid rgba(0, 0, 0, 0.2);",
  backgroundColor: "white;",
  borderRadius: "10px;",
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
        {
          id: allAlerts.key,
          message,
          type,
          styleObject,
          timeout,
        },
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

export function sendNotificationWithStyle(
  message,
  type = "",
  styleObject = defaultNotificationsstyleObject,
  timeout = 3000
) {
  notifications.update((allNotifications) => {
    return {
      key: ++allNotifications.key,
      array: [
        ...allNotifications.array,
        { id: allNotifications.key, message, type, styleObject, timeout },
      ],
    };
  });
}

export function sendNotificationWithoutStyle(
  message,
  type = "",
  timeout = 3000
) {
  sendNotificationWithStyle(
    message,
    type,
    defaultNotificationsstyleObject,
    timeout
  );
}

export function sendNotificationUnamedWithStyle(
  message,
  styleObject = defaultNotificationsstyleObject,
  timeout = 3000
) {
  sendNotificationWithStyle(message, "", styleObject, timeout);
}
export function sendNotificationUnamedWithoutStyle(message, timeout = 3000) {
  sendNotificationWithoutStyle(message, "", timeout);
}

export function sendNotificationInfoWithStyle(
  message,
  styleObject = defaultNotificationsstyleObject,
  timeout = 3000
) {
  sendNotificationWithStyle(message, "info", styleObject, timeout);
}
export function sendNotificationInfoWithoutStyle(message, timeout = 3000) {
  sendNotificationWithoutStyle(message, "info", timeout);
}

export function sendNotificationAlertWithStyle(
  message,
  styleObject = defaultNotificationsstyleObject,
  timeout = 3000
) {
  sendNotificationWithStyle(message, "alert", styleObject, timeout);
}
export function sendNotificationAlertWithoutStyle(message, timeout = 3000) {
  sendNotificationWithoutStyle(message, "alert", timeout);
}

export function sendNotificationWarningWithStyle(
  message,
  styleObject = defaultNotificationsstyleObject,
  timeout = 3000
) {
  sendNotificationWithStyle(message, "warning", styleObject, timeout);
}
export function sendNotificationWarningWithoutStyle(message, timeout = 3000) {
  sendNotificationWithoutStyle(message, "warning", timeout);
}

export function sendNotificationSuccessWithStyle(
  message,
  styleObject = defaultNotificationsstyleObject,
  timeout = 3000
) {
  sendNotificationWithStyle(message, "success", styleObject, timeout);
}
export function sendNotificationSuccessWithoutStyle(message, timeout = 3000) {
  sendNotificationWithoutStyle(message, "success", timeout);
}
//Todo : method for sending with images and method for choosing style of cross
/* 
     export let srcImage = 'https://www.w3schools.com/css/img_forest.jpg';
     export let srcAlt = 'alternative';
     export let message = "a message in notifications"
     export let type = '';
     export let timeout = 3000;
     export let key
     export let crossClose = "default"
     export let onBotton = false
     export let styleObject = {
          border: "1px solid rgba(0, 0, 0, 0.2);",
          backgroundColor: "white;",
          borderRadius: "10px;",
          boxShadow: "-3px -4px 15px 4px rgba(189,189,189,0.3);"
     }
     export let showProgressBar = true
     export let showProgressBarTop = true
     export let colorProgressBar = type==="success" ? "#8ac926" : type==="info" ? "#f77f00" : type==="warning"||type==="alert" ? "red" : "rgba(129, 129, 129, 0.5)"
     l
*/

export function NotificationParameterObject(
  message,
  type,
  timeout,
  crossClose,
  styleObject,
  srcImage,
  altImage
) {
  this.message = message;
  this.type = type;
  if (timeout < 1000) {
    console.error("Timeout must be more than 1000ms, and you passed" + timeout);
    this.timeout = 3000;
  } else this.timeout = timeout;
  if (
    crossClose !== "none" &&
    crossClose !== "default" &&
    crossClose !== "round"
  ) {
    console.error(
      `crossClose must have as a value : none or default or round. You passed ${crossClose}`
    );
    this.crossClose = "default";
  } else this.crossClose = crossClose;
  this.styleObject = styleObject;
  this.srcImage = srcImage;
  if (srcImage && !altImage) {
    console.log(
      "No alternative attribute passed. Alt set for alternative-image"
    );
    this.altImage = "alternative-image";
  } else this.altImage = altImage;
}
export function sendNotificationByObject(notificationsParameterObject) {
  notifications.update((allNotifications) => {
    return {
      key: ++allNotifications.key,
      array: [
        ...allNotifications.array,
        {
          id: allNotifications.key,
          message: notificationsParameterObject.message,
          type: notificationsParameterObject.type,
          styleObject: notificationsParameterObject.styleObject,
          timeout: notificationsParameterObject.timeout,
          crossClose: notificationsParameterObject.crossClose,
          srcImage: notificationsParameterObject.srcImage,
          altImage: notificationsParameterObject.altImage,
        },
      ],
    };
  });
}
