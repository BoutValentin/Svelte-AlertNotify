# Svelte-AlertNotify
![SvelteLogo](https://github.com/BoutValentin/Svelte-AlertNotify/blob/assets/assets/SvelteAlertNotifyLogo.svg?raw=true)

Svelte-AlertNotify is a svelte component made to display cool alerts or notifications

  - Creation of alert or notification is really simple with the bunch of method provided
  - A lite weight component with SVG as default images for notifications
  - Stylisable at will with all the parameter you can pass and the choice of localisation in webpages of the notifications or the alerts
  - Use of the svelte store to maintain data
  - Bunch of default alert and notification ready to use with a cool design.

# New Features!

  - You can now 'kill' the notifications or alerts with a swipe on left or right
  - Big notifications now have an animation between rendering for a smooth transition
  - You can now add your own SVG icon to the notifications instead of an images


You can also:
  - Deactivated the possibility of closing notifications manually
  - Deactivated the progress timebar on alerts
  - Choose the style of the crossclose to a round style or default style

Version 1.0.2 : 
 - Reducing package size with reconfiguration of method
Version 1.0.3 :
 - A clear all notifications button add to the notifications container 
# Demo

See a demo of this components here : (avaible soon)

# Installation
```sh
npm i svelte-alertnotify
```
Importation in your svelte project
```html
<script>
    	import {AlertNotify, senderAlerterNotifier}  from "svelte-alertnotify"
    	
    	function addAlert(event){
    	    senderAlerterNotifier.sendAlertWithoutStyle("A message", "success", 4000)
    	}
    	function addNotification(event){
    	    senderAlerterNotifier.sendNotificationWithoutStyle("A notification message", "warning", 2000)
    	}
</script>
<AlertNotify positioningAlerting={"bottomLeft"} positioningNotifications={"topRight"}/>
	<div>
		<button on:click="{addAlert}">
			add an Alert
		</button>
		<button on:click="{addNotification}">
			Add a Notification
		</button>
	</div>
```
# Utilisation
## Props to the AlertNotify component

The AlertNotify component take two props :

 **PositioningAlerting** : this props can take this value defining the position of alerts:
  - **bottom** : the default value
  - **top**
  - **topLeft**
  - **topRight**
  - **bottomLeft**
  - **bottomRight**
  - Any **other value** is set to the **default**

 **PositioningNotifications** : this props can take this value defining the position of notifications:
  - **topLeft**
  - **topRight** : the default value
  - **bottomLeft**
  - **bottomRight**
  - Any **other value** is set to the **default** 

 **showFastCleanNotifications** : this props can take this value defining if you want to show the clear all notification:
  - **true** 
  - **false**
 
## StyleObject

To customize your alerts and notifications, you must use a styleObject. No constructor is provided because it is simply an object containing up to four attributes:
 - **border:** the style of the border
 - **backgroundColor:** the color of the background you want
 - **border-radius:** the radius border you want
 - **boxShadow:** the shadow box you want to apply

The default value are : 
```javascript 
/**
 * This const is the default style apply to an alert
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
```
You can use this object the same way you use other method because they are exported

## Alert

The most complete way to create an alert and fully customize it is to create an AlertParameterObject object using the defined constructor, and then use this object as a parameter of the sendAlertByObject method

 ***Exemple*** : 
```javascript
    import {AlertNotify, senderAlerterNotifier}  from "@boutvalentin/Svelte-AlertNotify"
    const alertObject = new senderAlerterNotifier.AlertParameterObject("an alert", "info", 3000, true, "#f77f00", senderAlerterNotifier.defaultStyleObject)
    senderAlerterNotifier.senderAlertByObject(alertObject)
```

***Brief presentation of the AlertParameterObject constructor :***
*Signature of the function :* 
```javascript 
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
)
```
*Explanation of the parameter extract from documentation :*
 > Constructor to create an **alertParameterObject** with all the attribute for styling the alert
 > @param {String} **message** - The message you want to display
 > @param {String} **type** - The type of message ex: Info, warning, alert, success or empty to a regular message
 > @param {Integer} **timeout** - The expiration delay in ms to make the alert disappear
 > @param {boolean} **showProgressBar** - A boolean who define if you want to show the progressBar Timer
 > @param {String} **colorProgressBar** - The color you want for progressBar, Default color set in function of the type
 > @param {Object} **styleObject** - An object who contain to the maximum 4 value (border, backgroundColor, borderRadius, boxShadow)
 

 #### Shortened methods
 Actually shortened methods exist to simplify processing, replacing unrequested values with default ones.
 Each method is named with this convention:
 **send(Alert|Notification)(*type*|'')(WithStyle|WithoutStyle)**
 > An exemple to understand :
 > I want to send an alert of warning type without style I can use :
 > **sendAlertWarningWithoutStyle(message, [timeout = 3000])**
 
Here is the list of available methods for the alert:
```javascript
/* Send an alert of type of your choice*/
sendAlertWithStyle(message,[type = "",styleObject = defautStyleObject,timeout = 3000])
sendAlertWithoutStyle(message, [type = "", timeout = 3000])

/* Send an alert of type Info*/
sendAlertInfoWithStyle(message, [styleObject = defautStyleObject,timeout = 3000]) 
sendAlertInfoWithoutStyle(messsage, [timeout = 3000])

/* Send an alert of type Alert*/
sendAlertAlerWithStyle(message, [styleObject = defautStyleObject,timeout = 3000]) 
sendAlertAlertWithoutStyle(messsage, [timeout = 3000])

/* Send an alert of type Warning*/
sendAlertWarningWithStyle(message, [styleObject = defautStyleObject,timeout = 3000]) 
sendAlertWarningWithoutStyle(messsage, [timeout = 3000])

/* Send an alert of type Success*/
sendAlertSuccessWithStyle(message, [styleObject = defautStyleObject,timeout = 3000]) 
sendAlertSuccessWithoutStyle(messsage, [timeout = 3000])
```

One more detail : You can kill the alert by swipping to the right or to the left. 

## Notification

The most complete way to create a notification and fully customize it is to create an AlertParameterObject object using the defined constructor, and then use this object as a parameter of the sendNotificationByObject method.
By using this method and object you can create what I call a bigNotifications wich is a notifications with an hidden text display when you click on the "more arrow". This hidden text can be full html but you have to precise it by passing the boolean bigMessageIsHtml to true.
You can also passed the link and alt attribute of an image or use a svg as a replacement of the default one and set the color of this svg.

***Exemple :***
```javascript
	const svgP = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 19C2 20.6569 3.34315 22 5 22H19C20.6569 22 22 20.6569 22 19V5C22 3.34315 20.6569 2 19 2H5C3.34315 2 2 3.34315 2 5V19ZM20 19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5C4 4.44772 4.44772 4 5 4H10V12.0111L12.395 12.0112L14.0001 9.86419L15.6051 12.0112H18.0001L18 4H19C19.5523 4 20 4.44772 20 5V19ZM16 4H12V9.33585L14.0001 6.66046L16 9.33571V4Z" fill="currentColor" /></svg>`;
	
	const notifObject = new senderAlerterNotifier.NotificationParameterObject("Message numero "+count, type,timeout,"default",defautStyleObject,'','',svgP,"red",false,"a big message",false);
	senderAlerterNotifier.sendNotificationByObject(notifObject);

```

***Brief presentation of the NotificationParameterObject constructor :***
*Signature of the function:*
```javascript
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
)
```
*Explanation of the parameter extract from documentation :*

 >  Constructor to create a **notificationParameterObject** who contain all the styling attribute to display a notifications
 > @param {String} **message** - The message you want to display
 > @param {String} **type** - The type of message ex: Info, warning, alert, success or empty to a regular message
 > @param {Integer} **timeout** - The expiration delay in ms to make the notification disappear
 > @param {String} **crossClose** - The type of closing cross the values possible are : default, round, none
 > @param {Object} **styleObject** - An object who contain to the maximum 4 value (border, backgroundColor, borderRadius, boxShadow)
 > @param {String} **srcImage** - The link of the image to display, can be empty if you don't want an image
 > @param {String} **altImage** - The alternative attribute of the image
 > @param {String} **svgPath** - A full SVG html tag to replace the default SVG display, can be empty if you don't want another SVG or if you give a srcImage
 > @param {String} **svgColor** - The color of SVG
 > @param {Boolean} **showIconSvg** - A boolean : true if you want to display the default SVG, false if you don't want it
 > @param {String} **bigMessage** - The big message to display, can be empty if you don't want to make a big Notifications
 > @param {Boolean} **bigMessageIsHtml** - A boolean : true if the string path is HTML, false if it isn't
 
 #### Reminder: Shortened methods
 Actually shortened methods exist to simplify processing, replacing unrequested values with default ones.
 Each method is named with this convention:
 **send(Alert|Notification)(*type*|'')(WithStyle|WithoutStyle)**
 > An exemple to understand :
 > I want to send a notification of warning type without style I can use :
 > **sendNotificationWarningWithoutStyle(message, [timeout = 3000])**
 
Here is the list of avaible methods for the notification :
```javascript
/* Send a notification of the type of your choice*/
sendNotificationWithStyle(message, [type = "",styleObject = defaultNotificationsstyleObject,timeout = 3000])
sendNotificationWithoutStyle(message,[type = "",timeout = 3000])

/* send a notification of the type of default */
sendNotificationNotypeWithStyle(message,[styleObject = defaultNotificationsstyleObject,timeout = 3000])
sendNotificationNotypeWithoutStyle(message, [timeout = 3000])

/* Send an info notification*/
sendNotificationInfoWithStyle(message,[styleObject = defaultNotificationsstyleObject,timeout = 3000]) 
sendNotificationInfoWithoutStyle(message, [timeout = 3000])

/* Send an alert notification*/
sendNotificationAlertWithStyle(message, [styleObject = defaultNotificationsstyleObject, timeout = 3000])
sendNotificationAlertWithoutStyle(message, [timeout = 3000])

/* Send a warning notification*/
sendNotificationWarningWithStyle(message, [styleObject = defaultNotificationsstyleObject, timeout = 3000])
sendNotificationWarningWithoutStyle(message, [timeout = 3000])

/* Send a success notification*/
sendNotificationSuccessWithStyle(message, [styleObject = defaultNotificationsstyleObject, timeout = 3000])
sendNotificationSuccessWithoutStyle(message, [timeout = 3000])

```

One more detail : the closing mark is on the right and appear when youre mouse is over it. You can also kill the notification by swipping to the right or left.
# Todos

What I planned for V2 :
 - Add a timeout-border progress-bar to notifications 
 - Animate the svg stroke on notifications
 - Add shortcut method for every possibilities

If you have any other idea please feel free to contact me and I will add it if I like it 😆

# License

I don't know well the license type avaible but let say it's open source and free to use. It's all that matters and have fun with Svelte and his components.


**Free Component, Hell Yeah!**

# Authors

Made by me ([@BoutValentin][git-hub-author]) with ❤ for every svelte developers and every projects

Contact :
 - Email: bout.valentin@gmail.com
 - GitHub: [@BoutValentin][git-hub-author]
 - WebSite: [boutvalentin.com][website]

# Acknowledgment

Thanks to :
 - Agustin Encaje for this tutorial : [How to Create a Package for Svelte][npm-tuto]
 - The svelte documentation : [Svelte Documentation][svelte-doc]
 - The css.gg WebSite for creating cool svg icon : [css.gg][css-cg]

[//]: # (These are reference links used in the body)


   [git-hub-author]: <https://github.com/BoutValentin>
   [website]: <https://boutvalentin.com/app>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [npm-tuto]: <https://medium.com/better-programming/creating-a-package-for-svelte-f44fccbc886b>
   [svelte-doc]: <https://svelte.dev/docs>
   [css-cg]: <https://css.gg/>
   
