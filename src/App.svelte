<script>
  import Counter from './lib/Counter.svelte'
  import TimeInput from './lib/TimeInput.svelte';
  import { running } from './lib/stores.js'
  import { seconds } from './lib/stores.js'

  let currentSeconds;

</script>

<main>

  {#if !$running}
    <div>
      <TimeInput />
    </div>
  {/if}

  <div>
    <Counter seconds={$seconds}/>
  </div>

</main>

<style>

</style>
