

//Display the product details  in a table
function displayProducts(products) {

    const tbody = document.querySelector("#products-tbl");
    tbody.innerHTML = "";
    let content = "";
    let i = 1;

    console.log("products", products.length);
    if (products.length != 0) {
        for (let p of products) {

            let temp = ` <tr>
        <td>${i}</td>
        <td>${p.name}</td>
        <td>${p.brand_name}</td>
        <td>${p.ram}</td>
        <td>${p.rating}</td>
        <td>${p.price}</td>
        <td><button type="button" onsubmit="newOrder()" id="order-btn1" data-product-id=${p.id}>Order</button>
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

function newOrder() {
    console.log("Order Values")
}

function placeOrder(productId) {
    console.log("placing order", productId);
    // let loggedInUser = JSON.parse(localStorage.getItem("LOGGED_IN_USER"));
    // let userId = loggedInUser.id;
    let orderObj = { productId: productId, qty: 1, userId: 1 };
    console.log(orderObj);
    // const productOrderAPI = new ProductOrderAPI();
    let url = "http://localhost:3000/addOrder";

    axios.post(url, orderObj).then(response => {
        // productOrderAPI.orderProduct(orderObj).then(response => {
        console.log(response.data);
        document.getElementById("errorMessage").innerHTML = response.data;
        // window.location.href = "orders.html";

    }).catch(err => {
        // console.error("Erroro", );   

        document.getElementById("errorMessage").innerHTML = err.response.data.message;
    });
}

// Get the products from the REST API
function loadProducts() {
    // const productSearchAPI = new ProductSearchAPI();
    // let url = "https://shopping-app-rest-api.herokuapp.com/activeproducts";
    let url = "http://localhost:3000/activeproducts";

    axios.get(url).then(response => {
        // console.table(response.data);
        displayProducts(response.data);
    });
}

function filterProducts(filterObj) {

    console.log("filterObj", filterObj);
    // const productSearchAPI = new ProductSearchAPI();
    let url = "http://localhost:3000/searchProducts";

    // productSearchAPI.searchProducts(filterObj).then(response => {
    //     console.table(response);
    //     displayProducts(response);
    // }
    axios.post(url, filterObj).then(response => {
        // console.table(response.data);
        displayProducts(response.data);

    }).catch(err => {
        console.error(err);
    });
}

function searchProducts() {
    let brandNames = [];
    document.getElementsByName("brandNames").forEach(e => {
        if (e.checked) {
            brandNames.push(e.value);
        }
    });

    let filterObj = { brandName: brandNames };
    console.log(filterObj);
    filterProducts(filterObj);
}

document.querySelector("#searchBtn").addEventListener('click', event => {
    event.preventDefault();
    searchProducts();
});



loadProducts();
