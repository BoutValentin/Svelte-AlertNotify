<script>
     import {fade,fly} from "svelte/transition"
     import { notifications } from "./store.js";
     import {defaultCross, roundCross, success, unamed, info, alert, downArrow, upArrow} from "./AppIcon.js"
     import { onMount, createEventDispatcher } from "svelte";
     import SVGIcon from "./SVGIcon.svelte"
     import { beforeUpdate, tick } from 'svelte';
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
     export let bigMessage = ''
     export let bigMessageIsHtml = false;
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
     let showBigMessage = false;
     let heightBefore = 0 ;
     let heightAfter = 0;
     onMount(()=>{
        window.setTimeout(selfDestroy,timeout)
         heightBefore = referencesDivRoot.clientHeight;
     }) 
     $:{
          if( crossClose===undefined ) crossClose = "default"
          if(showIconSvg===undefined) showIconSvg = true
     }
    async function handleMore(event){
          showBigMessage = !showBigMessage
          await tick()
          if(showBigMessage)heightAfter=referencesDivRoot.clientHeight
          classAdd=`div-notification-uniq-root smooth-bigger`
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
     let isMousePressed = false;
     let pointercoordonnes = {x: undefined, y:undefined}
     let referencesDivRoot = null
     let pixelDerived= 0
     let opacity = 1
     let classAdd = `div-notification-uniq-root ${type==="alert"||type==="warning" ? "wiggle-animation" : null}`
     function handleMoving(event){
          event.stopPropagation();
          event.preventDefault();
          if(isMousePressed){
               pixelDerived += event.clientX - pointercoordonnes.x
               pointercoordonnes.x = event.clientX
               if(Math.abs(pixelDerived)>50){
                    opacity -= (Math.abs(pixelDerived)-50)/1000
                    if(opacity<0.1 || Math.abs(pixelDerived) > window.innerHeight/3  ){
                         selfDestroy()
                    }
               }
          }
          
     }
     function handlePressedDown(event){
          isMousePressed=true;
          pointercoordonnes.x = event.clientX;
          pointercoordonnes.y = event.clientY;
          pixelDerived=0;
          opacity=1;
          classAdd = `div-notification-uniq-root`
     }
     function handlePressedUp(event){
          isMousePressed=false;
          pixelDerived=0;
          opacity=1;
          classAdd=`div-notification-uniq-root wiggle-animation`
     }
     function is_touch_enabled() { 
            return ( 'ontouchstart' in window ) 
     } 
     function selfDestroy(){
          if(showBigMessage){
               window.setTimeout(selfDestroy,timeout)
               return
          } 
          notifications.update(notifications => {return {key:notifications.key, array: notifications.array.filter( notification => notification.id!==key)}})
     }
</script>
<style>
     .div-notification-uniq-root{
          user-select: none;
          display:flex;
          overflow: hidden;
          margin: 15px 0;
          width: 100%;
          height: auto;
          flex-direction: column;
          transform: translateX(var(--xTranslate));
          opacity: var(--useOpacity);
     }
     .div-notification-uniq {
          width: 100%;
          height: var(--heightVar);
          transition: cubic-bezier(.14,.96,.83,.67);
          transition-duration: 100ms;
          display: flex;
          flex-direction: row;
          align-items: stretch;
          overflow: hidden;
     }
     .smooth-bigger{
          animation-name: smooth;
          animation-delay: 0s;
          animation-direction:var(--animDir);
          animation-duration: 0.3s;
          animation-timing-function:linear;
     }
     @keyframes smooth{
          0%{
               height: var(--heightBefore);
          }
          100%{
               height: var(--heightAfter);
          }
          
     }
     p{
      padding: 5px 12px; 
      line-height: 1.5;
     text-align: initial;
      word-break: break-all;
      text-indent: 17px;
     }
     .p-title{
          text-align: center;
          text-indent: 0px;
          line-height: normal;
          margin: auto;
          margin-left: var(--leftMargin);
          padding: var(--paddingValue) 15px;
          padding-left: var(--leftPadding);
          width: auto;
          word-break: break-all;
          font-size: var(--fontSize);
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
          transition: cubic-bezier(0.6, -0.28, 0.735, 0.045);
          transition-duration: 300ms;
     }
     img{
          border-radius: 5px;
          margin: var(--marginValue) ;
          height: var(--heightValue);
          width: var(--widthValue);
          flex-basis: 1;
     }

</style>

<div bind:this={referencesDivRoot} class={`${classAdd}`} in:fly={{y: positionMinusPlus, duration: 350}} out:fade style={createStylingString()+`--xTranslate:${pixelDerived}px;--useOpacity:${opacity};--heightBefore:${heightBefore}px;--heightAfter:${heightAfter}px;--animDir:${!showBigMessage?"reverse":"normal"};`} on:mousedown|stopPropagation="{handlePressedDown}" on:mouseup|stopPropagation="{handlePressedUp}" on:mousemove="{handleMoving}">
     <div transition:fade={{duration: 0.5}} class="div-notification-uniq" style={`--heightVar: ${showBigMessage?"25px":"auto"};--fontSize: ${showBigMessage?"12px":"auto"};`}>
          {#if srcImage}
          <img src={srcImage} alt={altImage} style={`--heightValue: ${showBigMessage?"70%":"55px"}; --widthValue: ${showBigMessage?"auto":"auto"}; --marginValue: ${ showBigMessage?"auto 5px":"5px 2px 5px 5px "} ;`}/>
          {:else if svgPath}
               <div class={"contain-svg"}>
                    <SVGIcon  d={svgPath} color={svgColor} height={showBigMessage?"30%":"50%"} width={showBigMessage?"30%":"50%"}/>
               </div>
          {:else if type==="" && showIconSvg}
          <div class={"contain-svg"}>
          <SVGIcon  d={unamed} color={svgColor ? svgColor :'#3C4859'} height={showBigMessage?"30%":"50%"} width={showBigMessage?"30%":"50%"}/>
          </div>
          {:else if type==="success"&& showIconSvg}
          <div class={"contain-svg"}>
               <SVGIcon  d={success} color={svgColor? svgColor :'#8ac926'} height={showBigMessage?"30%":"50%"} width={showBigMessage?"30%":"50%"} />
          </div>
          {:else if type==="info"&& showIconSvg}
               <div class={"contain-svg"}>
                    <SVGIcon  d={info} color={svgColor? svgColor :'#f77f00'} height={showBigMessage?"30%":"50%"} width={showBigMessage?"30%":"50%"} />
               </div>
          {:else if type==="warning" || type==="alert" && showIconSvg}
               <div class={"contain-svg"}>
                    <SVGIcon  d={alert} color={svgColor? svgColor :'red'} height={showBigMessage?"30%":"50%"} width={showBigMessage?"30%":"50%"}/>
               </div>
          {/if}
          <p class={"p-title"} style={`${(!srcImage | type===''|type==="info"|type==="alert"|type==="warning"|type==="success"|svgPath) && showIconSvg ? "--leftMargin: 2px; --leftPadding:2px;" : "--leftMargin: auto;--leftPadding:15px;"}--paddingValue:${showBigMessage ? "auto":"10px"};`}>
               {#if type }
                    <span class="{type}-span">{typeshow} :</span>
               {/if}
              {message} 
          </p>
          {#if bigMessage}
               <div class={"contain-svg"} on:click="{handleMore}">
                    <SVGIcon d={downArrow} shouldRotate={true} rotationFrom={!showBigMessage?"180deg":"0deg"} rotationTo={!showBigMessage?"0deg":"180deg"} color={"black"} height={showBigMessage?"30%":"40%"} width={showBigMessage?"30%":"40%"} />
               </div>
          {/if}
          {#if crossClose!=="none"}
          <div on:click={selfDestroy} on:mouseleave={()=>showCrossHover=false} on:mouseover={()=>{showCrossHover=true}} class="{crossClose}-cross" style={`background-color: ${showCrossHover || is_touch_enabled() ? "rgba(129, 129, 129, 0.2)":"white"};`}>
               {#if showCrossHover || is_touch_enabled() }
                    <SVGIcon  d={crossClose==="round" ? roundCross : defaultCross} color={'black'} />
               {/if}
          </div>
          {/if}
     </div>
     {#if showBigMessage}
          <div transition:fade={{duration: 0.3}}>
               {#if bigMessageIsHtml}
               {@html bigMessage}
               {:else}
               <p>{bigMessage}</p>
               {/if}
          </div>
     {/if}
     {#if showProgressBar & false}
          <div class="div-timer" style={`animation-duration: ${(timeout-350)/1000}s;background-color:${colorProgressBar};`}></div>
     {/if}
</div>