<script>
  import Counter from './lib/Counter.svelte'
  import TimeInput from './lib/TimeInput.svelte';
  import { running, seconds, prettyTime } from './lib/stores.js'

  let currentSeconds;

</script>

<main>

  {#if !$running}
    <div>
      <TimeInput inputSeconds={$prettyTime.seconds}
                 inputMinutes={$prettyTime.minutes}
                 inputHours={$prettyTime.hours}/>
    </div>
  {/if}


  <div>
    <Counter seconds={$seconds}/>
  </div>

</main>

<style>

</style>
