import { writable } from "svelte/store";

export const alerts = writable({ key: 0, array: [] });
export const notifications = writable({ key: 0, array: [] });
