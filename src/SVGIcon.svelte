<script>
import { onMount, tick } from "svelte";


     export let d = ""
     export let color = "black"
     export let width = "50%"
     export let height = "50%"
     export let rotationFrom = "0deg"
     export let rotationTo = "0deg"
     export let classAnim = 'contain-svg-icon'
     export let shouldRotate = false
     let references = null;
     let asRotate = false;
     onMount(()=>{
          
     }
     )
      function handleClick(event){
          if(shouldRotate){
               console.log(references.firstChild)
               if(!asRotate){
                    references.firstChild.classList.remove("animation-class-reverse")
                    references.firstChild.classList.add("animation-class")
                   
               }else{
                    references.firstChild.classList.remove("animation-class")
                    references.firstChild.classList.add("animation-class-reverse")
               }
               asRotate = !asRotate
               
          }
     }
</script>
<div bind:this={references} on:click="{handleClick}" class={"contain-svg-icon"} style={`color: ${color};--heightVar: ${height};--widthVar: ${width};--rotationFrom:${rotationFrom};--rotationTo:${rotationTo};`} >
     {@html d}
</div>     
<style>
     svg{
     }
     @keyframes -global-rotation{
          0%{
               transform: rotate(0deg);
          }
          100%{
               transform: rotate(180deg);
          }
     }
     @keyframes -global-rotation2{
          0%{
               transform: rotate(180deg);
          }
          100%{
               transform: rotate(0deg);
          }
     }
     :global(.animation-class) {

          animation-name: rotation;
          animation-delay: 0.1s;
          animation-direction:normal;
          animation-duration: 0.5s;
          animation-timing-function:ease-in-out;
          transform: rotate(180deg);

     }
     :global(.animation-class-reverse) {

          animation-name: rotation2;
          animation-delay: 0.1s;
          animation-direction:normal;
          animation-duration: 0.5s;
          animation-timing-function:ease-in-out;
          transform: rotate(0deg);

     }
     div{
          
          display: flex;
          align-items: center;
          align-content: center;
          margin: auto;
     }
     :global(.contain-svg-icon > svg){

          margin: auto;
          height: var(--heightVar);
          width: var(--widthVar);
     }
</style>

