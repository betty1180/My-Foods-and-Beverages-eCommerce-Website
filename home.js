// Scroll-to-top button
let mybutton = document.getElementById("myBtn");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
function topFunction(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Navbar toggle
const menuIcon = document.getElementById("menu-icon");
const navMenu = document.querySelector(".navmenu");

menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

// Optional: close menu when clicking a link (nice UX)
document.querySelectorAll(".navmenu a").forEach(link => {
    link.addEventListener("click", () => {
        if(navMenu.classList.contains("open")) {
            navMenu.classList.remove("open");
        }
    });
});


// Heart icon toggle
let hearts = document.querySelectorAll(".heart-icon i");
hearts.forEach(heart => {
    heart.addEventListener("click", ()=> {
        heart.classList.toggle("bxs-heart");
        heart.classList.toggle("bx-heart");
        heart.style.color = heart.classList.contains("bxs-heart") ? "red" : "black";
    });
});

// Product Modal & Cart
document.addEventListener("DOMContentLoaded", () => {

    // Product Modal Elements
    const modal = document.getElementById("productModal");
    const modalImg = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalPrice = document.getElementById("modalPrice");
    const modalAddBtn = document.getElementById("modalAddToCart");
    const modalClose = document.querySelector(".close-modal");

    // Cart Modal Elements
    const cartModal = document.createElement("div");
    cartModal.id = "cartModal";
    cartModal.style.display = "none";
    cartModal.style.position = "fixed";
    cartModal.style.top = "0";
    cartModal.style.left = "0";
    cartModal.style.width = "100%";
    cartModal.style.height = "100%";
    cartModal.style.backgroundColor = "rgba(0,0,0,0.8)";
    cartModal.style.justifyContent = "center";
    cartModal.style.alignItems = "center";
    cartModal.style.zIndex = "10000";
    cartModal.innerHTML = `
        <div id="cartContent" style="
            background:white; padding:20px; border-radius:10px; max-width:600px; width:90%; position:relative; max-height:80vh; overflow-y:auto;">
            <span id="closeCart" style="position:absolute; top:10px; right:15px; font-size:25px; cursor:pointer;">&times;</span>
            <h2 style="text-align:center; margin-bottom:15px;">Your Cart</h2>
            <div id="cartItems"></div>
            <h3 id="cartTotal" style="text-align:right; margin-top:15px;">Total: ₦0</h3>
        </div>
    `;
    document.body.appendChild(cartModal);

    const cartItemsDiv = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const closeCartBtn = document.getElementById("closeCart");
    const cartIcon = document.querySelector(".bx-cart");

    let cart = [];

    // ---------- Add to Cart Function ----------
    function addToCart(title, price, image) {
        const existing = cart.find(item => item.title === title);
        if(existing) existing.qty += 1;
        else cart.push({ title, price, image, qty: 1 });
        updateCartModal();
        cartModal.style.display = "flex"; // open cart modal
    }

    function updateCartModal() {
        cartItemsDiv.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            const itemPrice = parseInt(item.price.replace(/₦|,/g,"")) || 0;
            total += itemPrice * item.qty;

            const itemDiv = document.createElement("div");
            itemDiv.style.display = "flex";
            itemDiv.style.justifyContent = "space-between";
            itemDiv.style.marginBottom = "10px";
            itemDiv.innerHTML = `<span>${item.title} x${item.qty}</span><span>₦${(itemPrice * item.qty).toLocaleString()}</span>`;
            cartItemsDiv.appendChild(itemDiv);
        });
        cartTotal.innerText = `Total: ₦${total.toLocaleString()}`;
    }

    // ---------- Cart Modal Controls ----------
    cartIcon.addEventListener("click", () => cartModal.style.display = "flex");
    closeCartBtn.addEventListener("click", () => cartModal.style.display = "none");
    window.addEventListener("click", e => { if(e.target === cartModal) cartModal.style.display = "none"; });

    // ---------- Product Image Click ----------
    const productImages = document.querySelectorAll(".products .row img");
    productImages.forEach(img => {
        img.addEventListener("click", () => {
            const row = img.closest(".row");
            const title = row.querySelector(".price h4")?.innerText || "Product";
            const price = row.querySelector(".price p:not(.strike)")?.innerText || "₦0";

            modalImg.src = img.src;
            modalTitle.innerText = title;
            modalPrice.innerText = price;

            // Set modal Add to Cart data
            modalAddBtn.setAttribute("data-title", title);
            modalAddBtn.setAttribute("data-price", price);
            modalAddBtn.setAttribute("data-image", img.src);

            modal.style.display = "flex";
        });
    });

    // ---------- Modal Controls ----------
    modalClose.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", e => { if(e.target === modal) modal.style.display = "none"; });

    // ---------- Add to Cart Buttons ----------
    modalAddBtn.addEventListener("click", () => {
        const title = modalAddBtn.getAttribute("data-title");
        const price = modalAddBtn.getAttribute("data-price");
        const image = modalAddBtn.getAttribute("data-image");
        addToCart(title, price, image);
    });

    document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const title = btn.getAttribute("data-title");
            const price = btn.getAttribute("data-price");
            const image = btn.getAttribute("data-image");
            addToCart(title, price, image);
        });
    });

});
