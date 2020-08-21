<script>
     import AlertContainer from "./AlertContainer.svelte"
     import NotificationsContainer from "./NotificationsContainer.svelte"
     export let positioningAlerting = "bottom"
     export let positioningNotifications = "topRight"
     export let showFastCleanNotifications  = true
     export let showFastCleanAlert = true
</script>
<p>coucou en</p>
<AlertContainer positioning={positioningAlerting} showFastClean={showFastCleanAlert}/>
<NotificationsContainer positioning={positioningNotifications} showFastClean={showFastCleanNotifications}/>