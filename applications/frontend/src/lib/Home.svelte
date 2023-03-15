<script lang="ts">
  import { Nav,NavItem,Dropdown,DropdownItem,DropdownToggle,DropdownMenu,
    NavLink,Collapse,Navbar,NavbarToggler,NavbarBrand,Col,Row,Container,
    Accordion,AccordionItem,
  } from "sveltestrap";
  import { Router, Link, Route } from "svelte-routing";

  import { user } from "../user-store.js";

  const fetchAdvertsPromise = fetch("http://localhost:8080")

  let isOpen = false;
  const toggle = () => (isOpen = !isOpen);

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
      <div class="col-md-12">
        <div id="webshop-category-description">
          <div class="read-more-wrapper text-center" />
        </div>
      </div>
    </div>

    <div class="row">
      <div
        id="filter-controls"
        class="col-md-12 col-lg-12 col-xs-12 d-sm-block d-md-none d-lg-none"
      >
        <div class="d-flex">
          <div class="mr-auto">
            <button
              id="category-sidebar-button"
              class="btn filter-title d-sm-block d-md-none d-lg-none"
              data-toggle="collapse"
              data-target="#collapseCategory"
              aria-expanded="true"
              aria-controls="collapseCategory">
              <i class="list-icon" />
            </button>
          </div>

          <div class="d-flex justify-content-end filter-sort">
            <div class="btn-group bootstrap-select webshop-sort-by form-select light fit-width">
              
              <!-- svelte-ignore a11y-role-has-required-aria-props -->
              <div
                class="dropdown-menu open dropdown-menu-right"
                role="combobox">
                <ul
                  class="dropdown-menu inner"
                  role="listbox"
                  aria-expanded="false">
                  <li data-original-index="0" class="selected">
                    <a
                      tabindex="0"
                      class=""
                      href=" "
                      data-tokens="null"
                      role="option"
                      aria-disabled="false"
                      aria-selected="true"
                      ><span class="text">Pris - lågt till högt</span><span
                        class="glyphicon glyphicon-ok check-mark"/>
                        </a>
                  </li>
                  <li data-original-index="1">
                    <a
                      tabindex="0"
                      class=""
                      href=" "
                      data-tokens="null"
                      role="option"
                      aria-disabled="false"
                      aria-selected="false"
                      ><span class="text">Pris - högt till lågt</span><span
                        class="glyphicon glyphicon-ok check-mark"
                      /></a
                    >
                  </li>
                  <li data-original-index="2">
                    <a
                      tabindex="0"
                      class=""
                      href=" "
                      data-tokens="null"
                      role="option"
                      aria-disabled="false"
                      aria-selected="false"
                      ><span class="text">Senaste produkterna</span><span
                        class="glyphicon glyphicon-ok check-mark"
                      /></a
                    >
                  </li>
                </ul>
              </div>
              <select
                name="sort_by"
                class="webshop-sort-by form-select light"
                tabindex="-98"
              >
                <option value="price_low">Pris - lågt till högt</option>
                <option value="price_high">Pris - högt till lågt</option>
                <option value="latest_product">Senaste produkterna</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="clearfix" />

      <div class="col-md-4 col-lg-3 category-menu">
        <div class="row">
          <div id="accordion" class="col-md-12 panel behclick-panel">
            <div id="collapseCategory" class="collapse show">
              <div class="panel-body mb-4 collapse show" id="collapseFilters" style="">
                <div id="price-filter" class="filter-container">
                  <div class="panel-heading border-none">
                    <h4 class="panel-title active"> </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 

      <div class="col-md-8 col-lg-9 category-item">
        <div class="col col-md-12 col-lg-12 col-xs-12 d-none d-sm-none d-md-block d-lg-block">
          <div class="d-flex justify-content-end filter-sort mb-3">

              <select
                name="sort_by"
                class="webshop-sort-by form-select light mx-auto"
                tabindex="-98">
                <option value="price_low">Pris - lågt till högt</option>
                <option value="price_high">Pris - högt till lågt</option> 
                <option value="latest_product">Senaste produkterna</option>
                
              </select>

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
              data-id=""
              data-name=""
              data-category=""
              data-position="1"
              data-price=""
            >
            <Link to="/advert/{advert.advertID}">
              <div
                class="grouped-product-card d-flex flex-row-reverse justify-content-center"
              >
                <div class="col-md-6 text-center">
                  <div class="h-100 position-relative">
                    <h1>
                      <a class="link-design text-dark"
                        href="https://mresell.se/webshop/p/macbook-pro-16-m1-2021/e858b8747da660cfcd3a5cb55d487a8a/"
                        >{advert.title}</a
                      >
                    </h1>
                    <div class="call-to-action-container">
                      <div class="mb-2">från {advert.price} kr</div>
                      <a
                        href="https://mresell.se/webshop/p/macbook-pro-16-m1-2021/e858b8747da660cfcd3a5cb55d487a8a/"
                        class="btn btn-blue">Visa mer</a
                      >
                    </div>
                  </div>
                </div>
                <div class="col-md-6 m-0 p-0 text-center align-self-center">
                  <a
                    href="https://mresell.se/webshop/p/macbook-pro-16-m1-2021/e858b8747da660cfcd3a5cb55d487a8a/"
                  >
                    <div class="card-img-wrapper">
                      <img
                        class="card-img-top"
                        alt="MacBook Pro 16&quot; M1 2021"
                        title="MacBook Pro 16&quot; M1 2021"
                        src={advert.img_src}
                      />
                    </div>
                  </a>
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

      <div>
        <div class="col-md-12 mt-4 description d-block d-md-none d-lg-none">
          <div class="notify-block notify-category static mb-0 text-center">
            <div class="mb-3">
              <img
                width="33px"
                height="48px"
                alt="notify"
                src="https://mresell.se/wp-content/themes/mresell_v4/img/v4/icon-notify-bell.svg"
              />
            </div>
            <div class="mb-2">
              Om du inte kan hitta modellen du söker efter är du välkommen att
              använda vårt notifikationsverktyg! Så snart vi har motsvarande
              modell enligt dina kriterier på lager så kommer vi att höra av oss
            </div>
            <div>
              <a href="https://mresell.se/notify/">Notifiera mig</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>