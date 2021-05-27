<script>
    import { FormGroup, Input } from 'sveltestrap';

export let name;
</script>

<style>
</style>

<main>
    <br>
    <FormGroup>
        <Input
          type="url"
          name="url"
          id="exampleUrl"
          placeholder="url placeholder" />
      </FormGroup>
</main>
