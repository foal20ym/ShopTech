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
    Alert,
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
  let adverts = [];
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

  async function deleteAdvert() {
    try {
      const response = await fetch(
        "http://localhost:8080/advert/delete/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
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

  async function loadUserAdverts() {
    try {
      const response = await fetch(
        "http://localhost:8080/getUserAdverts/" + $user.userEmail
      );

      switch (response.status) {
        case 200:
          adverts = await response.json();
          console.log(adverts[0]);
          break;
      }
    } catch (error) {
      console.log("error:", error);
    }
  }

  loadUserAdverts();


  function shouldShowStockPhoto(imagePath) {
    if (
      imagePath === "/MacBook_Pro_13-inch_M1_2020.png" ||
      imagePath === "/macbook2016.png"
    ) {
      return true;
    } else {
      return false;
    }
  }
</script>


{#if $user.isLoggedIn}
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
            {#if shouldShowStockPhoto(advert.img_src)}
              <img
                class="card-img-top"
                alt="MacBook Pro 16&quot; M1 2021"
                title="MacBook Pro 16&quot; M1 2021"
                src={advert.img_src}
              />
            {:else}
              <img
                class="card-img-top"
                alt="MacBook Pro 16&quot; M1 2021"
                title="MacBook Pro 16&quot; M1 2021"
                src={"data:image/png;base64," + advert.img_src}
              />
            {/if}
          </div>
        </Col>
        <Col sm="12" md="6">
          <Card class="product-details">
            <CardBody>
              <CardTitle
                ><input
                  type="text"
                  class="input-field"
                  bind:value={title}
                /></CardTitle
              >
              <CardText
                ><textarea
                  rows="5"
                  class="input-field"
                  bind:value={description}
                /></CardText
              >
              <p>
                <b>Price:</b>
                <input type="text" class="input-field" bind:value={price} />
              </p>
              <Row>
                <button
                  on:click|preventDefault
                  on:click={() =>
                    (showUpdateConfirmation = !showUpdateConfirmation)}
                  class="btn btn-outline-dark mr-2 mt-3 mb-3"
                >
                  Update advert
                </button>
                <Alert
                  color="primary"
                  isOpen={showUpdateConfirmation}
                  toggle={() => (showUpdateConfirmation = false)}
                  fade={false}
                >
                  <button
                    type="submit"
                    class="btn btn-outline-dark mr-2 mt-3 mb-3"
                  >
                    Confirm update</button
                  >
                </Alert>
              </Row>
              <Row>
                <button
                  on:click|preventDefault
                  on:click={() =>
                    (showDeleteConfirmation = !showDeleteConfirmation)}
                  class="btn btn-outline-danger mt-3 mb-3"
                >
                  Delete advert
                </button>
                <Alert
                  color="primary"
                  isOpen={showDeleteConfirmation}
                  toggle={() => (showDeleteConfirmation = false)}
                  fade={false}
                >
                  <button
                    class="btn btn-outline-danger mt-3 mb-3"
                    on:click={() => deleteAdvert()}>Confirm delete</button
                  >
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
</Container>
{:else}
  <div class="centered-auth-section">
    <h4>Please Sign in to update adverts.</h4>
    <Button>
      <Link to="/signup" class="nav-link active" aria-current="page">Sign in</Link
      >
    </Button>
  </div>
{/if}
