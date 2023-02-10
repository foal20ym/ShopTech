
<script lang="ts">
    import { Router, Link, Route } from "svelte-routing";
    import { products } from "../data";

    export let id
    const product = products.find(product => product.id == id)
    
    console.log(window.location.pathname)
</script>

<div>
    <p>{product.description}, {product.id}</p>
</div>
<div>
    <p>{product.description}, {product.id}</p>
</div>
<div>
    <p>{product.description}, {product.id}</p>
</div>



