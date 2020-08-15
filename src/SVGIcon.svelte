<script>
     export let d = ""
     export let color = "black"
</script>
<div style={`color: ${color};`} class="contain-svg-icon">
     {@html d}
</div>     
<style>
     div{
          display: flex;
          align-items: center;
          align-content: center;
          margin: auto;
     }
     :global(.contain-svg-icon > svg){
          margin: auto;
     }
</style>

