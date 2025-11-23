const enableDarkmode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkmode", "active");
};

const disableDarkmode = () => {
    document.body.classList.remove("darkmode");
    localStorage.removeItem("darkmode");
};

const applyDarkmode = () => {
    const darkmode = localStorage.getItem("darkmode");
    if (darkmode === "active") {
        enableDarkmode();
    } else {
        disableDarkmode();
    }
};

// Run immediately and also when the page is shown from bfcache
applyDarkmode();
window.addEventListener("pageshow", applyDarkmode);
