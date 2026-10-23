const PRODUCT_API = `https://lvcoffee-remastered.onrender.com/`;

// ---------- shared ----------
function go_to_product(id){
    window.location.href = `product.html?id=${id}`;
}

// ---------- listing page (menu.html) ----------
function render_product(API){
    let product_lists = document.querySelectorAll(`.product-list`);

    fetch(API)
    .then((respond) => respond.json())
    .then((db) => {
        product_lists.forEach(list => {
            let category = list.dataset.category;
            let items = category === "all"
                ? db.slice(-4).reverse()
                : db.filter(p => p.category === category);

            list.innerHTML = "";

            if(items.length > 0){
                items.forEach(product => {
                    list.innerHTML += `
                    <div class="product-list-item" onclick="go_to_product('${product.id}')">
                        <div class="product-list-item-img-wrap">
                            <img class="product-list-item-img" src="product_img/${product.image}" alt="${product.name}">
                        </div>
                        <div class="product-list-item-info">
                            <h3 class="product-list-item-name">${product.name}</h3>
                            <p class="product-list-item-price">$${product.price}</p>
                        </div>
                    </div>`;
                });
            }else{
                list.innerHTML = "<p>No products found.</p>";
            }
        });
    });
}

// ---------- detail page (product.html) ----------
function render_detail(){
    let detail = document.querySelector(`.detail`);
    let id = new URLSearchParams(window.location.search).get("id");

    fetch(`${PRODUCT_API}/${id}`)
    .then((respond) => {
        if (!respond.ok) throw new Error("Not found");
        return respond.json();
    })
    .then((info) => {
        detail.innerHTML = `
        <div class="detail-img-wrap">
            <img class="detail-img" src="product_img/${info.image}" alt="${info.name}">
        </div>
        <div class="detail-info">
            <span class="detail-category">${info.category}</span>
            <h2 class="detail-name">${info.name}</h2>
            <p class="detail-price">$${info.price}</p>
            <p class="detail-desc">${info.description}</p>
            <div class="detail-actions">
                <button class="btn-cart">Add To Cart</button>
                <button class="btn-buy">Buy Now</button>
            </div>
        </div>`;
    })
    .catch(() => {
        detail.innerHTML = "<p>Product not found.</p>";
    });
}

if (document.querySelector(`.product-list`)) {
    render_product(PRODUCT_API);
}

if (document.querySelector(`.detail`)) {
    render_detail();
}
