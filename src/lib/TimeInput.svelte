<script>
    import { seconds } from './stores.js'

    export let inputSeconds = 0;
    export let inputMinutes = 1;
    export let inputHours = 0;

    $: totalSeconds = inputSeconds + (inputMinutes*60) + (inputHours*60*60);

    function handleEdit() {
        seconds.set(totalSeconds);
    }

</script>

<main>
    <div class="inputs">
        <input name="hours" bind:value={inputHours} type="number" on:input={handleEdit}>
        <h1>:</h1>
        <input name="minutes" bind:value={inputMinutes} type="number" on:input={handleEdit}>
        <h1>:</h1>
        <input name="seconds" bind:value={inputSeconds} type="number" on:input={handleEdit}>
    </div>
</main>

<style>
    .inputs {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: baseline;
    }

    input {
        width: 1.6em;
        height: auto;
        font-size: 40px;
        padding: 10px;
        margin-bottom: 10vh;
        text-align: left;
        font-weight: bold;
        border-radius: 0.25em;
        background-color: #1a1a1a;
        border: 1px solid #1a1a1a;
        filter: drop-shadow(0 0 1em #646cff55);
    }

    input:focus, input:hover {
        filter: drop-shadow(0 0 1em #646cffaa);
        border: 1px solid #646cffaa;
    }
</style>