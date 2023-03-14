<script lang="ts">
  import { Router, Link, Route, navigate } from "svelte-routing";
  import { user } from "../user-store.js";
  import CreateAd from "../lib/CreateAd.svelte";
  import Account from "./Account.svelte";

  import { 
      Container,
      Image,
      Col,
      Row, 
      Button,
  } from 'sveltestrap';


    let email = ""
    let firstName = ""
    let lastName = ""
    let phoneNumber = "112"
    let createdAt = Date.now()

    let errorCodes = []

    async function signUp(){

    const account = {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        createdAt
    }

    try {

        const response = await fetch("http://localhost:8080/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+$user.accessToken
            },
            body: JSON.stringify(account)
        })

        switch(response.status){
            case 201:
                
            break 

            case 400:
                errorCodes = await response.json()
            break; 

        }

    } catch(error) {
        errorCodes.push("COMMUNICATION_ERROR")
        errorCodes = errorCodes
    }

}


    let showLogin = true;
    let username = ""
    let password = ""

    async function login(){

      const response = await fetch("http://localhost:8080/tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": "Bearer "+$user.accessToken,
        },
        body: `grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
      })

      const body = await response.json()

      const accessToken = body.access_token

      $user = {
        isLoggedIn: true,
        accessToken
      }

      navigate("/account", {
        replace: false
      })

    }

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
        <form class="input-group" id="login-form" on:submit|preventDefault={login}>
          <div class="mb-3 mt-2">
            <input
              type="username"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Username"
              style="width: 400px;"
              bind:value={username}
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              style="width: 400px;"
              bind:value={password}
            />
          </div>
					<div class="signUpPageButton">
            <Button type="submit" id="CreateAdButton" value="Login"> Login  </Button>
					</div>
        </form>
      {:else}
        <form class="input-group" id="register-form" on:submit|preventDefault={signUp}>
          <div class="mb-3 mt-2">
            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Username"
                style="width: 400px;"
                bind:value={username}
              />
            </div>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              placeholder="First name"
              style="width: 400px;"
              bind:value={firstName}
            />
          </div>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Last name"
              style="width: 400px;"
              bind:value={lastName}
            />
          </div>
          <div class="mb-3">
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              style="width: 400px;"
              bind:value={email}
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              style="width: 400px;"
              bind:value={password}
            />
          </div>
					<div class="signUpPageButton">
            <Button type="submit" id="CreateAdButton" value="Signup"> Sign up  </Button>
					</div>
        </form>
      {/if}
    </div>
    <div class="col col-media-hide mt-5">
			<img src="/appleProductsStockPhoto.png" alt="/appleProductsStockPhoto.png" id="sellTechImg">
		</div>
  </div>
</div>