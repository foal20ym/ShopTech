<script lang="ts">
  import { Link, navigate } from "svelte-routing";
  import { user } from "../user-store";
  export let id;
  let isFetchingFAQ = true;
  let failedToFetchFAQ = false;
  let failedToDeleteFAQ = false;
  let faq = null;

  async function deleteFAQ() {
    const response = await fetch("http://localhost:8080/api/faq/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + $user.accessToken,
      },
    });
    if (response.ok) {
      console.log("FAQ deleted successfully");
      navigate("/faq", {
        replace: false,
      });
    } else {
      console.log("Failed to delete FAQ");
      failedToDeleteFAQ = true;
    }
  }

  async function loadFAQ() {
    try {
      const response = await fetch("http://localhost:8080/api/faq/" + id);
      switch (response.status) {
        case 200:
          faq = await response.json();
          isFetchingFAQ = false;
          break;
      }
    } catch (error) {
      isFetchingFAQ = false;
      failedToFetchFAQ = true;
    }
  }
  loadFAQ();
</script>

<div class="container my-5">
  {#if isFetchingFAQ}
    <p>Wait, i'm fetching data...</p>
  {:else if failedToFetchFAQ}
    <p>Could'nt fetch FAQ, try again later</p>
  {:else if faq}
    <div class="row">
      <div class="col-lg-4">
        <h4>{faq.question}</h4>
        <div>
          {faq.answer}
        </div>
        <div>
          {#if $user.isLoggedIn && $user.isAdmin}
            <Link to="/faq/update/{faq.faqID}"
              ><button type="button" class="btn btn-outline-dark mr-2 mt-3 mb-3"
                >Update</button
              ></Link
            >
            <button
              type="button"
              class="btn btn-outline-danger mt-3 mb-3"
              on:click={deleteFAQ}>Delete</button
            >
          {/if}
          {#if failedToDeleteFAQ}
            <p>Could'nt delete FAQ, try again later</p>
          {/if}
        </div>
      </div>
    </div>
  {:else}
    <p>No FAQ with the given id: {faq.id}</p>
  {/if}
</div>
