const PRODUCT_API = `https://lvcoffee-remastered.onrender.com`;

let product_name = document.querySelector(`#name`);
let price = document.querySelector(`#price`);
let description = document.querySelector(`#description`);
let category = document.querySelector(`#category`);
let image = document.querySelector(`#image`);

function add_new_product(){
    if(product_name.value.trim() && price.value.trim()){
        let new_product = {
            name: product_name.value.trim(),
            price: price.value.trim(),
            description: description.value.trim(),
            category: category.value,
            image: image.files[0].name
        };

        fetch(PRODUCT_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(new_product)
        })
        .then(() => console.log("Saved"));
    }else{
        console.log("No");
    }
}
