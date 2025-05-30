// Folder names for categories
const folder_names = ["Romantik", "Renaissance", "Barock", "Impressionismus", "Xieyi", "Gongbi"];
const ids = new Set();
const btn_ids = ["romantik_btn", "renaissance_btn", "barock_btn", "impressionismus_btn", "xieyi_btn", "gongbi_btn"];

// Categories object to store image paths
let categories = {};

// Debug information to check what's loading and what isn't
console.log("Initializing page...");
console.log("Current path:", window.location.pathname);

// Try to load a test image to verify paths
const testImg = new Image();
testImg.onload = () => console.log("Test image loaded successfully!");
testImg.onerror = () => console.log("Test image failed to load!");
testImg.src = "./assets/img/Elbaue.png";

async function initializeCategories() {
    for (const foldername of folder_names) {
        const key = foldername[0] + foldername[1];
        const paths = [];

        let i = 1;
        while (true) {
            const imgPath = `./assets/img/epochen/${foldername}/${foldername}${i}.png`;
            console.log("Checking if image exists:", imgPath);
            const exists = await checkImageExists(imgPath);

            if (exists) {
                console.log("Image exists:", imgPath);
                paths.push(`${foldername}/${foldername}${i}.png`);
                i++;
            } else {
                console.log("Image does not exist:", imgPath);
                break;
            }
        }

        categories[key] = { "current_idx": 0, "paths": paths };
        console.log(`Category ${key} initialized with ${paths.length} images.`);
    }
}

function checkImageExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
}

// Initialize and set up event listeners
initializeCategories().then(() => {
    console.log("All categories initialized");

    // Apply background images programmatically 
    document.getElementById("romantik_btn").style.backgroundImage = "url('./assets/img/epochen/Romantik/Romantik1.png')";
    document.getElementById("renaissance_btn").style.backgroundImage = "url('./assets/img/epochen/Renaissance/Renaissance1.png')";
    document.getElementById("barock_btn").style.backgroundImage = "url('./assets/img/epochen/Barock/Barock1.png')";
    document.getElementById("impressionismus_btn").style.backgroundImage = "url('./assets/img/epochen/Impressionismus/Impressionismus1.png')";
    document.getElementById("xieyi_btn").style.backgroundImage = "url('./assets/img/epochen/Xieyi/Xieyi1.png')";
    document.getElementById("gongbi_btn").style.backgroundImage = "url('./assets/img/epochen/Gongbi/Gongbi1.png')";

    // Add click events
    btn_ids.forEach((id) => {
        const btn_event = document.getElementById(id);
        console.log("Setting up event for:", id);

        btn_event.addEventListener("click", function (event) {
            const button = event.target;
            button.classList.add('clicked');
            select_category(event);
        });
        btn_event.addEventListener("touchstart", function (event) {
            const button = event.target;
            button.classList.add('clicked');
            select_category(event);
        });
    });

    // Home-Button event handling
    const homeBtn = document.getElementById('home_btn');
    if (homeBtn) {
        homeBtn.addEventListener('click', function () {
            window.location.href = 'index.html';
        });
        homeBtn.addEventListener('touchstart', function () {
            window.location.href = 'index.html';
        });
    }
});

function select_category(event) {
    const id_btn = event.target.id;
    console.log("Button clicked:", id_btn);
    const category = id_btn[0].toUpperCase() + id_btn[1];
    ids.add(id_btn);
    const board = document.getElementById('board');
    board.classList.add("active");

    const btn = document.getElementById(id_btn)
    // btn.style.boxShadow = "none";
    // btn.style.pointerEvents = "none";
    // btn.style.cursor = "pointer";

    if (category) {
        console.log("Selected category:", category);
        btn_ids.forEach((id) => {
            const btn = document.getElementById(id);
            if (id !== "home_btn") {
                btn.style.boxShadow = "none";
                btn.style.pointerEvents = "none";
                btn.style.cursor = "pointer";
            }

        });
        changeImage(getImageByCategories(category));

        setTimeout(function () {
            board.classList.remove("active");
            btn_ids.forEach((id) => {
                const btn = document.getElementById(id);
                btn.style.boxShadow = "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px";
                btn.style.pointerEvents = "auto";
            });
        }, 13900);
    }
}

async function changeImage(srcImage) {
    console.log("Changing image to:", srcImage);
    const buttons = document.querySelectorAll('button');
    const img = document.getElementById('frame_img_dst');
    const initialImg = document.getElementById('frame_img_src');
    const board = document.getElementById('board');
    const btns = Array.from(document.getElementsByClassName('btn'))

    img.src = srcImage;
    await img.decode();
    img.style.opacity = 1;

    initialImg.style.opacity = 0;

    board.classList.add("hide_cursor");
    btns.forEach(b => {
        b.classList.add("hide_cursor");
    });
    buttons.forEach(button => {
        if (button.id !== "home_btn") {
            button.disabled = true;
            button.classList.add("hide_cursor")
        }

    });

    setTimeout(function () {
        img.style.opacity = 0;
        initialImg.style.opacity = 1;
    }, 10000);

    setTimeout(function () {
        btns.forEach(b => {
            b.classList.remove("hide_cursor");
        });
        buttons.forEach(button => {
            button.disabled = false;
            button.classList.remove("clicked");
            button.classList.remove("hide_cursor");
            board.classList.remove("hide_cursor");
        });
    }, 13701);
}

function getImageByCategories(category) {
    const list = categories[category]["paths"];
    console.log("List length:", list.length);
    if (list.length === 0) {
        console.error("No images found for category:", category);
        return "./assets/img/Elbaue.png"; // Fallback
    }
    console.log("Selected image:", list[categories[category]["current_idx"]]);
    categories[category]["current_idx"] = (categories[category]["current_idx"] + 1) % list.length;
    return "./assets/img/epochen/" + list[categories[category]["current_idx"]];
}