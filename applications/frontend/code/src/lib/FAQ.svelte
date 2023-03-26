<script lang="ts">
  import { Link } from "svelte-routing";
  import { DropdownItem, Accordion, AccordionItem } from "sveltestrap";
  import { user } from "../user-store.js";

  const fetchFAQPromise = fetch("http://localhost:8080/api/faq");
</script>

<div class="container text-center">
  <div class="row">
    <div class="col me-5 media-col-left">
      <img
        src="./src/assets/undraw_questions_re_1fy7.svg"
        class="rounded float-start img-fluid"
        alt="./src/assets/undraw_questions_re_1fy7.svg"
      />
    </div>
    <div class="col media-col-right">
      <h1 class="text-start mt-5 media-center">Frequently Asked Questions</h1>
      <div class="text-start">
        {#if $user.isLoggedIn && $user.isAdmin}
          <Link to="/faq/create"
            ><button
              type="button"
              class="btn btn-outline-dark mr-2 mt-3 mb-3 text-start"
              >Create</button
            ></Link
          >
        {/if}
      </div>
      {#await fetchFAQPromise}
        <p>Wait, im loading...</p>
      {:then response}
        {#await response.json() then faqs}
          <hr />
          {#each faqs as faq}
            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <Accordion>
                  <AccordionItem>
                    <h4 class="m-0" slot="header">{faq.question}</h4>

                    <DropdownItem class="text-wrap">{faq.answer}</DropdownItem>
                    {#if $user.isLoggedIn && $user.isAdmin}
                      <Link
                        to="/faq/{faq.id}"
                        class="text-dark"
                        style="text-decoration: underline;">Edit</Link
                      >
                    {/if}
                  </AccordionItem>
                </Accordion>
                <hr />
              </div>
            </div>
          {/each}
        {/await}
      {:catch error}
        <p>{error.message}</p>
        <p>{JSON.stringify(error)}</p>
        <p>Something went wrong, try again later</p>
      {/await}
    </div>
  </div>
</div>
