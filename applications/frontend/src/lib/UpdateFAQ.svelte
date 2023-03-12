<script>
	import { faqs } from "../data"
	export let id;
	const faq = faqs.find(faq => faq.id == id)
</script>

<div class="ms-5">
  <div class="row">
    <div class="col me-5 form-box">
      <h2 class="mt-5">Update FAQ</h2>
        <form class="input-group" id="register-form">
          <div class="mb-3 mt-2">
						<label for="update-faq-input">Question</label>
            <input
              type="text"
              class="form-control"
              id="update-faq-input"
              aria-describedby="emailHelp"
              value="{faq.question}"
              style="width: 400px;"
            />
             <div class="form-floating mt-3">
							<textarea class="form-control" id="floatingTextarea2" style="height: 130px; width: 400px">{faq.answer}</textarea>
							<label for="floatingTextarea2">Answer</label>
						</div>
            <button type="button" class="btn btn-outline-dark mr-2 mt-3 mb-3">Update</button>
          </div>
           
        </form>
    </div>
  </div>
</div>