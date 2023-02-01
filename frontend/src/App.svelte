<script>
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./lib/Home.svelte"
  import SellTech from "./lib/SellTech.svelte"
  import FAQ from "./lib/FAQ.svelte"
</script>

<Router>
  <header>
    <nav
      class="navbar bg-dark navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link to="#" class="nav-link active" aria-current="page">Home</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="#">Sell Tech</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="#">Pricing</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="#">FAQ</Link>
            </li>
            <Link to="#" class="navbar-brand logo">ShopTech</Link>
          </ul>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">Search</button
            >
          </form>
        </div>
      </div>
    </nav>
  </header> 

  <main>
    <p>&nbsp; </p>
    <p>&nbsp; </p>
    <Route path="/" component={Home}></Route>
    <Route path="/sellTech" component={SellTech}></Route>
		<Route path="/faq" component={FAQ}></Route>
  </main>
  
  <footer class="bg-dark-subtle text-body-secondary pt-5 pb-4 bottom-footer">
    <div class="container text-center text-md-left">
      <div class="row text-center text-md-left">
        <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
          <h5 class="fw-bold mb-4 text-start" >ShopTech</h5>
          <p class="text-start">
            Our mission is to be the leading tech reseller in Scandinavia. 

            We started our mission our of frustration because of the high prices on consumer electronics,
             and the lack of buyer protection when buying used and refurbished tech.
            
            We can provide both new and used electronics at a fair price. We can also provide you with a 
            one year warranty and free repairs.
          </p>
        </div>
        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
          <h5 class="fw-bold mb-4 text-start">Products</h5>
          <p class="text-start">
            <Link to="#" class="text-body-secondary" style="text-decoration: none;">iPhone</Link>
          </p>
          <p class="text-start">
            <Link to="#" class="text-body-secondary" style="text-decoration: none;">iPad</Link>
          </p>
          <p class="text-start">
            <Link to="#" class="text-body-secondary" style="text-decoration: none;">Macbook</Link>
          </p>
          <p class="text-start">
            <Link to="#" class="text-body-secondary" style="text-decoration: none;">Android</Link>
          </p>
        </div>
        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
          <h5 class="fw-bold mb-4 text-start">Menu</h5>
          <p class="text-start">
            <Link to="#" class="text-body-secondary" style="text-decoration: none;">Home</Link>
          </p>
          <p class="text-start">
            <Link to="#" class="text-body-secondary" style="text-decoration: none;">Sell Tech</Link>
          </p>
          <p class="text-start">
            <Link to="#" class="text-body-secondary" style="text-decoration: none;">Pricing</Link>
          </p>
          <p class="text-start">
            <Link to="#" class="text-body-secondary" style="text-decoration: none;">FAQ</Link>
          </p>
        </div>
        <div class="col-md-4 col-lg-3 col-xl-3 mt-3">
          <h5 class="fw-bold mb-4 text-start">Contact</h5>
          <p class="text-start">
            <i class="bi bi-house-fill"></i> Gjuterigatan 5, JKPG, 55318, SE
          </p>
          <p class="text-start">
            <i class="bi bi-envelope-fill"></i> office@shoptech.com
          </p>
          <p class="text-start">
            <i class="bi bi-telephone-fill"></i> 08-446 800 16
          </p>
          <p class="text-start">
            <i class="bi bi-printer-fill"></i> 01 335 633 77
          </p>
        </div>
      </div>
      <hr class="mb-4">
      <div class="row align-items-center">
        <div class="col-md-7 col-lg-8">
          <p>Copyright &#169 2023 All rights reserved by: 
            <Link to="#" style="text-decoration: none;">
              <strong class="text-body-secondary">ShopTech</strong>
            </Link>
          </p>
        </div>
      </div>
    </div>
  </footer>
</Router>
