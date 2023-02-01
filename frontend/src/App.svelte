<script>
  import { Router, Link, Route } from "svelte-routing";
  import Home from '/Users/alexanderforsanker/AdvancedWeb/ShopTech/frontend/src/lib/Home.svelte'
	import SellTech from '/Users/alexanderforsanker/AdvancedWeb/ShopTech/frontend/src/lib/SellTech.svelte'
	import FAQ from '/Users/alexanderforsanker/AdvancedWeb/ShopTech/frontend/src/lib/FAQ.svelte'
</script>

<Router>
  <header>
    <nav
      class="navbar fixed-top bg-dark navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link to="/" class="nav-link active" aria-current="page">Home</Link>
            </li>
            <li class="nav-item">
              <Link to="/sellTech" class="nav-link active" aria-current="page">Sell Tech</Link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
            <li class="nav-item">
              <Link to="/faq" class="nav-link active" aria-current="page">FAQ</Link>
            </li>
            <a href="#" class="navbar-brand logo">ShopTech</a>
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
  <!-- <main>
  <h1>Test title</h1> 
    <Route path="/about" component={SellTech}></Route>
		<Route path="/posts" component={FAQ}></Route>
		<Route path="/" component={Home}></Route>
  </main>
-->
  <footer class="bg-body-teriary text-body-secondary pt-5 pb-4">
<!--  <div class="container text-center text-md.left">
      <div class="row text-center text-md-left">
        <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
          <h5 class="fw-bold mb-4 text-dark">ShopTech</h5>
          <p>Our mission is to be the leading tech reseller in Scandinavia. 

            We started our mission our of frustration because of the high prices on consumer electronics,
            and the lack of buyer protection when buying used and refurbished tech.
            
            We can provide both new and used electronics at a fair price. We can also provide you with a 
            one year warranty and free repairs. 
          </p>
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 class="fw-bold mb-4 text-dark">Products</h5>
            <p>
              <Link to="#" class="text-body-secondary" style="text-decoration: none;">IPhone</Link>
              <Link to="#" class="text-body-secondary" style="text-decoration: none;">IPad</Link>
              <Link to="#" class="text-body-secondary" style="text-decoration: none;">Macbook</Link>
            </p>
          </div>
        </div>
      </div>
    </div> -->  
  </footer>
</Router>
