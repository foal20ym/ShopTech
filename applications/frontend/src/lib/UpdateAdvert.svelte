<script lang="ts">
  import { Router, Link, navigate, Route } from "svelte-routing";
  import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardText,
    Button,
    Alert
  } from "sveltestrap";
  import { Form, FormGroup, FormText, Input, Label } from "sveltestrap";
  import { user } from "../user-store";

  export let id;
  let isfetchingAdvert = true;
  let failedTofetchAdvert = false;
  let advert = null;

  let category = "";
  let title = "";
  let price = "";
  let description = "";
  let img_src = "";
  let createdAt = "";
  let errorCodes = [];
  let advertWasCreated = false;
  let isFetchingUserData = true;
  let failedToFetchUserData = false;
  let showUpdateConfirmation = false;
  let showDeleteConfirmation = false;

  async function loadAdvert() {
    try {
      const response = await fetch("http://localhost:8080/advert/" + id);

      switch (response.status) {
        case 200:
          advert = await response.json();
          category = advert.category;
          title = advert.title;
          price = advert.price;
          description = advert.description;
          isfetchingAdvert = false;
          break;
      }
    } catch (error) {
      isfetchingAdvert = false;
      failedTofetchAdvert = true;
    }
  }
  loadAdvert();

  export let comments = [];

  let username = "";
  let text = "";

  function submitComment() {
    comments = [...comments, { username, text }];
    username = "";
    text = "";
  }

  async function updateAdvert() {
    const advert = {
      category,
      title,
      price,
      description,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/advert/update/" + id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(advert),
        }
      );

      switch (response.status) {
        case 200:
          navigate("/account", {
            replace: false,
          });
          break;
      }
    } catch (error) {
      console.log("error:", error);
    }
  }

  async function deleteAdvert(){

try {
        const response = await fetch("http://localhost:8080/advert/delete/" + id, {
          method: "DELETE",
          headers: {
                "Content-Type": "application/json",
            }
        })

        switch(response.status){
            case 200:
                navigate("/account", {
                  replace: false
                })
                break;
        }

}catch(error){
  console.log("error:", error)
}
}


</script>

<Container class="product-page">

  {#if isfetchingAdvert}
    <p>Wait, i'm fetching data...</p>
  {:else if failedTofetchAdvert}
    <p>Couldn't fetch advert, check your internet connection</p>
  {:else if advert}

  <form on:submit|preventDefault={updateAdvert}>
    <h1>{advert.title}</h1>
    <Row>
      <Col sm="12" md="6">
        <div class="advert-page-img-frame">
          <img
            class="advert-page-img"
            alt="{advert.title}"
            title="MacBook Pro 16&quot; M1 2021"
            src={advert.img_src}
            width="180"
            height="180"
          />
        </div>
      </Col>
      <Col sm="12" md="6">
        <Card class="product-details">
          <CardBody>
            <CardTitle><input type="text" class="input-field" bind:value={title} /></CardTitle>
            <CardText><textarea rows="5" class="input-field" bind:value={description}></textarea></CardText>
            <p><b>Price:</b> <input type="text" class="input-field" bind:value={price}/></p>
            <Row>
              <button on:click|preventDefault on:click={() => (showUpdateConfirmation = !showUpdateConfirmation)}
                class="btn btn-outline-dark mr-2 mt-3 mb-3">
                Update advert
              </button>
              <Alert
                color="primary"
                isOpen={showUpdateConfirmation}
                toggle={() => (showUpdateConfirmation = false)}
                fade={false}>
                <button
                type="submit"
                class="btn btn-outline-dark mr-2 mt-3 mb-3"> Confirm update</button>
              </Alert>
            </Row>
            <Row>
              <button on:click|preventDefault on:click={() => (showDeleteConfirmation = !showDeleteConfirmation)}
                class="btn btn-outline-danger mt-3 mb-3">
                Delete advert
              </button>
              <Alert
                color="primary"
                isOpen={showDeleteConfirmation}
                toggle={() => (showDeleteConfirmation = false)}
                fade={false}>
                <button
                class="btn btn-outline-danger mt-3 mb-3" on:click={() => (deleteAdvert())}>Confirm delete</button>
              </Alert>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </form>

  {:else}
    <p>No advert with the given id {id}.</p>
  {/if}

  <Row>
    <Col sm="12" id="comment-section">
      <h2 id="comment-section-title">Comments</h2>
      <hr/>
      {#each comments as comment}
        <div id="comment-section-comment">
          <b>{comment.username}:</b> {comment.text}
        </div>
      {/each}
      <hr/>
      <form on:submit|preventDefault={submitComment}>
        <FormGroup>
          <Label for="username">Username:</Label>
          <Input type="text" id="username" bind:value={username} class="input-field" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">Text Area</Label>
          <Input type="textarea" name="text" id="exampleText" bind:value={text} class="input-field"/>
        </FormGroup>
        <Button type="submit">Submit</Button>
      </form>
    </Col>
  </Row>
</Container>
