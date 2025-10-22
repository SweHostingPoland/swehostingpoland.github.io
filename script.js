const planPrices = {
  starter: {
    base: 1,
    addons: {}
  },
  business: {
    base: 10,
    addons: {}
  },
  enterprise: {
    base: 15,
    addons: {}
  }
};
const domainPricing = {
  ".com": {
    price: "$3/year",
    popular: true
  },
  ".net": {
    price: "$6/year",
    popular: false
  },
  ".se": {
    price: "$2/year",
    popular: true
  },
  ".pl": {
    price: "$2.5/year",
    popular: true
  }
};
let currentPage = "home";
function initNavigation() {
  const _0x3842e7 = document.querySelectorAll(".nav-link");
  const _0x45ea46 = document.getElementById("navbar");
  const _0x428aac = document.getElementById("nav-toggle");
  const _0x2df8e0 = document.getElementById("nav-menu");
  const _0x1c50fc = document.getElementById("nav-indicator");
  _0x3842e7.forEach(_0x155d37 => {
    _0x155d37.addEventListener("click", _0x59e90e => {
      _0x59e90e.preventDefault();
      const _0x3c4972 = _0x155d37.getAttribute("data-page");
      navigateToPage(_0x3c4972);
      _0x2df8e0.classList.remove("active");
      _0x428aac.classList.remove("active");
    });
  });
  _0x428aac.addEventListener("click", () => {
    _0x2df8e0.classList.toggle("active");
    _0x428aac.classList.toggle("active");
  });
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      _0x45ea46.classList.add("scrolled");
    } else {
      _0x45ea46.classList.remove("scrolled");
    }
  });
  function _0x217b92() {
    const _0x5bbf61 = document.querySelector(".nav-link.active");
    if (_0x5bbf61) {
      const _0x1764bb = _0x5bbf61.getBoundingClientRect();
      const _0x36da4f = _0x45ea46.getBoundingClientRect();
      _0x1c50fc.style.left = _0x1764bb.left - _0x36da4f.left + "px";
      _0x1c50fc.style.width = _0x1764bb.width + "px";
      _0x1c50fc.style.opacity = "1";
    }
  }
  setTimeout(_0x217b92, 100);
  window.addEventListener("resize", _0x217b92);
}
function navigateToPage(_0x103e5c) {
  const _0x297738 = document.querySelectorAll(".page");
  const _0xc2821a = document.querySelectorAll(".nav-link");
  _0x297738.forEach(_0x46cceb => {
    _0x46cceb.classList.remove("active");
  });
  const _0x246b8e = document.getElementById(_0x103e5c + "-page");
  if (_0x246b8e) {
    _0x246b8e.classList.add("active");
    currentPage = _0x103e5c;
    window.location.hash = _0x103e5c;
    _0xc2821a.forEach(_0x18a72c => {
      _0x18a72c.classList.remove("active");
      if (_0x18a72c.getAttribute("data-page") === _0x103e5c) {
        _0x18a72c.classList.add("active");
      }
    });
    setTimeout(() => {
      const _0x19b5ae = document.querySelector(".nav-link.active");
      const _0x47eb91 = document.getElementById("nav-indicator");
      const _0x2fe6a0 = document.getElementById("navbar");
      if (_0x19b5ae && _0x47eb91 && _0x2fe6a0) {
        const _0x40c3c7 = _0x19b5ae.getBoundingClientRect();
        const _0x2c18aa = _0x2fe6a0.getBoundingClientRect();
        _0x47eb91.style.left = _0x40c3c7.left - _0x2c18aa.left + "px";
        _0x47eb91.style.width = _0x40c3c7.width + "px";
        _0x47eb91.style.opacity = "1";
      }
    }, 50);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    triggerPageAnimations(_0x246b8e);
  }
}
function triggerPageAnimations(_0x675fb7) {
  const _0x348d3a = _0x675fb7.querySelectorAll(".feature-card, .plan-card, .spec-card, .pricing-card, .contact-method");
  _0x348d3a.forEach((_0x1b4130, _0x5f0a68) => {
    _0x1b4130.style.opacity = "0";
    _0x1b4130.style.transform = "translateY(30px)";
    setTimeout(() => {
      _0x1b4130.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      _0x1b4130.style.opacity = "1";
      _0x1b4130.style.transform = "translateY(0)";
    }, _0x5f0a68 * 100);
  });
}
function redirectToDiscord() {
  window.open("https://discord.com/invite/morot-moderation-support-981247140519108658", "_blank");
}
function updatePrice(_0x26c76f, _0x170f74, _0x31c13b, _0x3e4c2a) {
  if (_0x3e4c2a) {
    planPrices[_0x26c76f].addons[_0x170f74] = _0x31c13b;
  } else {
    delete planPrices[_0x26c76f].addons[_0x170f74];
  }
  let _0x21e290 = planPrices[_0x26c76f].base;
  Object.values(planPrices[_0x26c76f].addons).forEach(_0x1bf813 => {
    _0x21e290 += _0x1bf813;
  });
  const _0x174235 = document.getElementById(_0x26c76f + "-total");
  if (_0x174235) {
    _0x174235.textContent = "$" + _0x21e290.toFixed(2);
  }
}
async function searchDomain() {
  const _0x331ca8 = document.getElementById("domain-search");
  const _0xc3a9d = _0x331ca8.value.trim();
  if (!_0xc3a9d) {
    alert("Please enter a domain name to search");
    return;
  }
  const _0x52d0a3 = document.getElementById("search-results");
  _0x52d0a3.style.display = "block";
  showSearchLoading();
  try {
    await checkDomainAvailability(_0xc3a9d);
  } catch (_0x28e5f2) {
    console.error("Error checking domain availability:", _0x28e5f2);
    showSearchError();
  }
}
function showSearchLoading() {
  const _0x28bde0 = document.getElementById("results-body");
  _0x28bde0.innerHTML = "\n        <div style=\"text-align: center; padding: 2rem; color: #64748b; grid-column: 1 / -1;\">\n            <i class=\"fas fa-spinner fa-spin\" style=\"font-size: 2rem; margin-bottom: 1rem;\"></i>\n            <p>Checking domain availability...</p>\n        </div>\n    ";
}
function showSearchError() {
  const _0xc778b1 = document.getElementById("results-body");
  _0xc778b1.innerHTML = "\n        <div style=\"text-align: center; padding: 2rem; color: #dc2626; grid-column: 1 / -1;\">\n            <i class=\"fas fa-exclamation-triangle\" style=\"font-size: 2rem; margin-bottom: 1rem;\"></i>\n            <p>Unable to check domain availability. Please try again later.</p>\n        </div>\n    ";
}
async function checkDomainAvailability(_0x3f0a86) {
  const _0x4bc7d1 = document.getElementById("results-body");
  _0x4bc7d1.innerHTML = "";
  for (const _0x125f02 of Object.keys(domainPricing)) {
    const _0x4c715d = _0x3f0a86 + _0x125f02;
    try {
      const _0xd19e4e = await fetch("https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_ptJ4FfGa1btEcXysAivmVO8LdqQrX&domainName=" + _0x4c715d);
      const _0x50b18f = await _0xd19e4e.json();
      const _0x4d2382 = _0x50b18f.DomainInfo && _0x50b18f.DomainInfo.domainAvailability === "AVAILABLE";
      const _0x40bc98 = domainPricing[_0x125f02];
      const _0x5555f4 = document.createElement("div");
      _0x5555f4.className = "result-row";
      _0x5555f4.innerHTML = "\n                <div class=\"domain-name\">" + _0x4c715d + "</div>\n                <div class=\"status " + (_0x4d2382 ? "status-available" : "status-taken") + "\">\n                    <i class=\"fas " + (_0x4d2382 ? "fa-check" : "fa-times") + "\"></i>\n                    " + (_0x4d2382 ? "Available" : "Taken") + "\n                </div>\n                <div class=\"price\">\n                    " + _0x40bc98.price + "\n                    " + (_0x40bc98.popular ? "<span class=\"popular-badge\">Popular</span>" : "") + "\n                </div>\n                <div class=\"action\">\n                    " + (_0x4d2382 ? "<button class=\"btn btn-primary\" onclick=\"redirectToDiscord()\">Register Now</button>" : "") + "\n                </div>\n            ";
      _0x4bc7d1.appendChild(_0x5555f4);
    } catch (_0x3ea14e) {
      console.error("Error checking " + _0x4c715d + ":", _0x3ea14e);
      const _0x45ae91 = document.createElement("div");
      _0x45ae91.className = "result-row";
      _0x45ae91.innerHTML = "\n                <div class=\"domain-name\">" + _0x4c715d + "</div>\n                <div class=\"status status-available\">\n                    <i class=\"fas fa-check\"></i>\n                    Available\n                </div>\n                <div class=\"price\">\n                    " + domainPricing[_0x125f02].price + "\n                    " + (domainPricing[_0x125f02].popular ? "<span class=\"popular-badge\">Popular</span>" : "") + "\n                </div>\n                <div class=\"action\">\n                    <button class=\"btn btn-primary\" onclick=\"redirectToDiscord()\">Register Now</button>\n                </div>\n            ";
      _0x4bc7d1.appendChild(_0x45ae91);
    }
  }
  const _0x5241f9 = [_0x3f0a86 + "host", "my" + _0x3f0a86, _0x3f0a86 + "pro"];
  for (const _0x4cdfcc of _0x5241f9) {
    try {
      const _0x1b1acc = await fetch("https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_ptJ4FfGa1btEcXysAivmVO8LdqQrX&domainName=" + _0x4cdfcc + ".com");
      const _0x2a0940 = await _0x1b1acc.json();
      const _0x5122d3 = _0x2a0940.DomainInfo && _0x2a0940.DomainInfo.domainAvailability === "AVAILABLE";
      const _0x1cbd15 = document.createElement("div");
      _0x1cbd15.className = "result-row";
      _0x1cbd15.innerHTML = "\n                <div class=\"domain-name\">" + _0x4cdfcc + ".com</div>\n                <div class=\"status " + (_0x5122d3 ? "status-available" : "status-taken") + "\">\n                    <i class=\"fas " + (_0x5122d3 ? "fa-check" : "fa-times") + "\"></i>\n                    " + (_0x5122d3 ? "Available" : "Taken") + "\n                </div>\n                <div class=\"price\">$3/year</div>\n                <div class=\"action\">\n                    " + (_0x5122d3 ? "<button class=\"btn btn-primary\" onclick=\"redirectToDiscord()\">Register Now</button>" : "") + "\n                </div>\n            ";
      _0x4bc7d1.appendChild(_0x1cbd15);
    } catch (_0x5946cf) {
      console.error("Error checking " + _0x4cdfcc + ".com:", _0x5946cf);
    }
  }
  const _0x5d5b13 = document.getElementById("search-results");
  _0x5d5b13.scrollIntoView({
    behavior: "smooth"
  });
}
function handleContactForm(_0x3b88a1) {
  _0x3b88a1.preventDefault();
  alert("Thank you for your message! We'll get back to you soon. For immediate assistance, please join our Discord community.");
  _0x3b88a1.target.reset();
  setTimeout(() => {
    redirectToDiscord();
  }, 2e3);
}
document.addEventListener("DOMContentLoaded", function () {
  initNavigation();
  const _0x5d358f = window.location.hash.substring(1);
  if (_0x5d358f && ["home", "hosting", "domains", "specs", "contact"].includes(_0x5d358f)) {
    navigateToPage(_0x5d358f);
  } else {
    navigateToPage("home");
  }
  window.addEventListener("hashchange", () => {
    const _0x83b794 = window.location.hash.substring(1);
    if (_0x83b794 && ["home", "hosting", "domains", "specs", "contact"].includes(_0x83b794)) {
      navigateToPage(_0x83b794);
    }
  });
  const _0x3d4b2d = document.getElementById("domain-search");
  console.log("Made by Wowstar2504 (discord: @wowstar2504)");
  if (_0x3d4b2d) {
    _0x3d4b2d.addEventListener("keypress", function (_0x37400f) {
      if (_0x37400f.key === "Enter") {
        searchDomain();
      }
    });
  }
  const _0x296683 = document.querySelectorAll(".btn");
  _0x296683.forEach(_0x3aaad8 => {
    _0x3aaad8.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });
    _0x3aaad8.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
  const _0x1ee91c = document.querySelector(".hero");
  if (_0x1ee91c) {
    window.addEventListener("scroll", () => {
      const _0x3f3edb = window.pageYOffset;
      const _0x30b938 = _0x3f3edb * -0.5;
      if (_0x3f3edb < _0x1ee91c.offsetHeight) {
        _0x1ee91c.style.transform = "translateY(" + _0x30b938 + "px)";
      }
    });
  }
  const _0x3c43e1 = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };
  const _0x4ae834 = new IntersectionObserver(function (_0x5a666e) {
    _0x5a666e.forEach(_0x16583e => {
      if (_0x16583e.isIntersecting) {
        _0x16583e.target.style.opacity = "1";
        _0x16583e.target.style.transform = "translateY(0)";
      }
    });
  }, _0x3c43e1);
  const _0x1b040f = document.querySelectorAll(".feature-card, .plan-card, .spec-card, .pricing-card");
  _0x1b040f.forEach(_0x1cce97 => {
    _0x1cce97.style.opacity = "0";
    _0x1cce97.style.transform = "translateY(30px)";
    _0x1cce97.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    _0x4ae834.observe(_0x1cce97);
  });
  const _0x12994a = document.querySelector(".hero-title");
  if (_0x12994a && currentPage === "home") {
    const _0x2c82d1 = _0x12994a.textContent;
    _0x12994a.textContent = "";
    let _0xb00527 = 0;
    const _0xb387ec = () => {
      if (_0xb00527 < _0x2c82d1.length) {
        _0x12994a.textContent += _0x2c82d1.charAt(_0xb00527);
        _0xb00527++;
        setTimeout(_0xb387ec, 50);
      }
    };
    setTimeout(_0xb387ec, 500);
  }
  const _0x4d1d5b = document.querySelectorAll(".feature-icon, .spec-icon, .contact-icon");
  _0x4d1d5b.forEach((_0x4add47, _0x2c48a9) => {
    _0x4add47.style.animation = "float 3s ease-in-out infinite";
    _0x4add47.style.animationDelay = _0x2c48a9 * 0.2 + "s";
  });
  const _0x588b2b = document.createElement("style");
  _0x588b2b.textContent = "\n        @keyframes float {\n            0%, 100% { transform: translateY(0px); }\n            50% { transform: translateY(-10px); }\n        }\n        \n        .nav-link {\n            position: relative;\n            overflow: hidden;\n        }\n        \n        .nav-link::before {\n            content: '';\n            position: absolute;\n            top: 0;\n            left: -100%;\n            width: 100%;\n            height: 100%;\n            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);\n            transition: left 0.5s;\n        }\n        \n        .nav-link:hover::before {\n            left: 100%;\n        }\n        \n        .btn {\n            position: relative;\n            overflow: hidden;\n        }\n        \n        .btn::before {\n            content: '';\n            position: absolute;\n            top: 0;\n            left: -100%;\n            width: 100%;\n            height: 100%;\n            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);\n            transition: left 0.5s;\n        }\n        \n        .btn:hover::before {\n            left: 100%;\n        }\n    ";
  document.head.appendChild(_0x588b2b);
});