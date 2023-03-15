<script>
  import { Link, navigate, Route, Router } from "svelte-routing";
  import { Button } from "sveltestrap";
  import { user } from "../user-store.js";
  import UpdateAccount from "./UpdateAccount.svelte";

  let isFetchingUserData = true
  let failedToFetchUserData = false
  let userData = null

  async function loadUserData(){
    try{
            const response = await fetch("http://localhost:8080/account/" + $user.userEmail)
            console.log("user email from account: ", $user.userEmail)

            switch(response.status){
                case 200:
                    userData = await response.json()
                    isFetchingUserData = false
                    break;
            }
        }catch(error){
            console.log("error:", error)
            isFetchingUserData = false
            failedToFetchUserData = true
    }
  }

  loadUserData()

  
  let adverts = []

  async function loadUserAdverts(){

    try{
            const response = await fetch("http://localhost:8080/test/" + $user.userEmail)

            switch(response.status){
                case 200:
                    adverts = await response.json()
                    console.log(adverts[0])
                    break;
            }
        }catch(error){
            console.log("error:", error)
    }
  }

  loadUserAdverts()


  async function deleteAccount(){

    try {
            const response = await fetch("http://localhost:8080/account/delete/" + $user.userEmail, {
              method: "DELETE",
              headers: {
                    "Content-Type": "application/json",
                }
            })

            switch(response.status){
                case 200:
                    navigate("/", {
                      replace: false
                    })
                    break;
            }

    }catch(error){
      console.log("error:", error)
    }
  }

</script>

{#if $user.isLoggedIn}

{#if isFetchingUserData}
<p>Wait, i'm fetching data...</p>
{:else if failedToFetchUserData}
<p>Couldn't fetch advert, check your internet connection</p>
{:else if userData}

<div class="container my-5">
    <div class="row">
      <div class="col-lg-4">
        <h3 class="mb-3 fw-bold">My Account</h3>
        <form>
          <ul class="list-group">
            <li class="list-group-item">
              <div class="form-group">
                <label for="nameInput" class="fw-bold">Name</label>
                <input type="text" class="form-control-plaintext" id="nameInput" value="{userData.firstName} {userData.lastName}" readonly>
              </div>
            </li>
            <li class="list-group-item">
              <div class="form-group">
                <label for="emailInput" class="fw-bold">Email</label>
                <input type="email" class="form-control-plaintext" id="emailInput" value="{userData.email}" readonly>
              </div>
            </li>
            <li class="list-group-item">
              <div class="form-group">
                <label for="locationInput" class="fw-bold">Location</label>
                <input type="text" class="form-control-plaintext" id="locationInput" value="{userData.address}" readonly>
              </div>
            </li>
            <li class="list-group-item">
              <div class="form-group">
                <label for="memberSinceInput" class="fw-bold">Member Since</label>
                <input type="text" class="form-control-plaintext" id="memberSinceInput" value="{userData.createdAt}" readonly>
              </div>
            </li>
          </ul>
          <Button id="sellTechButton"> <Link to="/updateAccount" class="nav-link active" aria-current="page">Update account info</Link> </Button>
          <Button class="btn btn-outline-danger mt-3 mb-3" on:click={() => (deleteAccount())}> Delete Account </Button>
        </form>
      </div>
      <div class="col-lg-8">
        <h3 class="mb-3 fw-bold">Listings</h3>

          {#if adverts} 
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
  
            {#each adverts as advert}
            <tbody>
              <tr>
                <td>{advert.title}</td>
                <td>{advert.category}</td>
                <td>${advert.price}</td>
              </tr>
            </tbody>
            {/each}
          </table>
          {:else}
            <p>You have no active adverts</p>
          {/if}
      </div>
    </div>
  </div>
  {:else}
  <p>No advert with the given id {$user.userEmail}.</p>
{/if}
{:else}
  <div>Please Login to see your account.</div>
  <Button id="sellTechButton"> <Link to="/signup" class="nav-link active" aria-current="page">Sign in</Link> </Button>
{/if}

<Route path="updateAccount" component={UpdateAccount}/> 
