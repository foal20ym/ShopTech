<script>
import { Link } from "svelte-routing";

const fetchReviewsPromise = fetch("http://localhost:8080/reviews")
</script>

<div class="container text-center">
  <div class="row">
    <div class="col me-5">
			<h1>Reviews</h1>
			<Link to="/reviews/create" class="text-dark text-center">Click here to leave a review on the website</Link>
			{#await fetchReviewsPromise}
        <p>Wait, im loading...</p>
      {:then response}
      
      {#await response.json() then reviews}
			<div class="mt-3 text-center">
				<ul>
					{#each reviews as review}
						<hr>
						<h4>{review.username}</h4>
						<p>Stars: {review.stars}/5</p>
						<Link to="/review/{review.id}" class="text-dark">Click here to read the full review</Link>
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