<script>
    import { onMount, onDestroy } from 'svelte';
    import { seconds, running, prettyTime } from "./stores.js";

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
                finished = true;
                audio.play();
                clearInterval(interval);
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(interval);
        running.set(false);
    }

    function resetTimer() {
        seconds.set(startSeconds);
        running.set(false);
        finished = false;
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
        <div class="group">
            <h1>{$prettyTime.hours}</h1>
            <h1>:</h1>
            <h1>{$prettyTime.minutes}</h1>
            <h1>:</h1>
            <h1>{$prettyTime.seconds}</h1>
        </div>
    {/if}

    {#if ($running && !finished)}
        <button on:click={stopTimer}>stop</button>
    {:else if ($running && finished)}
        <button on:click={resetTimer}>reset</button>
    {:else}
        <button on:click={startTimer}>start</button>
    {/if}

    <audio src="https://cdn.freesound.org/previews/76/76426_877451-lq.mp3" bind:this={audio}></audio>
</main>

<style>

    .group {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: baseline;
    }

    .group h1 {
        font-size: 3em;
        margin-bottom: 16px;
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
