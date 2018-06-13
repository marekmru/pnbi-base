import Vue from 'vue'
const EventBus = new Vue()
export const LOADING = 'LOADING'
export const PROFILE_UPDATED = 'PROFILE_UPDATED'
export const CONFIG_UPDATED = 'CONFIG_UPDATED'
export const ERROR = 'ERROR'
export const FORBIDDEN = 'FORBIDDEN'
export default EventBus


