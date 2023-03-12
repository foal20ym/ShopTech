<script lang="ts">
    //import { Router, Link, Route } from "svelte-routing";
    import { products } from "../data";
    import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'sveltestrap';
    import { Form, FormGroup, FormText, Input, Label } from 'sveltestrap';

    export let id
    let isfetchingAdvert = true
    let failedTofetchAdvert = false
    let advert = null

    async function loadAdvert(){
        try{
            const response = await fetch("http://localhost:8080/advert/"+id)

            switch(response.status){
                case 200:
                    advert = await response.json()
                    isfetchingAdvert = false
                    break
            }
        }catch(error){
            isfetchingAdvert = false
            failedTofetchAdvert = true
        }
    }
    loadAdvert()


    const product = products.find(product => product.id == id)
    export let comments = [];

    let username = '';
    let text = '';
    function addToCart() {
    // Add the product to the shopping cart
    }

    function submitComment() {
    comments = [...comments, { username, text }];
    username = '';
    text = '';
    }
    
    console.log(window.location.pathname)

</script>


<Container class="product-page">

    {#if isfetchingAdvert}
        <p>Wait, i'm fetching data...</p>
    {:else if failedTofetchAdvert}
        <p>Couldn't fetch advert, check your internet connection</p>
    {:else if advert}

    <h1>{advert.title}</h1>
    <Row>
        <Col sm="12" md="6">
            <!--
            {#each product.images as image}
            <img src="{image}" />
            {/each}
            -->
            <div class="advert-page-img-frame">
                <img
                class="advert-page-img"
                alt="{advert.title}"
                title="MacBook Pro 16&quot; M1 2021"
                src={advert.img_src}
                width="180"
                height="180"
            />
            </div>
        </Col>

        <Col sm="12" md="6">
            <Card class="product-details">
                <CardBody>
                    <CardTitle>{advert.title}</CardTitle>
                    <CardText>{advert.description}kfvjkefjnkkfvjkefjnkkfvjkefjnkkfvjkefjnkkfvjkefjnkkfvjkefjnkfjnkkfvjkefjnkkfvjkefjnkkfvjkefjnk</CardText>
                    <p><b>Price:</b> {advert.price} SEK</p>
                    <!--p><b>Available Colors:</b> {product.colors.join(', ')}</p>
                    <p><b>Sizes:</b> {product.sizes.join(', ')}</p-->
                    <Button on:click={addToCart}>Contact seller</Button>
                </CardBody>
            </Card>
        </Col>
    </Row>
    {:else}
        <p>No advert with the given id {id}.</p>
{/if}

    <Row>
        <Col sm="12" id="comment-section">
            <h2 id="comment-section-title">Comments</h2>
            <hr/>
            {#each comments as comment}
            <div id="comment-section-comment">
                <b>{comment.username}:</b> {comment.text}
            </div>
            {/each}
            <hr/>
            <form on:submit|preventDefault={submitComment}>
                <FormGroup>
                    <Label for="username">Username:</Label>
                    <Input type="text" id="username" bind:value={username} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">Text Area</Label>
                    <Input type="textarea" name="text" id="exampleText" bind:value={text}/>
    
                    <!--Label for="text">Comment:</Label>
                    <textarea id="text" bind:value={text}></textarea-->
                </FormGroup>
                <Button type="submit">Submit</Button>
                </form>    
        </Col>
    </Row>

    
</Container>





