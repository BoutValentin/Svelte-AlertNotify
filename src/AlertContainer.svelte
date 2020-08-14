<script>
     import Alert from "./Alert.svelte"
     import { sendAlertWithStyle} from "./AlertNotify.js"
     import { alerts } from "./store.js";
import { onDestroy } from "svelte";
import AlertNotify from "./AlertNotify.svelte";
import App from "../../Svelte-tester/svelte-tester/src/App.svelte";

     export let positioning = "bottom"
     const defautStyleObject = {
  border: "1px solid rgba(129, 129, 129, 0.2);",
  backgroundColor: "white;",
  borderRadius: "15px;",
  boxShadow: "-3px -4px 15px 4px rgba(189,189,189,0.3);",
};
     if(positioning && positioning!=="bottom"&&positioning!=="top"&&positioning!=="topRight"&&positioning!=="topLeft"&&positioning!=="bottomRight"&&positioning!=="bottomLeft"){
          console.error("Invalid property Named : You can use bottom, top, topRight, topLeft, bottomRight, bottomLeft and you use " + positioning )
          positioning = "bottom"
     }
     let styledPositionString = '';
     switch (positioning) {
          case "bottom":
               styledPositionString = "bottom: min(max(25px, 2vmin),15px);left: 50%;transform: translateX(-50%);"
               break;
          case "top":
               styledPositionString = "top: min(max(25px, 2vmin),15px);left: 50%;transform: translateX(-50%);"
               break;
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
     const unsubscribed = alerts.subscribe(allAlerts=>array = allAlerts.array)
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
          const timeout = Math.floor(Math.random() * Math.floor(5))*1000;
          sendAlertWithStyle("Message numero "+count, type,defautStyleObject,timeout)
          ++count;
     }
     
     onDestroy(unsubscribed)
</script>
<style>
.div-alert-container{
     min-width: min(50px, max(3vw,25px));
     max-width: min(40%,350px);
     position: fixed;
     transition: cubic-bezier(.14,.96,.83,.67);
     transition-duration: 500ms;
     z-index: 100;
}

</style>
<button on:click={handleClick}>
     Add an Alert
</button>
<div class="div-alert-container" style={styledPositionString}>
{#if positioning==="bottom" || positioning==="bottomRight" ||positioning==="bottomLeft" }
{#each array as alert (alert.id) }
     <Alert message={alert.message} type={alert.type} positionBottom={true} timeout={alert.timeout} key={alert.id}/>
{/each}
{:else}
{#each [...array].reverse() as alert (alert.id) }
     <Alert message={alert.message} type={alert.type} positionBottom={false} timeout={alert.timeout} key={alert.id}/>
{/each}
{/if}
</div>