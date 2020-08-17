import { alerts, notifications } from "./store.js";

/**
 * This const is the default style apply to an alert
 *
 */
export const defautStyleObject = {
  border: "1px solid rgba(129, 129, 129, 0.2);",
  backgroundColor: "white;",
  borderRadius: "15px;",
  boxShadow: "-3px -4px 15px 4px rgba(189,189,189,0.3);",
};
/**
 * This const is the default style apply to a notification
 */
export const defaultNotificationsstyleObject = {
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
 * @param {Integer} timeout - The expiration delay in ms to make the alert disappear
 * @param {boolean} showProgressBar - A boolean who define if you want to show the progressBar Timer
 * @param {String} colorProgressBar - The color you want for progressBar, Default color set in function of the type
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
  alertParameterObject.type = alertParameterObject.type.toLowerCase();
  const type = alertParameterObject.type.toLowerCase();
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
 * Create an alert with the object and add it to the alert-store
 * @param {AlertParameterObject} alertParameterObject - Object who contain all data use for create and customize the alert
 */
export function sendAlertByObject(alertParameterObject) {
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
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the alert disappear, default: 3000
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
  sendAlertByObject(objectParams);
}
/**
 * A shorcut method to create an alert with an optional timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {String} type - The type of message ex: Info, warning, alert, success or empty to a regular message
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the alert disappear, default: 3000
 */
export function sendAlertWithoutStyle(message, type = "", timeout = 3000) {
  sendAlertInfoWithStyle(message, type, defautStyleObject, timeout);
}

/**
 * A shorcut method to create an alert of type Info with an optional style and timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {Object} styleObject - Optional: An object who contain to the maximum 4 value (border, backgroundColor, borderRadius, boxShadow), default: defaultStyleObject const
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the alert disappear, default: 3000
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
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the alert disappear, default: 3000
 */
export function sendAlertInfoWithoutStyle(messsage, timeout = 3000) {
  sendAlertWithoutStyle(messsage, "info", timeout);
}

/**
 * A shorcut method to create an alert of type Alert with an optional style and timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {Object} styleObject - Optional: An object who contain to the maximum 4 value (border, backgroundColor, borderRadius, boxShadow), default: defaultStyleObject const
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the alert disappear, default: 3000
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
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the alert disappear, default: 3000
 */
export function sendAlertAlertWithoutStyle(messsage, timeout = 3000) {
  sendAlertWithoutStyle(messsage, "alert", timeout);
}

/**
 * A shorcut method to create an alert of type Warning with an optional style and timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {Object} styleObject - Optional: An object who contain to the maximum 4 value (border, backgroundColor, borderRadius, boxShadow), default: defaultStyleObject const
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the alert disappear, default: 3000
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
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the alert disappear, default: 3000
 */
export function sendAlertWarningWithoutStyle(messsage, timeout = 3000) {
  sendAlertWithoutStyle(messsage, "warning", timeout);
}

/**
 * A shorcut method to create an alert of type Success with an optional style and timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {Object} styleObject - Optional: An object who contain to the maximum 4 value (border, backgroundColor, borderRadius, boxShadow), default: defaultStyleObject const
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the alert disappear, default: 3000
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
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the alert disappear, default: 3000
 */
export function sendAlertSuccessWithoutStyle(messsage, timeout = 3000) {
  sendAlertWithoutStyle(messsage, "success", timeout);
}

/*--------------------- Notifications ----------------------------- */
/**
 * Constructor to create a notificationParameterObject who contain all the styling attribute to display a notifications
 * @param {String} message - The message you want to display
 * @param {String} type - The type of message ex: Info, warning, alert, success or empty to a regular message
 * @param {Integer} timeout - The expiration delay in ms to make the notification disappear
 * @param {String} crossClose - The type of closing cross the values possible are : default, round, none
 * @param {Object} styleObject - An object who contain to the maximum 4 value (border, backgroundColor, borderRadius, boxShadow)
 * @param {String} srcImage - The link of the image to display, can be empty if you don't want an image
 * @param {String} altImage - The alternative attribute of the image
 * @param {String} svgPath - A full SVG html tag to replace the default SVG display, can be empty if you don't want another SVG or if you give a srcImage
 * @param {String} svgColor - The color of SVG
 * @param {Boolean} showIconSvg - A boolean : true if you want to display the default SVG, false if you don't want it
 * @param {String} bigMessage - The big message to display, can be empty if you don't want to make a big Notifications
 * @param {Boolean} bigMessageIsHtml - A boolean : true if the string path is HTML, false if it isn't
 */
export function NotificationParameterObject(
  message,
  type = "",
  timeout = 3000,
  crossClose = "default",
  styleObject = defaultNotificationsstyleObject,
  srcImage = "",
  altImage = "",
  svgPath = "",
  svgColor = "",
  showIconSvg = true,
  bigMessage = "",
  bigMessageIsHtml = false
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

/**
 * Set the object pass in params to default value in case of undefined value
 * @param {NotificationParameterObject} notificationParameterObject Object who contain all data use for create and customize the notification
 */
function makeNotificationObjectReadyToUse(notificationParameterObject) {
  if (!notificationParameterObject.message)
    notificationParameterObject = "default notification";
  if (!notificationParameterObject.type) notificationParameterObject.type = "";
  notificationParameterObject.type = notificationParameterObject.type.toLowerCase();
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
    notificationParameterObject.svgColor = "";
  if (notificationParameterObject.showIconSvg === undefined)
    notificationParameterObject.showIconSvg = true;
  if (!notificationParameterObject.bigMessage)
    notificationParameterObject.bigMessage = "";
  if (notificationParameterObject.bigMessageIsHtml === undefined)
    notificationParameterObject.bigMessageIsHtml = false;
}

/**
 * Create a notification with the object and add it to the notification-store
 * @param {NotificationParameterObject} notificationParameterObject - Object who contain all data use for create and customize the notification
 */
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

/**
 * A shorcut method to create a notification with an optional style and timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {String} type - The type of message ex: Info, warning, alert, success or empty to a regular message
 * @param {Object} styleObject - Optional: An object who contain to the maximum 4 value (border, backgroundColor, borderRadius, boxShadow), default: defaultNotificationsstyleObject const
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the notification disappear, default: 3000
 */
export function sendNotificationWithStyle(
  message,
  type = "",
  styleObject = defaultNotificationsstyleObject,
  timeout = 3000
) {
  sendNotificationByObject({ message, type, styleObject, timeout });
}
/**
 * A shorcut method to create a notification with an optional timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {String} type - The type of message ex: Info, warning, alert, success or empty to a regular message
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the notification disappear, default: 3000
 */
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

/**
 * A shorcut method to create a notification of no type with an optional style and timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {Object} styleObject - Optional: An object who contain to the maximum 4 value (border, backgroundColor, borderRadius, boxShadow), default: defaultNotificationsstyleObject const
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the notication disappear, default: 3000
 */
export function sendNotificationNotypeWithStyle(
  message,
  styleObject = defaultNotificationsstyleObject,
  timeout = 3000
) {
  sendNotificationWithStyle(message, "", styleObject, timeout);
}
/**
 * A shorcut method to create a notication of no type with an optional timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the notification disappear, default: 3000
 */
export function sendNotificationNotypeWithoutStyle(message, timeout = 3000) {
  sendNotificationWithoutStyle(message, "", timeout);
}

/**
 * A shorcut method to create a notification of type Info with an optional style and timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {Object} styleObject - Optional: An object who contain to the maximum 4 value (border, backgroundColor, borderRadius, boxShadow), default: defaultNotificationsstyleObject const
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the notication disappear, default: 3000
 */
export function sendNotificationInfoWithStyle(
  message,
  styleObject = defaultNotificationsstyleObject,
  timeout = 3000
) {
  sendNotificationWithStyle(message, "info", styleObject, timeout);
}
/**
 * A shorcut method to create a notication of type Info with an optional timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the notification disappear, default: 3000
 */
export function sendNotificationInfoWithoutStyle(message, timeout = 3000) {
  sendNotificationWithoutStyle(message, "info", timeout);
}

/**
 * A shorcut method to create a notification of type Alert with an optional style and timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {Object} styleObject - Optional: An object who contain to the maximum 4 value (border, backgroundColor, borderRadius, boxShadow), default: defaultNotificationsstyleObject const
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the notication disappear, default: 3000
 */
export function sendNotificationAlertWithStyle(
  message,
  styleObject = defaultNotificationsstyleObject,
  timeout = 3000
) {
  sendNotificationWithStyle(message, "alert", styleObject, timeout);
}
/**
 * A shorcut method to create a notication of type Alert with an optional timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the notification disappear, default: 3000
 */
export function sendNotificationAlertWithoutStyle(message, timeout = 3000) {
  sendNotificationWithoutStyle(message, "alert", timeout);
}

/**
 * A shorcut method to create a notification of type Warning with an optional style and timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {Object} styleObject - Optional: An object who contain to the maximum 4 value (border, backgroundColor, borderRadius, boxShadow), default: defaultNotificationsstyleObject const
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the notication disappear, default: 3000
 */
export function sendNotificationWarningWithStyle(
  message,
  styleObject = defaultNotificationsstyleObject,
  timeout = 3000
) {
  sendNotificationWithStyle(message, "warning", styleObject, timeout);
}
/**
 * A shorcut method to create a notication of type Warning with an optional timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the notification disappear, default: 3000
 */
export function sendNotificationWarningWithoutStyle(message, timeout = 3000) {
  sendNotificationWithoutStyle(message, "warning", timeout);
}

/**
 * A shorcut method to create a notification of type Success with an optional style and timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {Object} styleObject - Optional: An object who contain to the maximum 4 value (border, backgroundColor, borderRadius, boxShadow), default: defaultNotificationsstyleObject const
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the notication disappear, default: 3000
 */
export function sendNotificationSuccessWithStyle(
  message,
  styleObject = defaultNotificationsstyleObject,
  timeout = 3000
) {
  sendNotificationWithStyle(message, "success", styleObject, timeout);
}
/**
 * A shorcut method to create a notication of type Success with an optional timeout but with other params as default
 * @param {String} message - The message you want to display
 * @param {Integer} timeout - Optional: The expiration delay in ms to make the notification disappear, default: 3000
 */
export function sendNotificationSuccessWithoutStyle(message, timeout = 3000) {
  sendNotificationWithoutStyle(message, "success", timeout);
}
