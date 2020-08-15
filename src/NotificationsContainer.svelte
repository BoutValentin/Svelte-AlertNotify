<script>
     import Notification from "./Notification.svelte"
     import { sendNotificationWithStyle} from "./AlertNotify.js"
     import { notifications } from "./store.js";
     import { onDestroy } from "svelte";

     export let positioning = "topRight"
     const defautStyleObject = {
          border: "1px solid rgba(129, 129, 129, 0.2);",
          backgroundColor: "white;",
          borderRadius: "15px;",
          boxShadow: "-3px -4px 15px 4px rgba(189,189,189,0.3);",
     };
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
     $: console.log(array)
     const unsubscribed = notifications.subscribe(allNotifications=>array = allNotifications.array)
     let count = 0;
     function handleClick(event){
          const rnd = Math.floor(Math.random() * Math.floor(5))
          let type ;
          switch (rnd) {
               case 0:
                    type = "info"
                    break;
               case 1:
                    type = "success"
                    break;
               case 2:
                    type = "warning"
                    break;
               case 3:
                    type = "alert"
                    break;
               default:
                    type = ''
                    break;
          }
          const timeout = Math.floor((Math.random() * Math.floor(5)) + 1)*1000;
          sendNotificationWithStyle("Message numero "+count, type,defautStyleObject,timeout)
          ++count;
     }
     onDestroy(unsubscribed)


</script>
<style>

.div-notification-container{
     min-width: min(50px, max(3vw,25px));
     width: min(50%,325px);
     position: fixed;
     transition: cubic-bezier(.14,.96,.83,.67);
     transition-duration: 500ms;
     z-index: 100;
}
</style>
<button on:click={handleClick}>
     Add a notification
</button>
<div class="div-notification-container" style={styledPositionString}>
     {#if positioning==="bottom" || positioning==="bottomRight" ||positioning==="bottomLeft" }
     {#each array as notification (notification.id) }
          <Notification showIconSvg={notification.showIconSvg} message={notification.message} type={notification.type} onBotton={true} timeout={notification.timeout} crossClose={notification.crossClose ? notification.crossClose : undefined} srcImage={notification.srcImage} altImage={notification.altImage} key={notification.id}/>
     {/each}
     {:else}
     {#each [...array].reverse() as notification (notification.id) }
          <Notification showIconSvg={notification.showIconSvg} message={notification.message} type={notification.type} onBotton={false} timeout={notification.timeout} crossClose={notification.crossClose ? notification.crossClose : undefined} srcImage={notification.srcImage} altImage={notification.altImage} key={notification.id}/>
     {/each}
     {/if}
</div>