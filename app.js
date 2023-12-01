const chocolates = [
    { name: 'Gourmet Chocolate', price: 150,  image: 'https://shilpaahuja.com/wp-content/uploads/2018/01/gourmet-chocolates-artisan-truffles-bars-best-brands.jpg' },
    { name: 'Carra Chocolate', price: 250,  image: 'https://images.jdmagicbox.com/rep/b2b/chocolate-flavour/chocolate-flavour-12.jpg' },
    { name: 'Belgium Chocolate', price: 300,  image: 'https://afar.brightspotcdn.com/dims4/default/4c68fb8/2147483647/strip/true/crop/942x471+0+79/resize/1440x720!/quality/90/?url=https%3A%2F%2Fafar-media-production-web.s3.us-west-2.amazonaws.com%2Fbrightspot%2Fe9%2Ff2%2F5cb0ef3702e66126f219595fe7e0%2Foriginal-choc2.jpg' },
    { name: 'European Chocolate', price: 350,  image: 'https://img.freepik.com/premium-photo/box-chocolate-bonbons-decadent-delights_841543-26283.jpg' },
    { name: 'Ferrero Chocolate', price: 550,  image: 'https://www.snackhistory.com/wp-content/uploads/2022/04/Ferrero-Rocher-History-Marketing-Commericals-Facts.jpg' },
    // Add more chocolates as needed
];

let bundle = [];
let totalPrice = 0;

const chocolatesDiv = document.getElementById('chocolates');
chocolates.forEach((chocolate, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    const image = document.createElement('div');
    image.className = 'product-image';
    image.style.background = `url('${chocolate.image}') no-repeat center center / cover`;
    card.appendChild(image);
    const title = document.createElement('h5');
    title.textContent = chocolate.name;
    card.appendChild(title);
    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = chocolate.description;
    card.appendChild(description);
    const price = document.createElement('p');
    price.textContent = `$${chocolate.price}`;
    card.appendChild(price);
    const button = document.createElement('button');
    button.className = 'btn-primary';
    button.textContent = 'Add to Cart';
    button.addEventListener('click', () => {
        if (bundle.length < 8) {
            const totalQuantity = bundle.reduce((acc, curr) => acc + curr.quantity, 0);
            if (totalQuantity + 1 <= 8) {
                const existingChocolate = bundle.find(item => item.name === chocolate.name);
                if (existingChocolate) {
                    existingChocolate.quantity++;
                } else {
                    chocolate.quantity = 1;
                    bundle.push(chocolate);
                }
                totalPrice += chocolate.price;
                updateBundleDisplay();
            } else {
                alert('Total quantity of chocolates in the cart cannot exceed 8.');
            }
        } else {
            alert('You cannot add more than 8 items to the cart.');
        }
    });
    card.appendChild(button);
    chocolatesDiv.appendChild(card);
});

function updateBundleDisplay() {
    const bundleDiv = document.getElementById('bundle');
    bundleDiv.textContent = '';
    bundle.forEach((chocolate, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        const title = document.createElement('h5');
        title.textContent = chocolate.name;
        card.appendChild(title);
        const price = document.createElement('p');
        price.textContent = `$${chocolate.price} x ${chocolate.quantity}`;
        card.appendChild(price);
        const button = document.createElement('button');
        button.className = 'btn-danger';
        button.textContent = 'Remove from Cart';
        button.addEventListener('click', () => {
            if (chocolate.quantity > 1) {
                chocolate.quantity--;
            } else {
                bundle.splice(index, 1);
            }
            totalPrice -= chocolate.price;
            updateBundleDisplay();
        });
        card.appendChild(button);
        const count = document.createElement('p');
        count.className = 'count';
        count.textContent = `Total: $${chocolate.price * chocolate.quantity}`;
        card.appendChild(count);
        bundleDiv.appendChild(card);
    });
    const totalPriceDiv = document.getElementById('totalAmount');
    totalPriceDiv.textContent = `$${totalPrice}`;
}
