<script>
  import { Link, navigate, Route, Router } from "svelte-routing";
  import { Button } from "sveltestrap";
  import { user } from "../user-store.js";

  let isFetchingUserData = true;
  let failedToFetchUserData;
  let userData = null;


  let address = ""
  let firstName = ""
  let lastName = ""
  let phoneNumber = ""

  async function loadUserData() {
    try {
      const response = await fetch(
        "http://localhost:8080/account/" + $user.userEmail
      );
      console.log("user email from account: ", $user.userEmail);

      switch (response.status) {
        case 200:
          userData = await response.json();
          isFetchingUserData = false;
          address = userData.address;
          firstName = userData.firstName;
          lastName = userData.lastName;
          phoneNumber = userData.phoneNumber;
          break;
      }
    } catch (error) {
      console.log("error:", error);
      isFetchingUserData = false;
      failedToFetchUserData = true;
    }
  }

  loadUserData();

  async function updateAccount() {
    const account = {
      address,
      firstName,
      lastName,
      phoneNumber
    };

    try {
      const response = await fetch(
        "http://localhost:8080/account/update/" + $user.userEmail,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(account),
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
          <form on:submit|preventDefault={updateAccount}>
            <ul class="list-group">
              <li class="list-group-item">
                <div class="form-group">
                  <label for="nameInput" class="fw-bold">First name</label>
                  <input
                    type="text"
                    class="form-control-plaintext"
                    id="nameInput"
                    bind:value={firstName}
                  />
                </div>
              </li>
              <li class="list-group-item">
                <div class="form-group">
                  <label for="locationInput" class="fw-bold">Last name</label>
                  <input
                    type="text"
                    class="form-control-plaintext"
                    id="nameInput"
                    bind:value={lastName}
                  />
                </div>
              </li>
              <li class="list-group-item">
                <div class="form-group">
                  <label for="locationInput" class="fw-bold">Location</label>
                  <input
                    type="text"
                    class="form-control-plaintext"
                    id="locationInput"
                    bind:value={address}
                  />
                </div>
              </li>
              <li class="list-group-item">
                <div class="form-group">
                  <label for="locationInput" class="fw-bold">Phone number</label>
                  <input
                    type="text"
                    class="form-control-plaintext"
                    id="locationInput"
                    bind:value={phoneNumber}
                  />
                </div>
              </li>
              <li class="list-group-item">
                <div class="form-group">
                  <label for="memberSinceInput" class="fw-bold"
                    >Member Since</label
                  >
                  <input
                    type="text"
                    class="form-control-plaintext"
                    id="memberSinceInput"
                    value={userData.createdAt}
                    readonly
                  />
                </div>
              </li>
            </ul>
            <button
              type="submit"
              class="btn btn-outline-dark mr-2 mt-3 mb-3">Save and update</button
            >
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
  <Button id="sellTechButton">
    <Link to="/signup" class="nav-link active" aria-current="page">Sign in</Link
    >
  </Button>
{/if}
