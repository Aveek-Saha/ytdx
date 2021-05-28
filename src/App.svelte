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
        <Form inline="form-inline">
              <Label for="exampleSelect">Select</Label>
              <Input type="select" name="select" id="exampleSelect" style="width: 30% ; margin:0px">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
        </Form>
      </Container>
</main>
