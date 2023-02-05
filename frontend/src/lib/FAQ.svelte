<script lang="ts">
	import {faqs} from "../data"
	import {
    Nav,
    NavItem,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    NavLink,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Col,
    Row,
    Container,
    Accordion,
    AccordionItem,
  } from "sveltestrap";
</script>

<div class="container text-center">
  <div class="row">
    <div class="col me-5 media-col-left">
      <img src="./src/assets/undraw_questions_re_1fy7.svg" class="rounded float-start img-fluid">
    </div>
    <div class="col media-col-right">
			<h1 class="text-start mt-5 media-center">Frequently Asked Questions</h1>
			<hr>
			
			{#each faqs as faq}
			<div class="accordion accordion-flush" id="accordionFlushExample">
				<div class="accordion-item">
				<Accordion>
				<AccordionItem>
					<h4 class="m-0" slot="header">{faq.question}</h4>
					<DropdownItem class="text-wrap">{faq.answer}</DropdownItem>
				</AccordionItem>
			</Accordion>
			<hr>
				</div>
			</div>
			<!--<div class="accordion accordion-flush" id="accordionFlushExample">
				<div class="accordion-item">
					<h2 class="accordion-header" id="flush-headingOne">
						<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
							{faq.question}
						</button>
					</h2>
					<div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
						<div class="accordion-body">{faq.answer}</div>
					</div>
				</div>
			</div>-->
			{/each}
    </div>
  </div>
</div>