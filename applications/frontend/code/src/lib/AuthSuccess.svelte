<script lang="ts">
  import { Button } from "sveltestrap";
  import { Link } from "svelte-routing";
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
  //window.history.pushState({}, document.title, "/" + "auth-response");
  let info = JSON.parse(localStorage.getItem("authInfo"));
  console.log(info["access_token"]);
  console.log(info["expires_in"]);
  let subFromInfo = "";
  let emailFromInfo = "";
  let firstName = "";
  let lastName = "";
  let accountWasCreated = false;
  let errorCodes = [];

  fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${info["access_token"]}`,
    },
  })
    .then((data) => data.json())
    .then(async (info) => {
      console.log(info);
      subFromInfo = info.sub;
      emailFromInfo = info.email;
      firstName = info.given_name;
      lastName = info.family_name;
      document.getElementById("welcomeNameAfterAuth").innerHTML += info.name;
      document
        .getElementById("welcomeImageAfterAuth")
        .setAttribute("src", info.picture);

      const exists = await checkUserExists(emailFromInfo);

      if (!exists) {
        // Register the user in the database
        await registerUserAfterAuth();
      }

      $user = {
        isLoggedIn: true,
        accessToken: subFromInfo,
        userEmail: emailFromInfo,
      };
    });

  async function checkUserExists(emailFromInfo) {
    const response = await fetch("/checkIfUserExists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailFromInfo,
      }),
    });

    const result = await response.json();
    console.log(result);

    return result.exists;
  }

  async function registerUserAfterAuth() {
    const account = {
      emailFromInfo,
      firstName,
      lastName,
    };

    try {
      const response = await fetch("/registerFromAuth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(account),
      });

      switch (response.status) {
        case 201:
          accountWasCreated = true;
          break;

        case 400:
          errorCodes = await response.json();
          errorCodes.push("BIG ERROR");
          break;
      }
    } catch (error) {
      errorCodes.push("COMMUNICATION_ERROR");
      errorCodes = errorCodes;
    }
  }
</script>

<div class="centered-auth-section">
  <h1>Authorization with Google was successful!</h1>
  <h3 id="welcomeNameAfterAuth">Welcome:</h3>
  <img id="welcomeImageAfterAuth" />
  <div>
    <Button class="btn btn-outline-dark mr-2 mt-3 mb-3">
      <Link to="/account" class="nav-link active" aria-current="page"
        >Click here to continue to your account</Link
      >
    </Button>
  </div>
</div>

<!--div id="welcomeNameAfterAuth">
    Hello
</div>
<dir>
    {d}
</dir-->

<!--h1>{info['access_token']}</h1-->
