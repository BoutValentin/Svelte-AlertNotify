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
          <Notification showIconSvg={notification.showIconSvg} message={notification.message} bigMessage={"ehllo wolt"} type={notification.type} onBotton={true} timeout={notification.timeout} crossClose={notification.crossClose ? notification.crossClose : undefined} srcImage={notification.srcImage} altImage={notification.altImage} key={notification.id}/>
     {/each}
     {:else}
     {#each [...array].reverse() as notification (notification.id) }
          <Notification showIconSvg={notification.showIconSvg} bigMessage={"salut a tous "} message={notification.message} type={notification.type} onBotton={false} timeout={notification.timeout} crossClose={notification.crossClose ? notification.crossClose : undefined} srcImage={notification.srcImage} altImage={notification.altImage} key={notification.id}/>
     {/each}
     {/if}
</div>