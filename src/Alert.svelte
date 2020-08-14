<script>
     import {fade,fly} from "svelte/transition"
     import { alerts } from "./store.js";
     import { onMount } from "svelte";
     export let message = "a message in alert"
     export let type = ''
     export let timeout = 3000
     export let key 
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
          window.setTimeout(sellDestroy,timeout)
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
     function sellDestroy(){
          alerts.update(alerts => {return {key:alerts.key, array: alerts.array.filter( alert => alert.id!==key)}})
     }
</script>
<style>
     .div-alert-uniq {
          width: 100%;
          margin: 15px 0;
          transition: cubic-bezier(.14,.96,.83,.67);
          transition-duration: 100ms;
     }
     p{
          text-align: center;
          margin: 10px auto;
          padding: 10px;
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

<div class="div-alert-uniq" in:fly={{y: positionMinusPlus, duration: 350}} out:fade style={createStylingString()}>
     <p>
          {#if type }
               <span class="{type}-span">{typeshow} :</span>
          {/if}
         {message} 
     </p>
</div>
