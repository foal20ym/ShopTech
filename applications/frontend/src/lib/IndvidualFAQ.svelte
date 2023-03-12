<script lang="ts">
	import { Link } from "svelte-routing"
	import { faqs } from "../data"
	export let id;
	const faq = faqs.find(faq => faq.id == id);
</script>

<div class="container my-5">
	<div class="row">
		<div class="col-lg-4">
			<h4>{faq.question}</h4>
			<div>
				{faq.answer}
			</div>
			<div>
				<Link to="/faq/update/{faq.id}"><button type="button" class="btn btn-outline-dark mr-2 mt-3 mb-3">Update</button></Link>
        <button type="button" class="btn btn-outline-danger mt-3 mb-3">Delete</button>
			</div>
		</div>
	</div>
</div>