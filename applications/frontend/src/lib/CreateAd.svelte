<script lang="ts">
    import { Router, Link, Route } from "svelte-routing";
    import Home from "../lib/Home.svelte"; // ersätt senare med lämplig länk
    import { Container,Image,Col,Row, Button } from 'sveltestrap';
    import { Form, FormGroup, FormText, Input, Label } from 'sveltestrap';


    //let showRAMForm = false;
    let selectedCategory = '';
    function handleSelect(event) {
        selectedCategory = event.target.value;
    }

    let category = ""
    let title = ""
    let price = ""
    let description = ""
    let img_src = ""
    let x = ""
    let errorCodes = []
    let advertWasCreated = false

    async function createAdvert(){

        const advert = {
            category,
            title, 
            price, 
            description,
            img_src
        }

        try {

            const response = await fetch("http://localhost:8080/createad", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(advert)
            })

            switch(response.status){
                case 201:
                    advertWasCreated = true
                break 

                case 400:
                    errorCodes = await response.json()
                break; 

            }

        } catch(error) {
            errorCodes.push("COMMUNICATION_ERROR")
            errorCodes = errorCodes
        }

    }

</script>

{#if advertWasCreated}
    <p>Advert was created!</p>
{:else} 
    <div id="CreateAd">
        <Container>
            <Row cols={2}>
                <Row>
                    <Col id="CreateAdSpecifications" sm={{offset:1}}>
                        <form on:submit|preventDefault={createAdvert}>
                            <FormGroup class="CreateAdForm">
                                <Label for="exampleSelect">Select Category:</Label>
                                <Input type="select" name="select" id="exampleSelect" on:change={handleSelect} bind:value={category}>
                                    <option>iPhone</option>
                                    <option>iPad</option>
                                    <option>MacBook</option>
                                    <option>iMac</option>
                                </Input>
                                
                            </FormGroup>

                            <FormGroup class="CreateAdForm">
                                <Label for="exampleSelect">Title:</Label>
                                <Input
                                    type="text"
                                    name="search"
                                    id="exampleSearch"
                                    placeholder="ex: iPhone 13 Pro"
                                    bind:value={title}
                                />
                            </FormGroup>
                            
                            <FormGroup class="CreateAdForm">
                                <Label for="exampleSelect">Description:</Label>
                                <Input
                                    type="text"
                                    name="search"
                                    id="exampleSearch"
                                    placeholder="ex: The iPhone is in very good condition..."
                                    bind:value={description}
                                />
                            </FormGroup>

                            <FormGroup class="CreateAdForm">
                                <Label for="exampleSelect">Price:</Label>
                                <Input
                                    type="text"
                                    bind:value={price}
                                    name="search"
                                    id="exampleSearch"
                                    placeholder="ex: $899"
                                />
                            </FormGroup>

                            <!--FormGroup class="CreateAdForm">
                                <Label for="exampleSelect">Select memory size:</Label>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>8TB</option>
                                    <option>4TB</option>
                                    <option>2GB</option>
                                    <option>1TB</option>
                                    <option>512GB</option>
                                    <option>256GB</option>
                                    <option>128GB</option>
                                    <option>64GB</option>
                                    <option>32GB</option>
                                    <option>16GB</option>
                                </Input>
                            </FormGroup-->

                            {#if selectedCategory == 'MacBook' || selectedCategory == 'iMac'}
                                <FormGroup class="CreateAdForm" id="showRAMform">
                                    <Label for="exampleSelect">Select RAM:</Label>
                                    <Input type="select" name="select" id="exampleSelect">
                                        <option>128GB</option>
                                        <option>64GB</option>
                                        <option>32GB</option>
                                        <option>16GB</option>
                                    </Input>
                                </FormGroup>
                            {/if}

                            <FormGroup>
                                <Label for="exampleFile">Upload picture</Label>
                                <Input type="file" name="file" bind:value={img_src}/>
                                <FormText color="muted">
                                    Please choose at least one clear picture of your device. 
                                    If no clear picture is submitted we reserve the right to
                                    reject the ad.
                                </FormText>
                            </FormGroup>

                            <Col sm={{offset:2}}>
                                <Button type="submit" id="CreateAdButton" value="Create ad"> Create Ad <!--Link to="#" class="nav-link active" aria-current="page">Submit ad</Link--> </Button>
                            </Col>
                            <!--input type="submit" value="Create ad"--> 
                        </form>
                    
                    </Col>
                </Row>
                <Col> 
                    <div id="CreateAdPictureAndText">
                    <p>Sell your old tech to us and get a fair price. </p> 
                    <p> We guarantee that we can offer the highest price. </p>
                    <p>If you were to find a better price, we’ll match it. </p>
                    </div>
                    <Col>
                        <img src="./appleProductsStockPhoto.png" alt="./appleProductsStockPhoto.png" id="CreateAdImg"> 
                    </Col>
                </Col>
            </Row>
        </Container>
    </div>

    {#if 0 < errorCodes.length}
        <p>the following errors occured:</p>

        <ul>
            {#each errorCodes as errorCode}
                <li>{errorCode}</li>
            {/each}
        </ul>
    {/if}

{/if}


<!--Button id="sellTechButton"> <Link to="/home" class="nav-link active" aria-current="page">Home</Link> </Button-->
<!-- ersätt senare med lämplig länk -->
<Route path="/home" component={Home}/>
<!-- ersätt senare med lämplig länk -->
