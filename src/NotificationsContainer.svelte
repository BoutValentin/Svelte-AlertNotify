<script>
     import Notification from "./Notification.svelte"
     import { notifications } from "./store.js";
     import { onDestroy } from "svelte";

     export let positioning = "topRight"
     if(positioning &&positioning!=="topRight"&&positioning!=="topLeft"&&positioning!=="bottomRight"&&positioning!=="bottomLeft"){
          console.error("Invalid property Named : You can use topRight, topLeft, bottomRight, bottomLeft and you use " + positioning )
          positioning = "topRight"
     }
     let styledPositionString = '';
     switch (positioning) {
          case "topRight":
               styledPositionString = "top: min(max(25px, 2vmin),15px);right: min(max(25px, 2vmin),15px);"
               break;
          case "topLeft":
          styledPositionString = "top: min(max(25px, 2vmin),15px);left: min(max(25px, 2vmin),15px);"
               break;
          case "bottomRight":
          styledPositionString = "bottom: min(max(25px, 2vmin),15px);right: min(max(25px, 2vmin),15px);"
               break;
          case "bottomLeft":
          styledPositionString = "bottom: min(max(25px, 2vmin),15px);left: min(max(25px, 2vmin),15px);"
               break;
          default:
               break;
     }
     let array =[] ;
     const unsubscribed = notifications.subscribe(allNotifications=>array = allNotifications.array)
     onDestroy(unsubscribed)
     /* 
     export let message = "a message in notifications"
     export let type = '';
     export let timeout = 3000;
     export let crossClose = "default";
     export let styleObject = {
          border: "1px solid rgba(0, 0, 0, 0.2);",
          backgroundColor: "white;",
          borderRadius: "10px;",
          boxShadow: "-3px -4px 15px 4px rgba(189,189,189,0.3);"
     }
     export let srcImage = '';
     export let altImage = '';
     export let svgPath = '';
     export let svgColor = '';
     export let showIconSvg = true;
     export let bigMessage = ''
     export let bigMessageIsHtml = false;*/
</script>
<style>

.div-notification-container{
     min-width: min(50px, max(3vw,25px));
     width: min(50%,365px);
     position: fixed;
     transition: cubic-bezier(.14,.96,.83,.67);
     transition-duration: 500ms;
     z-index: 100;
}
</style>

<div class="div-notification-container" style={styledPositionString}>
     {#if positioning==="bottom" || positioning==="bottomRight" ||positioning==="bottomLeft" }
     {#each array as notification (notification.id) }
          <Notification message={notification.message} type={notification.type} timeout={notification.timeout} crossClose={notification.crossClose} styleObject={notification.styleObject} srcImage={notification.srcImage} altImage={notification.altImage} svgPath={notification.svgPath} svgColor={notification.svgColor} showIconSvg={notification.showIconSvg} bigMessage={notification.bigMessage} bigMessageIsHtml={notification.bigMessageIsHtml} onBotton={true} key={notification.id}/>
     {/each}
     {:else}
     {#each [...array].reverse() as notification (notification.id) }
          <Notification message={notification.message} type={notification.type} timeout={notification.timeout} crossClose={notification.crossClose} styleObject={notification.styleObject} srcImage={notification.srcImage} altImage={notification.altImage} svgPath={notification.svgPath} svgColor={notification.svgColor} showIconSvg={notification.showIconSvg} bigMessage={notification.bigMessage} bigMessageIsHtml={notification.bigMessageIsHtml} onBotton={true} key={notification.id}/>
     {/each}
     {/if}
</div>