import { writable } from "svelte/store"

export const user = writable({
    isLoggedIn: false,
    accessToken: "",
    userEmail: ""
})

export const admin = writable({
    isLoggedIn: false,
    accessToken: "",
    adminEmail: ""
})