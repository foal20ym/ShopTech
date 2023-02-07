<script>
  let showLogin = true;
</script>

<div class="container ">
  <div class="row">
    <div class="col me-5 form-box">
      <h2 class="mt-5">Login or create an account to continue</h2>
      <div class="button-box mb-3">
        <div id="special-btn"/>
        <button
          type="button"
          class="toggle-btn"
					class:active={showLogin == true}
          id="login-btn"
          on:click={() => (showLogin = true)}>Login</button
        >
        <button
          type="button"
          class="toggle-btn"
					class:active={showLogin == false}
          id="signup-btn"
          on:click={() => (showLogin = false)}>Sign up</button
        >
      </div>
      {#if showLogin}
        <form class="input-group" id="login-form">
          <div class="mb-3 mt-2">
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              style="width: 400px;"
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              style="width: 400px;"
            />
          </div>
					<div class="signUpPageButton">
          <button type="submit" class="btn btn-outline-dark mt-3">Login</button
          >
					</div>
        </form>
      {:else}
        <form class="input-group" id="register-form">
          <div class="mb-3 mt-2">
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="First name"
              style="width: 400px;"
            />
          </div>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Last name"
              style="width: 400px;"
            />
          </div>
          <div class="mb-3">
            <input
              type="email"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Email"
              style="width: 400px;"
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              style="width: 400px;"
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Repeat password"
              style="width: 400px;"
            />
          </div>
					<div class="signUpPageButton">
          <button type="submit" class="btn btn-outline-dark mt-3">Sign up</button
          >
					</div>
        </form>
      {/if}
    </div>
    <div class="col col-media-hide mt-5">
			<img src="./public/appleProductsStockPhoto.png" alt="./public/appleProductsStockPhoto.png" id="sellTechImg">
		</div>
  </div>
</div>
