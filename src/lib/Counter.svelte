<script>
    import { onMount, onDestroy } from 'svelte';
    import { seconds } from "./stores.js";
    import { running } from "./stores.js";

    let startSeconds;
    let currentSeconds;

    const unsubscribe = seconds.subscribe(value => {
        currentSeconds = value;
    })

    let interval;
    let audio;
    let finished = false;

    function startTimer() {
        finished = false;
        startSeconds = currentSeconds;
        running.set(true);
        interval = setInterval(() => {
            seconds.update(n => n - 1);
            if ($seconds === 0) {
                audio.play();
                finished = true;
                clearInterval(interval);
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(interval);
        seconds.set(startSeconds);
        running.set(false);
    }

    function repeatTimer() {
        seconds.set(startSeconds);
        startTimer();
    }

    onMount(() => {
        // Cleanup interval on component destruction
        onDestroy(() => {
            clearInterval(interval);
            unsubscribe();
        });
    });

</script>

<main>

    {#if $running}
        <h1 class="countdown">
            {Math.floor(currentSeconds / 3600) < 10 ? "0" + Math.floor(currentSeconds / 3600) : Math.floor(currentSeconds / 3600)}
            :{Math.floor((currentSeconds % 3600) / 60) < 10 ? "0" + Math.floor((currentSeconds % 3600) / 60) : Math.floor((currentSeconds % 3600) / 60)}
            :{Math.floor(((currentSeconds %3600) % 60)) < 10 ? "0" + Math.floor(((currentSeconds %3600) % 60)) : Math.floor(((currentSeconds %3600) % 60))}
            <!-- seconds < 10 ? "0" + (seconds === null ? 0 : seconds) : seconds -->
        </h1>
    {/if}

    {#if $running}
        <button on:click={stopTimer}>stop</button>
    {:else}
        <button on:click={startTimer}>start</button>
    {/if}

    <audio src="https://cdn.freesound.org/previews/76/76426_877451-lq.mp3" bind:this={audio}></audio>
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
