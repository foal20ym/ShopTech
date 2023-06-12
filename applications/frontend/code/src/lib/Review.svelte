<script>
  import { Link, navigate } from "svelte-routing";
  import { user } from "../user-store.js";
  import APIBaseURL from "../config.js";
  export let id;
  let isFetchingReview = true;
  let failedToFetchReview = false;
  let failedToDeleteReview = false;
  let review = null;

  async function deleteReview() {
    const response = await fetch(APIBaseURL + "reviews/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + $user.accessToken,
      },
    });
    if (response.ok) {
      navigate("/reviews", {
        replace: false,
      });
    } else {
      console.log("Failed to delete review");
      failedToDeleteReview = true;
    }
  }

  async function loadReview() {
    try {
      const response = await fetch(APIBaseURL + "reviews/" + id);
      switch (response.status) {
        case 200:
          review = await response.json();
          isFetchingReview = false;
          break;
      }
    } catch (error) {
      isFetchingReview = false;
      failedToFetchReview = true;
    }
  }
  loadReview();
</script>

<div class="container text-center">
  <div class="row">
    <div class="col me-5">
      <h1>Review</h1>
      {#if isFetchingReview}
        <p>Wait, I'm fetching data...</p>
      {:else if failedToFetchReview}
        <p>Could'nt fetch review, try again later...</p>
      {:else if review}
        <div class="mt-3 text-center">
          <ul>
            <hr />
            <h4>Username: {review.username}</h4>
            <p class="text-wrap">
              <strong>Description: </strong>{review.description}
            </p>
            <p><strong>Stars: </strong> {review.stars}/5</p>
            {#if $user.isLoggedIn && $user.isAdmin}
              <Link to="/review/update/{review.reviewID}"
                ><button
                  type="button"
                  class="btn btn-outline-dark mr-2 mt-3 mb-3">Update</button
                ></Link
              >
              <button
                type="button"
                class="btn btn-outline-danger mt-3 mb-3"
                on:click={deleteReview}>Delete</button
              >
            {/if}
            {#if failedToDeleteReview}
              <p>Could'nt delete review, try again later</p>
            {/if}
            <hr />
          </ul>
        </div>
      {:else}
        <p>No review with the given id: {review.reviewID}</p>
      {/if}
    </div>
  </div>
</div>
