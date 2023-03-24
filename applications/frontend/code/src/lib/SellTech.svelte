<script lang="ts">
  import { Link, Route } from "svelte-routing";
  import Auth from "./Auth.svelte";
  import CreateAd from "./CreateAd.svelte";
  import { user } from "../user-store.js";

  import { Container, Col, Row, Button } from "sveltestrap";
</script>

<div id="sellTechContent">
  <Container>
    <Row cols={2}>
      <Row>
        <Col id="sellTechText" sm={{ offset: 1 }}>
          <p>Sell your old tech to us and get a fair price.</p>
          <p>We guarantee that we can offer the highest price.</p>
          <p>If you were to find a better price, we’ll match it.</p>
          <Col sm={{ offset: 2 }}>
            {#if $user.isLoggedIn}
              <Button id="sellTechButton">
                <Link to="/createad" class="nav-link active" aria-current="page"
                  >Sell your tech!</Link
                >
              </Button>
            {:else}
              <Button id="sellTechButton">
                <Link to="/Auth" class="nav-link active" aria-current="page"
                  >Sign in</Link
                >
              </Button>
            {/if}
          </Col>
        </Col>
      </Row>
      <Col>
        <img
          src="./appleProductsStockPhoto.png"
          alt="./appleProductsStockPhoto.png"
          id="sellTechImg"
        />
      </Col>
    </Row>
  </Container>
</div>

<Route path="sellTech/createad" component={CreateAd} />
<Route path="sellTech/Auth" component={Auth} />
