import { writable, derived } from 'svelte/store';

export const seconds = writable(30);
export const running = writable(false);
export const prettyTime = derived(
    seconds,
    $seconds => {
        return {
            hours: Math.floor($seconds / 3600) < 10 ? "0" + Math.floor($seconds / 3600) : Math.floor($seconds / 3600),
            minutes: Math.floor(($seconds % 3600) / 60) < 10 ? "0" + Math.floor(($seconds % 3600) / 60) : Math.floor(($seconds % 3600) / 60),
            seconds: Math.floor((($seconds % 3600) % 60)) < 10 ? "0" + Math.floor((($seconds %3600) % 60)) : Math.floor((($seconds %3600) % 60))
        }
    }
);