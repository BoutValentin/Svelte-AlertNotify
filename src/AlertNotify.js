import { alerts, notifications } from "./store.js";

/**
 * This const is the default style apply to an alert
 *
 */
const defautStyleObject = {
  border: "1px solid rgba(129, 129, 129, 0.2);",
  backgroundColor: "white;",
  borderRadius: "15px;",
  boxShadow: "-3px -4px 15px 4px rgba(189,189,189,0.3);",
};
/**
 * This const is the default style apply to a notification
 */
const defaultNotificationsstyleObject = {
  border: "1px solid rgba(0, 0, 0, 0.2);",
  backgroundColor: "white;",
  borderRadius: "10px;",
  boxShadow: "-3px -4px 15px 4px rgba(189,189,189,0.3);",
};

/*--------------------------------------------Alert ------------------------------------ */
/**
 * Constructor to create an alertParameterObject with all the attribute for styling the alert
 * @param {String} message - The message you want to display
 * @param {String} type - The type of message ex: Info, warning, alert, success or empty to a regular message
 * @param {Integer} timeout - The expiration delay in ms to make the notification disappear
 * @param {boolean} showProgressBar - A boolean who define if you want to show the progressBar Timer
 * @param {String} colorProgressBar - The color you want for progressBarm, Default color set inn function of the type
 * @param {Object} styleObject - An object who contain to the maximum 4 value (border, backgroundColor, borderRadius, boxShadow)
 */
export function AlertParameterObject(
  message,
  type = "",
  timeout = 3000,
  showProgressBar = true,
  colorProgressBar = type === "success"
    ? "#8ac926"
    : type === "info"
    ? "#f77f00"
    : type === "warning" || type === "alert"
    ? "red"
    : "rgba(129, 129, 129, 0.5)",
  styleObject = defautStyleObject
) {
  this.message = message;
  this.type = type;
  if (timeout < 1000) {
    console.error(
      `You pass a timeout < 1000ms, please pass a value > 1000ms. You passed ${timeout}`
    );
    this.timeout = 3000;
  } else this.timeout = timeout;
  this.showProgressBar = showProgressBar;
  this.colorProgressBar = colorProgressBar;
  this.styleObject = styleObject;
}

/**
 * Set the object pass in params to default value in case of undefined value
 * @param {AlertParameterObject} alertParameterObject Object who contain all data use for create and customize the alert
 */
function makeAlertObjectReadyToUse(alertParameterObject) {
  if (!alertParameterObject.message)
    alertParameterObject.message = "default message here";
  if (!alertParameterObject.type) {
    alertParameterObject.type = "";
  }
  const type = alertParameterObject.type;
  if (!alertParameterObject.timeout || alertParameterObject.timeout < 1000)
    alertParameterObject.timeout = 3000;
  if (alertParameterObject.showProgressBar === undefined)
    alertParameterObject.showProgressBar = true;
  if (!alertParameterObject.colorProgressBar)
    alertParameterObject.colorProgressBar =
      type === "success"
        ? "#8ac926"
        : type === "info"
        ? "#f77f00"
        : type === "warning" || type === "alert"
        ? "red"
        : "rgba(129, 129, 129, 0.5)";

  if (!alertParameterObject.styleObject)
    alertParameterObject.styleObject = defautStyleObject;
}

/**
 * Create a notification and add it to the store
 * @param {AlertParameterObject} alertParameterObject - Object who contain all data use for create and customize the alert
 */
export function sendAlertWithObject(alertParameterObject) {
  makeAlertObjectReadyToUse(alertParameterObject);
  alerts.update((allAlerts) => {
    return {
      key: ++allAlerts.key,
      array: [
        ...allAlerts.array,
        {
          id: allAlerts.key,
          message: alertParameterObject.message,
          type: alertParameterObject.type,
          timeout: alertParameterObject.timeout,
          showProgressBar: alertParameterObject.showProgressBar,
          colorProgressBar: alertParameterObject.colorProgressBar,
          styleObject: alertParameterObject.styleObject,
        },
      ],
    };
  });
}

/**
 * A shorcut method to create an alert with an optional style and timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {String} type - The type of message ex: Info, warning, alert, success or empty to a regular message
 * @param {Object} styleObject - Optional: An object who contain to the maximum 4 value (border, backgroundColor, borderRadius, boxShadow), default: defaultStyleObject const
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the notification disappear, default: 3000
 */
export function sendAlertWithStyle(
  message,
  type = "",
  styleObject = defautStyleObject,
  timeout = 3000
) {
  let objectParams = {
    message: message,
    type: type,
    timeout: timeout,
    styleObject: styleObject,
  };
  sendAlertWithObject(objectParams);
}
/**
 * A shorcut method to create an alert with an optional timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {String} type - The type of message ex: Info, warning, alert, success or empty to a regular message
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the notification disappear, default: 3000
 */
export function sendAlertWithoutStyle(message, type = "", timeout = 3000) {
  sendAlertInfoWithStyle(message, type, defautStyleObject, timeout);
}

/**
 * A shorcut method to create an alert of type Info with an optional style and timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {Object} styleObject - Optional: An object who contain to the maximum 4 value (border, backgroundColor, borderRadius, boxShadow), default: defaultStyleObject const
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the notification disappear, default: 3000
 */
export function sendAlertInfoWithStyle(
  message,
  styleObject = defautStyleObject,
  timeout = 3000
) {
  sendAlertWithStyle(message, "info", styleObject, timeout);
}
/**
 * A shorcut method to create an alert of type Info with an optional timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the notification disappear, default: 3000
 */
export function sendAlertInfo(messsage, timeout = 3000) {
  sendAlertWithoutStyle(messsage, "info", timeout);
}

/**
 * A shorcut method to create an alert of type Alert with an optional style and timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {Object} styleObject - Optional: An object who contain to the maximum 4 value (border, backgroundColor, borderRadius, boxShadow), default: defaultStyleObject const
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the notification disappear, default: 3000
 */
export function sendAlertAlertWithStyle(
  message,
  styleObject = defautStyleObject,
  timeout = 3000
) {
  sendAlertWithStyle(message, "alert", styleObject, timeout);
}
/**
 * A shorcut method to create an alert of type Alert with an optional timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the notification disappear, default: 3000
 */
export function sendAlertAlert(messsage, timeout = 3000) {
  sendAlertWithoutStyle(messsage, "alert", timeout);
}

/**
 * A shorcut method to create an alert of type Warning with an optional style and timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {Object} styleObject - Optional: An object who contain to the maximum 4 value (border, backgroundColor, borderRadius, boxShadow), default: defaultStyleObject const
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the notification disappear, default: 3000
 */
export function sendAlertWarningWithStyle(
  message,
  styleObject = defautStyleObject,
  timeout = 3000
) {
  sendAlertWithStyle(message, "warning", styleObject, timeout);
}
/**
 * A shorcut method to create an alert of type Warning with an optional timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the notification disappear, default: 3000
 */
export function sendAlertWarning(messsage, timeout = 3000) {
  sendAlertWithoutStyle(messsage, "warning", timeout);
}

/**
 * A shorcut method to create an alert of type Success with an optional style and timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {Object} styleObject - Optional: An object who contain to the maximum 4 value (border, backgroundColor, borderRadius, boxShadow), default: defaultStyleObject const
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the notification disappear, default: 3000
 */
export function sendAlertSuccessWithStyle(
  message,
  styleObject = defautStyleObject,
  timeout = 3000
) {
  sendAlertWithStyle(message, "success", styleObject, timeout);
}

/**
 * A shorcut method to create an alert of type Success with an optional timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the notification disappear, default: 3000
 */
export function sendAlertSuccess(messsage, timeout = 3000) {
  sendAlertWithoutStyle(messsage, "success", timeout);
}

/*--------------------- Notifications ----------------------------- */

export function sendNotificationWithStyle(
  message,
  type = "",
  styleObject = defaultNotificationsstyleObject,
  timeout = 3000
) {
  sendNotificationByObject({ message, type, styleObject, timeout });
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

export function NotificationParameterObject(
  message,
  type,
  timeout,
  crossClose,
  styleObject,
  srcImage,
  altImage,
  svgPath,
  svgColor,
  showIconSvg,
  bigMessage,
  bigMessageIsHtml
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
    console.info(
      "No alternative attribute passed. Alt set for alternative-image"
    );
    this.altImage = "alternative-image";
  } else this.altImage = altImage;
  this.svgPath = svgPath;
  this.svgColor = svgColor;
  if (srcImage && svgPath) {
    console.info(
      `Warning : you give a src to display a img and also a svg. Svg will be ignore for the image to avoid this give only svg or src path`
    );
  }
  this.showIconSvg = showIconSvg;
  this.bigMessage = bigMessage;
  this.bigMessageIsHtml = bigMessageIsHtml;
}
function makeNotificationObjectReadyToUse(notificationParameterObject) {
  if (!notificationParameterObject.message)
    notificationParameterObject = "default notification";
  if (!notificationParameterObject.type) notificationParameterObject.type = "";
  if (!notificationParameterObject.timeout)
    notificationParameterObject.timeout = 3000;
  if (!notificationParameterObject.crossClose)
    notificationParameterObject.crossClose = "default";
  if (!notificationParameterObject.styleObject)
    notificationParameterObject.styleObject = defaultNotificationsstyleObject;
  if (!notificationParameterObject.srcImage)
    notificationParameterObject.srcImage = "";
  if (!notificationParameterObject.altImage)
    notificationParameterObject.altImage = "alternative image";
  if (!notificationParameterObject.svgPath)
    notificationParameterObject.svgPath = "";
  if (!notificationParameterObject.svgColor)
    notificationParameterObject.svgColor = "black";
  if (notificationParameterObject.showIconSvg === undefined)
    notificationParameterObject.showIconSvg = true;
  if (!notificationParameterObject.bigMessage)
    notificationParameterObject.bigMessage = "";
  if (notificationParameterObject.bigMessageIsHtml === undefined)
    notificationParameterObject.bigMessageIsHtml = false;
}
export function sendNotificationByObject(notificationsParameterObject) {
  makeNotificationObjectReadyToUse(notificationsParameterObject);
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
          svgPath: notificationsParameterObject.svgPath,
          svgColor: notificationsParameterObject.svgColor,
          showIconSvg: notificationsParameterObject.showIconSvg,
          bigMessage: notificationsParameterObject.bigMessage,
          bigMessageIsHtml: notificationsParameterObject.bigMessageIsHtml,
        },
      ],
    };
  });
}
