<script lang="ts">

    function signIn(){
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    

    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); 
    form.setAttribute('action', oauth2Endpoint);

    var params = {'client_id': '201835937760-f6akivk873pvq9cpoptsj9n4r2ktc2hj.apps.googleusercontent.com',
                    'redirect_uri': 'http://127.0.0.1:5173/auth-response',
                    'response_type': 'token',
                    'scope':'https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email',
                    'include_granted_scopes': 'true',
                    'state': 'pass-through value'};
    

    for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }
    
    document.body.appendChild(form);
    form.submit();
    }

</script>


<h1>Lets try for the 3782346478 time</h1>
<button on:click={() =>signIn()}>Sign In With Google</button>













<!--
        //https://accounts.google.com/o/oauth2/v2/auth?client_id=201835937760-f6akivk873pvq9cpoptsj9n4r2ktc2hj.apps.googleusercontent.com&redirect_uri=http://127.0.0.1:5173/auth-response&response_type=code&scope=openid
-->
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
