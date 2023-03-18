<script>
  import { Router, Link } from "svelte-routing";
  import { onMount } from "svelte";
  let question = "";
  let answer = "";
  let errorMessages = [];

  async function submitForm() {
    const response = await fetch("http://localhost:8080/faq/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, answer }),
    });
    if (response.status == 400 || response.status == 500) {
      errorMessages = await response.json();
    } else if (response.ok) {
      console.log("FAQ created successfully");
      const locationHeader = response.headers.get("Location");
      console.log(locationHeader);
      //const id = data.id
      //console.log(id);
      question = "";
      answer = "";
      if (locationHeader) {
        window.location.href = locationHeader;
      }
    }
  }
</script>

<div class="ms-5">
  <div class="row">
    <div class="col me-5 form-box">
      <h2 class="mt-5">Create FAQ</h2>
      {#if errorMessages.length}
        <ul>
          {#each errorMessages as error}
            <li>{error}</li>
          {/each}
        </ul>
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
            bind:value={question}
            aria-describedby="emailHelp"
            placeholder="Question"
            style="width: 400px;"
          />
          <div class="form-floating mt-3">
            <textarea
              class="form-control"
              id="floatingTextarea2"
              bind:value={answer}
              style="height: 130px; width: 400px"
            />
            <label for="floatingTextarea2">Answer</label>
          </div>
          <button type="submit" class="btn btn-outline-dark mr-2 mt-3 mb-3"
            >Submit</button
          >
        </div>
      </form>
    </div>
  </div>
</div>
