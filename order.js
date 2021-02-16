function loadProducts() {
    // const productSearchAPI = new ProductSearchAPI();
    // let url = "https://shopping-app-rest-api.herokuapp.com/activeproducts";

    // let loggedInUser = JSON.parse(localStorage.getItem("LOGGED_IN_USER"));
    // let userId = loggedInUser.id;
    let userId = 1;
    let url = "http://localhost:3000/myorders";

    axios.post(url, { userId }).then(response => {
        console.table(response.data);
        displayProducts(response.data);
    });
}




//Display the product details  in a table
function displayProducts(products) {

    const tbody = document.querySelector("#order-tbl");
    tbody.innerHTML = "";
    let content = "";
    let i = 1;

    console.log("products", products.length);
    if (products.length != 0) {
        for (let p of products) {

            let temp = ` <tr>
        <td>${i}</td>
        <td>${p.user_id}</td>
        <td>${p.product_id}</td>
        <td>${p.qty}</td>
        <td>${p.total_amount}</td>
        <td>${p.status}</td>
        
        <td><button type="button" onsubmit="newOrder()" id="order-btn1" data-product-id=${p.id}>Cancel</button>
    </tr>`;

            content += temp;
            i++;
        }
    }
    else {
        content = "No Records Found"
    }
    // console.log(content);
    tbody.innerHTML = content;

    //Assign Listeners
    document.querySelectorAll("#order-btn1").forEach(element => {
        let productId = parseInt(element.getAttribute("data-product-id"));
        console.log(productId);
        element.addEventListener('click', e => {
            placeOrder(productId);
        });
    });

}

loadProducts();