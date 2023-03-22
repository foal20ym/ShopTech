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
      };

      console.log("userEmail from loadAtLaunch()", $user.userEmail);
      console.log("isLoggedIn from loadAtLaunch()", $user.isLoggedIn);
    })
    .then(async function reg() {
      console.log("isUserRegistered email test:", $user.userEmail);
      try {
        const response = await fetch(
          "http://localhost:8080/account/" + $user.userEmail
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
    if (!isRegistered) {
      const account = {
        emailFromUserStore,
        firstName,
        lastName,
      };

      try {
        const response = await fetch("http://localhost:8080/registerFromAuth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(account),
        });

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

<div class="centered-auth-section">
  <h1>Authorization with Google was successful!</h1>
  <h3 id="welcomeNameAfterAuth">Welcome:</h3>
  <img id="welcomeImageAfterAuth" alt="Google_profile_picture" />

  <div>
    <Button class="btn btn-outline-dark mr-2 mt-3 mb-3">
      <Link to="/account" class="nav-link active" aria-current="page"
        >Click here to continue to your account</Link
      >
    </Button>
    {#if !isRegistered}
      <button
        class="btn btn-outline-dark mr-2 mt-3 mb-3"
        on:click={() => registerAuthenticatedUser()}
        >Click here to finish registration</button
      >
    {/if}
  </div>
</div>
