<script>
  import { Link } from "svelte-routing";
  import { user } from "../user-store";
  import APIBaseURL from "../config";

  const fetchReviewsPromise = fetch(APIBaseURL + "reviews");
</script>

<div class="container text-center">
  <div class="row">
    <div class="col me-5">
      <h1>Reviews</h1>
      {#if $user.isLoggedIn}
        <Link to="/reviews/create" class="text-dark text-center"
          >Click here to leave a review on the website</Link
        >
      {/if}
      {#await fetchReviewsPromise}
        <p>Wait, im loading...</p>
      {:then response}
        {#await response.json() then reviews}
          <div class="mt-3 text-center">
            <ul>
              {#each reviews as review}
                <hr />
                <h4>Username: {review.username}</h4>
                <p>Stars: {review.stars}/5</p>
                <Link to="/review/{review.reviewID}" class="text-dark"
                  >Click here to read the full review</Link
                >
              {/each}
            </ul>
          </div>
        {/await}
      {:catch error}
        <p>{error.message}</p>
        <p>{JSON.stringify(error)}</p>
        <p>Something went wrong, try again later</p>
      {/await}
    </div>
  </div>
</div>
