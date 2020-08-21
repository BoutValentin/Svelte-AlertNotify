<script>
     import {fade,fly} from "svelte/transition"
     import { alerts } from "./store.js";
     import { onMount } from "svelte";

     import {handleMoving,handlePressedDown,handlePressedUp} from "./handleAction.js"

     export let message = "a message in alert"
     export let type = ''
     export let timeout = 3000
     export let key 
     export let showProgressBar = true
     export let colorProgressBar = type==="success" ? "#8ac926" : type==="info" ? "#f77f00" : type==="warning"||type==="alert" ? "red" : "rgba(129, 129, 129, 0.5)"
     if(type &&type!=="info"&&type!=="alert"&&type!=="warning"&&type!=="success" ){
          console.error("You don't pass info or alert or warning or success as a value of type ! Be sure a global classname YourCustomName-span exists")
     }
     export let positionBottom = true 
     export let styleObject = {
          border: "1px solid rgba(129, 129, 129, 0.2);",
          backgroundColor: "white;",
          borderRadius: "15px;",
          boxShadow: "-3px -4px 15px 4px rgba(189,189,189,0.3);"
     }
    onMount(()=>{
          window.setTimeout(selfDestroy,timeout)
          
     }) 
     const positionMinusPlus = positionBottom ? "15" : "-15"
     const typeshow = type.charAt(0).toUpperCase() + type.slice(1)
     function createStylingString(){
          let resString = "";
          if(styleObject.border){
               resString += `border: ${styleObject.border}`
          }else{
               resString += `border: 1px solid rgba(129, 129, 129, 0.2);`
          }
          if(styleObject.backgroundColor){
               resString += `background-color: ${styleObject.backgroundColor}`    
          }else{
               resString += `background-color: white;`
          }
          if(styleObject.borderRadius){
               resString += `border-radius: ${styleObject.borderRadius}`
          }else{
               resString+= `border-radius: 15px;`
          }
          if(styleObject.boxShadow){
               resString += `box-shadow: ${styleObject.boxShadow}`
          }else{
               resString += `box-shadow: -3px -4px 15px 4px rgba(189,189,189,0.3);`
          }
          
          return resString
     }
     let objectHandle = {
          isMousePressed: false,
          pointercoordonnes: {x: undefined, y:undefined},
     pixelDerived: 0,
     opacity: 1,
     classAdd:  `div-alert-uniq ${type==="alert"||type==="warning" ? "wiggle-animation" : null}`

     }
     let referencesDivRoot = null
     function selfDestroy(){
          alerts.update(alerts => {return {key:alerts.key, array: alerts.array.filter( alert => alert.id!==key)}})
     }
</script>
<style>
     .div-alert-uniq {
          user-select: none;
          width: 100%;
          height: auto;
          margin: min(15px,4vmin) 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform: translateX(var(--xTranslate));
          opacity: var(--useOpacity);
     }
     :global(.wiggle-animation) {
          animation-name: wiggle;
          animation-delay: 0s;
          animation-direction:normal;
          animation-duration: 0.7s;
          animation-timing-function:linear;
          transform: translateX(var(--xTranslate));
          opacity: var(--useOpacity);
     }
     :global(.div-timer){
          height: 3px;
          width: auto;
          border-radius: 25px;
          overflow: hidden;
          flex-shrink: 1;
          animation-name: unload;
          animation-delay: 350ms;
          animation-direction:normal;
          animation-timing-function:linear;
          animation-fill-mode:forwards;
     }
     @keyframes unload {
     from {width:100% ;}
     to {width: 0%;}
     }
     @keyframes wiggle {
          0%{
               transform: translateX(-5px);
          }
          20%{
               transform: translateX(5px);
          }
          40%{
               transform: translateX(-5px);
          }
          60%{
               transform: translateX(5px);
          }
          80%{
               transform: translateX(-5px);
          }
          100%{
               transform: translateX(0px);
          }
     }
     p{
          text-align: center;
          margin: min(15px,2vmin) auto;
          padding: min(5px,2vmin);
          width: auto;
          word-break: break-all;
     }
     .alert-span,.warning-span{
          color: red;
     }
     .info-span{
          color: #f77f00;
     }
     .success-span{
          color: #8ac926;
     }
</style>

<div bind:this="{referencesDivRoot}" class={` ${objectHandle.classAdd}`} in:fly={{y: positionMinusPlus, duration: 350}} out:fade style={createStylingString()+`--xTranslate:${objectHandle.pixelDerived}px;--useOpacity:${objectHandle.opacity};`} on:mousedown="{e=>{handlePressedDown(e,objectHandle,`div-alert-uniq`);objectHandle=objectHandle}}" on:mouseup="{e=>{handlePressedUp(e,objectHandle,`div-alert-uniq wiggle-animation`);objectHandle=objectHandle}}" on:mousemove="{e=>{handleMoving(e,objectHandle,selfDestroy);objectHandle=objectHandle}}">
     <p>
          {#if type }
               <span class="{type}-span">{typeshow} :</span>
          {/if}
         {message} 
     </p>
     {#if showProgressBar}
          <div class="div-timer" style={`animation-duration: ${(timeout-350)/1000}s;background-color:${colorProgressBar};`}></div>
     {/if}
</div>
