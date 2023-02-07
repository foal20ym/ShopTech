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

</script>

<div id="CreateAd">
    <Container>
        <Row cols={2}>
            <Row>
                <Col id="CreateAdSpecifications" sm={{offset:1}}>
                    <Form>
                        <FormGroup class="CreateAdForm">
                            <Label for="exampleSelect">Select Category:</Label>
                            <Input type="select" name="select" id="exampleSelect" on:change={handleSelect}>
                                <option>iPhone</option>
                                <option>iPad</option>
                                <option>MacBook</option>
                                <option>iMac</option>
                            </Input>
                            
                        </FormGroup>

                        <FormGroup class="CreateAdForm">
                            <Label for="exampleSelect">Model:</Label>
                            <Input
                                type="text"
                                name="search"
                                id="exampleSearch"
                                placeholder="ex: iPhone 13 Pro"
                            />
                        </FormGroup>
                        
                        <FormGroup class="CreateAdForm">
                            <Label for="exampleSelect">Year:</Label>
                            <Input
                                type="text"
                                name="search"
                                id="exampleSearch"
                                placeholder="ex: 2018"
                            />
                        </FormGroup>

                        <FormGroup class="CreateAdForm">
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
                        </FormGroup>

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
                            <Input type="file" name="file" id="exampleFile" />
                            <FormText color="muted">
                                Please choose at least one clear picture of your device. 
                                If no clear picture is submitted we reserve the right to
                                reject the ad.
                            </FormText>
                        </FormGroup>
                    </Form>
                    <Col sm={{offset:2}}>
                    <Button id="CreateAdButton"> <Link to="#" class="nav-link active" aria-current="page">Submit ad</Link> </Button>
                    <!-- ersätt med login/register sidan senare -->
                    </Col>
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




<!--Button id="sellTechButton"> <Link to="/home" class="nav-link active" aria-current="page">Home</Link> </Button-->
<!-- ersätt senare med lämplig länk -->
<Route path="/home" component={Home}/>
<!-- ersätt senare med lämplig länk -->
