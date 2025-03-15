// Check if user is logged in
function addToCart(product) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        Swal.fire({
            icon: 'warning',
            title: 'Login Required',
            text: 'Please login to add items to the cart!',
            confirmButtonText: 'OK'
        });
        return;
    }

    // Check if product is valid
    if (!product || typeof product !== 'object' || !product.id || !product.name) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Invalid product data!',
            confirmButtonText: 'OK'
        });
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product is already in cart
    let existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        Swal.fire({
            icon: 'info',
            title: 'Already in Cart',
            text: `${product.name} is already added to your cart.`,
            confirmButtonText: 'OK'
        });
        return;
    }

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: `${product.name} has been added to your cart.`,
        confirmButtonText: 'OK'
    });
}

// Prevent access to cart page without login
document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user && window.location.pathname.includes("cart.html")) {
        Swal.fire({
            icon: 'error',
            title: 'Access Denied',
            text: 'You need to login first!',
            confirmButtonText: 'OK'
        }).then(() => {
            window.location.href = "login.html";
        });
    }
});
