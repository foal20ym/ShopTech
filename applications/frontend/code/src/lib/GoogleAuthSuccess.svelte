<script lang="ts">
  import { Button } from "sveltestrap";
  import { Link, navigate } from "svelte-routing";
  import { user } from "../user-store";

  var params = {};
  var regex = /([^&=]+)=([^&]*)/g,
    m;

  while ((m = regex.exec(location.href))) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  if (Object.keys(params).length > 0) {
    localStorage.setItem("authInfo", JSON.stringify(params));
  }
  window.history.pushState({}, document.title, "/" + "auth-response");

  let info = JSON.parse(localStorage.getItem("authInfo"));
  console.log(info["access_token"]);
  console.log(info["expires_in"]);
  let subFromInfo = "";
  let emailFromInfo = "";
  let firstName = "";
  let lastName = "";
  let accountWasCreated = false;
  let errorCodes = [];
  let isRegistered = true;
  let userData = null;

  fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${info["access_token"]}`,
    },
  })
    .then((data) => data.json())
    .then(async (info) => {
      //console.log(info);
      subFromInfo = info.sub;
      emailFromInfo = info.email;
      firstName = info.given_name;
      lastName = info.family_name;
      document.getElementById("welcomeNameAfterAuth").innerHTML += info.name;
      document
        .getElementById("welcomeImageAfterAuth")
        .setAttribute("src", info.picture);

      $user = {
        isLoggedIn: true,
        accessToken: subFromInfo,
        userEmail: emailFromInfo,
        isAdmin: false,
      };

      console.log("userEmail from loadAtLaunch()", $user.userEmail);
      console.log("isLoggedIn from loadAtLaunch()", $user.isLoggedIn);
    })
    .then(async function reg() {
      console.log("isUserRegistered email test:", $user.userEmail);
      try {
        const response = await fetch(
          "http://localhost:8080/api/accounts/" + $user.userEmail
        );
        console.log("userEmail from isUserRegistered()", $user.userEmail);

        switch (response.status) {
          case 200:
            userData = await response.json();
            break;
        }
      } catch (error) {
        console.log("error:", error);
      }
      //If user does not exist, userData is null
      if (userData == null) {
        isRegistered = false;
      }
      console.log("userData:", userData);
      console.log("isUserRegistred: ", isRegistered);
    });

  async function registerAuthenticatedUser() {
    console.log("User.email from register", $user.userEmail);
    console.log("User.isLoggedIn from register", $user.isLoggedIn);
    const emailFromUserStore = $user.userEmail;
    console.log(emailFromUserStore);
    if (!isRegistered) {
      const account = {
        emailFromUserStore,
        firstName,
        lastName,
      };

      try {
        const response = await fetch(
          "http://localhost:8080/api/accounts/registerFromAuth",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(account),
          }
        );

        switch (response.status) {
          case 201:
            accountWasCreated = true;
            navigate("/account", {
              replace: false,
            });
            break;

          case 400:
            errorCodes = await response.json();
            errorCodes.push("Errorcode: 400");
            break;
        }
      } catch (error) {
        errorCodes.push("COMMUNICATION_ERROR");
        errorCodes = errorCodes;
      }
    } else {
      console.log("Google user is already registered! (Error)");
    }
  }
</script>

<div class="container">
  <div class="row justify-content-center mt-5">
    <div class="col-md-8">
      <div class="card border-0 shadow-sm">
        <div class="card-body text-center">
          <h1 class="mb-4">Authorization with Google was successful!</h1>
          <img id="welcomeImageAfterAuth" alt="Google_profile_picture" />
          <h3 id="welcomeNameAfterAuth">Welcome:</h3>
          <div class="d-flex justify-content-center">
            <Button class="btn btn-dark mr-2 mb-3">
              <Link to="/account" class="nav-link active" aria-current="page">
                Continue to Your Account
              </Link>
            </Button>
            {#if !isRegistered}
              <button
                class="btn btn-outline-dark mb-3"
                on:click={() => registerAuthenticatedUser()}
              >
                Click here to Finish Registration
              </button>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
