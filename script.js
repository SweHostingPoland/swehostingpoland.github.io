// ======== Hosting Calculator ========
function calculatePrice() {
  const storage = document.getElementById("storage").value;
  const bandwidth = document.getElementById("bandwidth").value;

  const price = (storage * 0.1) + (bandwidth * 0.05);
  document.getElementById("totalPrice").innerText = price.toFixed(2);
}

// ======== Smooth Scroll for internal links ========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ======== Highlight active nav link ========
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll("nav a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// ======== Placeholder Buy Hosting function (hosting.html) ========
function buyHosting(plan) {
  alert(`You selected the ${plan} hosting plan.\nCheckout integration will go here.`);
}
