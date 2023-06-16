import { writable } from 'svelte/store';

export const seconds = writable(60);
export const running = writable(false);