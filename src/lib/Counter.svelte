<script>
    import { onMount, onDestroy } from 'svelte';

    export let seconds = 60;
    let running = false;
    let startSeconds;
    let interval;

    function startTimer() {
        startSeconds = seconds;
        running = true;
        interval = setInterval(() => {
            seconds -= 1;
            if (seconds === 0) {
                clearInterval(interval);
                running = false;
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(interval)
        running = false;
    }

    function resetTimer() {
        seconds = startSeconds;
    }

    function repeatTimer() {
        seconds = startSeconds;
        startTimer();
    }

    onMount(() => {
        // Cleanup interval on component destruction
        onDestroy(() => {
            clearInterval(interval);
        });
    });



</script>

<main>
    <h1 class="countdown">00:{seconds < 10 ? "0" + (seconds === null ? 0 : seconds) : seconds}</h1>
    {#if seconds === 0}
        <button on:click={resetTimer}>reset</button>
        <button on:click={repeatTimer}>repeat</button>
    {:else if running}
        <button on:click={stopTimer}>stop</button>
    {:else}
        <button on:click={startTimer}>start</button>
    {/if}
</main>

<style>
    h1 {
        font-size: 24px;
        margin-bottom: 16px;
    }

    .countdown {
        font-size: 4em;
    }

    button {
        margin-top: 2em;
        padding: 8px 16px;
        font-size: 16px;
    }

    button:hover {
        filter: drop-shadow(0 0 1em #646cffaa);
    }
</style>
