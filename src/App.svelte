<script>
    import { Progress, Input, Container, Row, Col, Label, FormGroup, Form } from 'sveltestrap';
</script>

<style>
</style>

<main>
    <br>
      <Container>
        <Input
        type="url"
        name="url"
        id="exampleUrl"
        placeholder="Url" />
        <br>
        <div></div>
        <br>
        <div></div>
        <div></div>

        <br>
        <Progress value={25} style="height: 25px;" />
        <br>
        
        <div class="row">
          <label for="inputPassword" class="col-sm-1 col-form-label">Format</label>
          <div class="col-sm-4">
            <select class="form-select" aria-label="Default select example" id="inputPassword">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <div class="col-sm-4">
            <button class="btn btn-hg btn-inverse" >Download</button>
            <button class="btn btn-hg btn-inverse">Folder</button> 

          </div>
        </div>
        <div>Select destination forder to continue</div>
      </Container>
</main>
