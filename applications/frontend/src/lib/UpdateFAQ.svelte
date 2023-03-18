<script>
  export let id;
  let faq = null;
  let updatedQuestion = "";
  let updatedAnswer = "";
  let failedToFetchFAQ = false;
  let errorMessages = [];

  async function loadFAQ() {
    try {
      const response = await fetch("http://localhost:8080/faq/" + id);
      switch (response.status) {
        case 200:
          faq = await response.json();
          updatedQuestion = faq.question;
          updatedAnswer = faq.answer;
          break;
      }
    } catch (error) {
      failedToFetchFAQ = true;
    }
  }

  loadFAQ();

  async function submitForm() {
    const response = await fetch("http://localhost:8080/faq/update/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updatedQuestion, updatedAnswer }),
    });
    if (response.status == 400 || response.status == 500) {
      errorMessages = await response.json();
    } else if (response.ok) {
      updatedQuestion = "";
      updatedAnswer = "";
      window.location.href = "/faq/" + id;
    }
  }
</script>

<div class="ms-5">
  {#if failedToFetchFAQ}
    <p>Internal server error</p>
  {:else}
    <div class="row">
      <div class="col me-5 form-box">
        <h2 class="mt-5">Update FAQ</h2>
        {#if errorMessages.length}
          {#each errorMessages as error}
            <ul>
              <li>{error}</li>
            </ul>
          {/each}
        {/if}
        <form
          class="input-group"
          id="register-form"
          on:submit|preventDefault={submitForm}
        >
          <div class="mb-3 mt-2">
            <label for="update-faq-input">Question</label>
            <input
              type="text"
              class="form-control"
              id="update-faq-input"
              bind:value={updatedQuestion}
              aria-describedby="emailHelp"
              style="width: 400px;"
            />
            <div class="form-floating mt-3">
              <textarea
                class="form-control"
                id="floatingTextarea2"
                bind:value={updatedAnswer}
                style="height: 130px; width: 400px"
              />
              <label for="floatingTextarea2">Answer</label>
            </div>
            <button type="submit" class="btn btn-outline-dark mr-2 mt-3 mb-3"
              >Update</button
            >
          </div>
        </form>
      </div>
    </div>
  {/if}
</div>
