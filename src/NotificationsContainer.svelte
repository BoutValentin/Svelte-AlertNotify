<script>
     import Notification from "./Notification.svelte"
     import { notifications } from "./store.js";
     import { onDestroy } from "svelte";
import SvgIcon from "./SVGIcon.svelte";
import { clearAll } from "./AppIcon";

     export let positioning = "topRight"
     export let showFastClean = true
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
     let interval;
     function handleClear(event){
          if(positioning==="bottom" || positioning==="bottomRight" ||positioning==="bottomLeft"){
          notifications.update(notifications => {return {key:notifications.key, array: notifications.array.slice(0, -1)}})
          if(array.length>=1) interval = setInterval(()=>notifications.update(notifications => {return {key:notifications.key, array: notifications.array.slice(0, -1)}}),125);
          }else{
               notifications.update(notifications => {return {key:notifications.key, array: notifications.array.slice(1)}})
               if(array.length>=1) interval = setInterval(()=>notifications.update(notifications => {return {key:notifications.key, array: notifications.array.slice(1)}}),125);
           
          }
     }
     $:if (array.length===0) clearInterval(interval)
     onDestroy(()=>{unsubscribed();clearInterval(interval)})

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
.contain-clear-div{
     max-height: min(5vmin, 55px);
     width: auto;
     align-self: flex-end;
     display: flex ;
     flex-direction: row;
justify-content: space-between;}
.subcontain-clear-div{
     margin: var(--margin);
     height: min(5vmin, 35px);
     width: min(5vmin, 35px);
     align-self: flex-end;
     transform: rotate(var(--rotate));
}


</style>

<div class="div-notification-container" style={styledPositionString}>
     {#if positioning==="bottom" || positioning==="bottomRight" ||positioning==="bottomLeft" }
     {#each array as notification,i (notification.id) }
          <Notification message={notification.message} type={notification.type} timeout={notification.timeout} crossClose={notification.crossClose} styleObject={notification.styleObject} srcImage={notification.srcImage} altImage={notification.altImage} svgPath={notification.svgPath} svgColor={notification.svgColor} showIconSvg={notification.showIconSvg} bigMessage={notification.bigMessage} bigMessageIsHtml={notification.bigMessageIsHtml} onBotton={true} key={notification.id} isLastChild={i+1===array.length}/>
     {/each}
     {:else}
     {#each [...array].reverse() as notification,i (notification.id) }
          <Notification message={notification.message} type={notification.type} timeout={notification.timeout} crossClose={notification.crossClose} styleObject={notification.styleObject} srcImage={notification.srcImage} altImage={notification.altImage} svgPath={notification.svgPath} svgColor={notification.svgColor} showIconSvg={notification.showIconSvg} bigMessage={notification.bigMessage} bigMessageIsHtml={notification.bigMessageIsHtml} onBotton={true} key={notification.id} isLastChild={i+1===array.length}/>
     {/each}
     {/if}
     {#if array.length>1 && showFastClean}
     <div class="contain-clear-div" on:click="{handleClear}" >
          <div class="subcontain-clear-div" style={`${positioning==="bottom" || positioning==="bottomRight" ||positioning==="topRight" || positioning==="top" ?" --margin: 0 5px 0 auto;--rotate:0deg;":"--margin:0 auto 0 5px;--rotate:180deg;"}`}>
               <SvgIcon d={clearAll} color={"black"} height={"min(5vmin, 35px)"} width={"min(5vmin, 35px)"}/>
          </div>
     </div>
     {/if}
</div>