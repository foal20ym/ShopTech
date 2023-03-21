<script lang="ts">
    import { Button } from "sveltestrap";
    function signIn(){
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    
    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {'client_id': '201835937760-f6akivk873pvq9cpoptsj9n4r2ktc2hj.apps.googleusercontent.com',
                    'redirect_uri': 'http://127.0.0.1:5173/auth-response',
                    'response_type': 'token',
                    'scope':'https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email',
                    'include_granted_scopes': 'true',
                    'state': 'pass-through value'};
    
    // Add form parameters as hidden input values.
    for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }
    
    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
    }


    //https://accounts.google.com/o/oauth2/v2/auth?client_id=201835937760-f6akivk873pvq9cpoptsj9n4r2ktc2hj.apps.googleusercontent.com&redirect_uri=http://127.0.0.1:5173/auth-response&response_type=code&scope=openid
</script>


<h1>Hi! lets test our luck again.</h1>
<button on:click={() =>signIn()}>Sign In With Google</button>
<!--Button>
    <a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=201835937760-f6akivk873pvq9cpoptsj9n4r2ktc2hj.apps.googleusercontent.com&redirect_uri=http://127.0.0.1:5173/auth-response&response_type=code&scope=openid">Sign in</a>
</Button-->

<!-- "web": {
    "client_id": "201835937760-f6akivk873pvq9cpoptsj9n4r2ktc2hj.apps.googleusercontent.com",
    "project_id": "shoptech-381213",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "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",
    "redirect_uris": ["http://127.0.0.1:5173/auth-response"]
} -->
