<script lang="ts">
  import { DropdownItem, Accordion, AccordionItem, Input } from "sveltestrap";
  import { Link } from "svelte-routing";
  import APIBaseURL from "../config";

  const fetchAdvertsPromise = fetch(APIBaseURL + "adverts");

  let isOpen = false;
  const toggle = () => (isOpen = !isOpen);

  let selectedCategory = "";
  function handleSelect(event) {
    selectedCategory = event.target.value;
  }

  let category = "Date added - oldest";

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

<div class="sidenav text-dark">
  <Accordion>
    <AccordionItem>
      <h4 class="m-0" slot="header">iPhone</h4>
      <DropdownItem>iPhone 8</DropdownItem>
      <DropdownItem>iPhone X</DropdownItem>
      <DropdownItem>iPhone XS</DropdownItem>
      <DropdownItem>iPhone 11</DropdownItem>
      <DropdownItem>iPhone 12</DropdownItem>
      <DropdownItem>iPhone 12 Pro</DropdownItem>
      <DropdownItem>iPhone 12 Max</DropdownItem>
    </AccordionItem>
  </Accordion>

  <Accordion>
    <AccordionItem>
      <h4 class="m-0" slot="header">iPad</h4>
      <DropdownItem>iPad 4 Air</DropdownItem>
      <DropdownItem>iPad 5 Pro</DropdownItem>
      <DropdownItem>iPad Air</DropdownItem>
    </AccordionItem>
    <AccordionItem>
      <h4 class="m-0" slot="header">MacBook</h4>
      <DropdownItem>MacBook Air 13" 2019</DropdownItem>
      <DropdownItem>MacBook Air 13" 2020</DropdownItem>
      <DropdownItem>MacBook Air 13" M1 2020</DropdownItem>
      <DropdownItem>MacBook Pro 13" intel 2020</DropdownItem>
      <DropdownItem>MacBook Pro 13" M1 2020</DropdownItem>
      <DropdownItem>MacBook Pro 13" M2 2022</DropdownItem>
      <DropdownItem>MacBook Pro 16" M2 2022</DropdownItem>
    </AccordionItem>
    <AccordionItem>
      <h4 class="m-0" slot="header">iMac</h4>
      <DropdownItem>iMac 2020</DropdownItem>
      <DropdownItem>iMac 2021</DropdownItem>
      <DropdownItem>iMac 2022</DropdownItem>
    </AccordionItem>
  </Accordion>
</div>

<section class="category pb-4">
  <div class="container">
    <div class="row">
      <div
        id="filter-controls"
        class="col-md-12 col-lg-12 col-xs-12 d-sm-block d-md-none d-lg-none"
      >
        <div class="d-flex">
          <div class="mr-auto" />
        </div>
      </div>
      <div class="clearfix" />
      <div class="col-md-4 col-lg-3 category-menu" />
      <div class="col-md-8 col-lg-9 category-item">
        <div
          class="col col-md-12 col-lg-12 col-xs-12 d-none d-sm-none d-md-block d-lg-block"
        >
          <div class="d-flex justify-content-end filter-sort mb-3">
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              on:change={handleSelect}
              bind:value={category}
            >
              <option>Price - low to high</option>
              <option>Price - high to low</option>
              <option>Date added - oldest</option>
              <option>Date added - newest</option>
            </Input>
          </div>
        </div>
        <div class="clearfix" />

        <div class="row row-p0-greed">
          {#await fetchAdvertsPromise}
            <p>Wait, i'm loading...</p>
          {:then response}
            {#await response.json() then adverts}
              {#each adverts as advert}
                <div
                  class="col-md-12 col-lg-6 pr-0 grouped-product-card-container ec_product myborder"
                >
                  <Link to="/advert/{advert.advertID}">
                    <div
                      class="grouped-product-card d-flex flex-row-reverse justify-content-center"
                    >
                      <div class="col-md-6 text-center">
                        <div class="h-100 position-relative">
                          <h1>
                            <p class="link-design text-dark">{advert.title}</p>
                          </h1>
                          <div>
                            <div class="link-design text-dark">
                              ${advert.price}
                            </div>
                            <p class="btn btn-blue">Visa mer</p>
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-md-6 m-0 p-0 text-center align-self-center"
                      >
                        <div class="card-img-wrapper">
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
                      </div>
                    </div>
                  </Link>
                </div>
              {/each}
            {/await}
          {:catch error}
            <p>{error.message}</p>
            <p>{JSON.stringify(error)}</p>
            <p>Something went wrong, try again later.</p>
          {/await}
        </div>
      </div>
    </div>
  </div>
</section>
