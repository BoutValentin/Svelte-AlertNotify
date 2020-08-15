<script>
     import {fade,fly} from "svelte/transition"
     import { notifications } from "./store.js";
     import {defaultCross, roundCross, success, unamed, info, alert} from "./AppIcon.js"
     import { onMount } from "svelte";
     import SVGIcon from "./SVGIcon.svelte"
     import { beforeUpdate, tick } from 'svelte';

	beforeUpdate(async () => {
		console.log('the component is about to update' + crossClose);
		await tick();
		console.log('the component just updated' + crossClose);
	});
     export let srcImage = '';
     export let altImage = '';
     export let svgPath = '';
     export let svgColor = '';
     export let showIconSvg = true;
     export let message = "a message in notifications"
     export let type = '';
     export let timeout = 3000;
     export let key;
     export let crossClose = "default";
     export let onBotton = false;
     export let styleObject = {
          border: "1px solid rgba(0, 0, 0, 0.2);",
          backgroundColor: "white;",
          borderRadius: "10px;",
          boxShadow: "-3px -4px 15px 4px rgba(189,189,189,0.3);"
     }
     export let showProgressBar = true
     export let showProgressBarTop = true
     export let colorProgressBar = type==="success" ? "#8ac926" : type==="info" ? "#f77f00" : type==="warning"||type==="alert" ? "red" : "rgba(129, 129, 129, 0.5)"
     let showCrossHover = false
     if(type &&type!=="info"&&type!=="alert"&&type!=="warning"&&type!=="success" ){
          console.error("You don't pass info or alert or warning or success as a value of type ! Be sure a global classname YourCustomName-span exists")
     }
     const typeshow = type.charAt(0).toUpperCase() + type.slice(1)
     const positionMinusPlus = onBotton ? "15" : "-15"
     onMount(()=>{
         window.setTimeout(selfDestroy,timeout)
     }) 
     $:{
          console.log(crossClose)
          if( crossClose===undefined ) crossClose = "default"
          if(showIconSvg===undefined) showIconSvg = true
          console.log(crossClose)
     }
     function createStylingString(){
          let resString = "";
          if(styleObject.border){
               resString += `border: ${styleObject.border}`
          }else{
               resString += `border: 1px solid rgba(0, 0, 0, 0.2);`
          }
          if(styleObject.backgroundColor){
               resString += `background-color: ${styleObject.backgroundColor}`    
          }else{
               resString += `background-color: white;`
          }
          if(styleObject.borderRadius){
               resString += `border-radius: ${styleObject.borderRadius}`
          }else{
               resString+= `border-radius: 10px;`
          }
          if(styleObject.boxShadow){
               resString += `box-shadow: ${styleObject.boxShadow}`
          }else{
               resString += `box-shadow: -3px -4px 15px 4px rgba(189,189,189,0.3);`
          }
          return resString
     }
     function selfDestroy(){
          console.log("coucou")
          notifications.update(notifications => {return {key:notifications.key, array: notifications.array.filter( notification => notification.id!==key)}})
     }
</script>
<style>
     .div-notification-uniq-root{
          display:flex;
          overflow: hidden;
          margin: 15px 0;
          width: 100%;
          height: auto;
     }
.div-notification-uniq {
          width: 100%;
          height: auto;
          transition: cubic-bezier(.14,.96,.83,.67);
          transition-duration: 100ms;
          display: flex;
          flex-direction: row;
          align-items: stretch;
          overflow: hidden;
     }
     p{
          text-align: center;
          margin: auto;
          margin-left: var(--leftMargin);
          padding: 10px 15px;
          padding-left: var(--leftPadding);
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
     .default-cross, .round-cross{
          
          transition: cubic-bezier(.14,.96,.83,.67);
          transition-duration: 250ms;
          width: min(35px,10vw);;
          height: auto;
          background-color: rgba(129, 129, 129, 0.2);
          min-height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          align-self: stretch;
          flex-shrink: 0;
     }
     .default-cross:active, .round-cross:active{
          background-color: rgba(129, 129, 129, 0.1);

     }
     .contain-svg{
          width: min(55px,10vw);
          height: auto;
          min-height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          align-self: stretch;
          flex-shrink: 0;
     }
     img{
          border-radius: 5px;
          margin: 5px 2px 5px 5px ;
          height: 55px;
          width: 55px;
     }

</style>

<div class={`div-notification-uniq-root ${type==="alert"||type==="warning" ? "wiggle-animation" : null}`} in:fly={{y: positionMinusPlus, duration: 350}} out:fade style={createStylingString()+`flex-direction:${showProgressBarTop?"column-reverse":"column"};`} >
     <div class="div-notification-uniq">
          {#if srcImage}
          <img src={srcImage} alt={altImage}/>
          {:else if type==="" && showIconSvg}
          <div class={"contain-svg"}>
          <SVGIcon  d={unamed} color={'#3C4859'}/>
          </div>
          {:else if type==="success"&& showIconSvg}
          <div class={"contain-svg"}>
               <SVGIcon  d={success} color={'#8ac926'} />
          </div>
          {:else if type==="info"&& showIconSvg}
               <div class={"contain-svg"}>
                    <SVGIcon  d={info} color={'#f77f00'} />
               </div>
          {:else if type==="warning" || type==="alert" && showIconSvg}
               <div class={"contain-svg"}>
                    <SVGIcon  d={alert} color={'red'} />
               </div>
          {:else if svgPath}
               <div class={"contain-svg"}>
                    <SVGIcon  d={svgPath} color={svgColor} />
               </div>
          {/if}
          <p style={`${(!srcImage | type==="info"|type==="alert"|type==="warning"|type==="success"|svgPath) && showIconSvg ? "--leftMargin: 2px; --leftPadding:2px;" : "--leftMargin: auto;--leftPadding:15px;"}`}>
               {#if type }
                    <span class="{type}-span">{typeshow} :</span>
               {/if}
              {message} 
          </p>
          {#if crossClose!=="none"}
          <div on:click={selfDestroy} on:mouseleave={()=>showCrossHover=false} on:mouseover={()=>{showCrossHover=true;console.log("im in")}} class="{crossClose}-cross" style={`background-color: ${showCrossHover ? "rgba(129, 129, 129, 0.2)":"white"};`}>
               {#if showCrossHover}
                    <SVGIcon  d={crossClose==="round" ? roundCross : defaultCross} color={'black'} />
               {/if}
          </div>
          {/if}
     </div>
    
     {#if showProgressBar & false}
          <div class="div-timer" style={`animation-duration: ${(timeout-350)/1000}s;background-color:${colorProgressBar};`}></div>
     {/if}
</div>