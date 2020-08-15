<script>
     import AlertContainer from "./AlertContainer.svelte"
     import NotificationsContainer from "./NotificationsContainer.svelte"
     export let positioningAlerting = "bottom"
     export let positioningNotifications = "topRight"
</script>
<AlertContainer positioning={positioningAlerting}/>
<NotificationsContainer positioning={positioningNotifications} />