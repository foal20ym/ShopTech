<script>
  import { Link } from "svelte-routing";
</script>

<!--SEN NÄR VI HAR USER FÅR VI ERSÄTTA INFORMATION MED USER INFO-->

<div class="container my-5">
    <div class="row">
      <div class="col-lg-4">
        <h3 class="mb-3 fw-bold">My Account</h3>
        <form>
          <ul class="list-group">
            <li class="list-group-item">
              <div class="form-group">
                <label for="nameInput" class="fw-bold">Name</label>
                <input type="text" class="form-control-plaintext" id="nameInput" value="John Doe" readonly>
              </div>
            </li>
            <li class="list-group-item">
              <div class="form-group">
                <label for="emailInput" class="fw-bold">Email</label>
                <input type="email" class="form-control-plaintext" id="emailInput" value="john.doe@example.com" readonly>
              </div>
            </li>
            <li class="list-group-item">
              <div class="form-group">
                <label for="locationInput" class="fw-bold">Location</label>
                <input type="text" class="form-control-plaintext" id="locationInput" value="New York, NY" readonly>
              </div>
            </li>
            <li class="list-group-item">
              <div class="form-group">
                <label for="memberSinceInput" class="fw-bold">Member Since</label>
                <input type="text" class="form-control-plaintext" id="memberSinceInput" value="January 1, 2020" readonly>
              </div>
            </li>
          </ul>
          <button type="button" class="btn btn-outline-dark mr-2 mt-3 mb-3">Update</button>
          <button type="button" class="btn btn-outline-danger mt-3 mb-3">Delete Account</button>
        </form>
      </div>
      <div class="col-lg-8">
        <h3 class="mb-3 fw-bold">Listings</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
						<tr>
              <td>Apple iPhone XR</td>
              <td>Electronics</td>
              <td>$499</td>
            </tr>
            <tr>
              <td>Lenovo ThinkPad X1 Carbon</td>
              <td>Computers</td>
              <td>$1,299</td>
            </tr>
            <tr>
              <td>Sony Alpha a7 III</td>
              <td>Cameras</td>
              <td>$1,999</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

