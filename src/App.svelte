<script>
  import Counter from './lib/Counter.svelte'
  let inputSeconds = 60;

</script>

<main>
  <input name="seconds" bind:value={inputSeconds} type="number">
  <div class="card">
    <Counter seconds={inputSeconds}/>
  </div>
</main>

<style>
  input {
    width:30%;
    height: auto;
    font-size: 40px;
    padding: 10px;
    margin-bottom: 10vh;
    text-align: right;
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

  .card {
    filter: drop-shadow(0 0 1em #646cffaa);
  }
</style>
