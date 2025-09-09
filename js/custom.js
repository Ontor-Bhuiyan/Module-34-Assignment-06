// loding spinner JS code
const manageSpinner = (status) => {
  const spinner = document.getElementById("spinner-container");
  const content = document.getElementById("trees-category");

  if (status === true) {
    spinner.classList.remove("hidden");
    if (content) content.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    if (content) content.classList.remove("hidden");
  }
};

// cetagory navbar JS start
const navCategory = document.getElementById("nav-category");

const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((response) => response.json())
    .then((data) => {
      const categories = data.categories;
      displayCategory(categories);
    });
};

const displayCategory = (categories) => {
  categories?.forEach((category) => {
    navCategory.innerHTML += `
            <li class="text-[16px] font-medium py-2 hover:bg-[#15803D] hover:text-white rounded-lg p-2 cursor-pointer" id="${category.id}">${category.category_name}</li>
        `;
  });

  navCategory.addEventListener("click", (event) => {
    if (event.target.localName === "li") {
      // Remove active class from all category buttons
      const allLi = document.querySelectorAll("#nav-category li");
      allLi.forEach((li) => {
        li.classList.remove("bg-[#15803D]", "text-white");
      });

      // Remove active class from All Trees button
      allTreesButton.classList.remove("bg-[#15803D]", "text-white");

      // Add active class to clicked category
      event.target.classList.add("bg-[#15803D]", "text-white");
      displayTreesByCategory(event.target.id);
    }
  });
};

// just all trees li JS code
const allTreesButton = document.getElementById("allTreesButton");

allTreesButton.addEventListener("click", () => {
  // Remove active class from all category buttons
  const allLi = document.querySelectorAll("#nav-category li");
  allLi.forEach((li) => {
    li.classList.remove("bg-[#15803D]", "text-white");
  });

  // Add active class to All Trees button
  allTreesButton.classList.add("bg-[#15803D]", "text-white");

  loadAllPlants();
});

const loadAllPlants = () => {
  manageSpinner(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((response) => response.json())
    .then((data) => {
      const allPlants = data.plants;
      displayAllPlants(allPlants);
    });
};

const displayAllPlants = (allPlants) => {
  treesCategory.innerHTML = "";

  allPlants?.forEach(
    (plant) =>
      (treesCategory.innerHTML += `
        <div class="w-full h-full bg-white rounded-lg">
          <div class="h-full flex flex-col justify-between">
            <img class="w-[325px] h-[250px] mx-auto py-3" src="${plant.image}" alt="" />
            <h2 class="text-[14px] font-semibold px-3 pb-3 hover:underline cursor-pointer" id="show-modal">${plant.name}</h2>
            <p class="text-[12px] font-normal text-[#1F2937] px-3 pb-3">${plant.description}</p>
            <div class="flex justify-between items-center px-3 pb-3">
              <div class="text-[#15803D] bg-[#DCFCE7] px-3 py-1 rounded-[30px]">
                <p class="text-[14px] font-normal">${plant.category}</p>
              </div>
              <div>
                <p class="text-[14px] font-semibold"><span>৳${plant.price}</span></p>
              </div>
            </div>
            <button class="w-[350px] md:w-[390px] lg:w-[335px] text-white py-2 mx-3 mb-3 bg-[#15803D] rounded-[30px] cursor-pointer" data-plant-id="${plant.id}">Add to Cart</button>
          </div>
        </div>
      `)
  );

  manageSpinner(false);
};
loadAllPlants();

// show modal JS code

// card showing JS code
const treesCategory = document.getElementById("trees-category");

const displayTreesByCategory = (categoryId) => {
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then((response) => response.json())
    .then((data) => {
      showTressByCategory(data.plants);
      manageSpinner(false);
    })
    .catch((error) => {
      console.log(error);
      manageSpinner(false);
    });
};

const showTressByCategory = (plants) => {
  treesCategory.innerHTML = "";

  plants?.forEach((plant) => {
    treesCategory.innerHTML += `
            <div class="w-full h-full bg-white rounded-lg">
              <div class="h-full flex flex-col justify-between">
                <img class="w-[325px] h-[250px] mx-auto py-3" src="${plant.image}" alt="" />
                <h2 class="text-[14px] font-semibold px-3 pb-3 cursor-pointer hover:underline" id="show-modal">${plant.name}</h2>
                <p class="text-[12px] font-normal text-[#1F2937] px-3 pb-3">${plant.description}</p>
                <div class="flex justify-between items-center px-3 pb-3">
                  <div class="text-[#15803D] bg-[#DCFCE7] px-3 py-1 rounded-[30px]">
                    <p class="text-[14px] font-normal">${plant.category}</p>
                  </div>
                  <div>
                    <p class="text-[14px] font-semibold"><span>৳${plant.price}</span></p>
                  </div>
                </div>
                <button class="w-[335px] text-white py-2 mx-3 mb-3 bg-[#15803D] rounded-[30px] cursor-pointer" data-plant-id="${plant.id}">Add to Cart</button>
              </div>
            </div>
          `;
  });
};

loadCategory();

// add to cart add in cart-container and remove this card also JS code
const cart = [];

const cartContainer = document.getElementById("cart-container");

// Function to show plant details in modal
const showPlantDetailsInModal = (plant) => {
  // Get the modal element
  const modal = document.getElementById("my_modal_5");

  // Get all elements in modal that we want to update
  const modalTitle = modal.querySelector("h2");
  const modalImage = modal.querySelector("img");
  const modalCategory = modal.querySelector("h4");
  const modalPrice = modal.querySelector("h5");
  const modalDescription = modal.querySelector("p");

  // Update modal content with plant details
  modalTitle.innerText = plant.name;
  modalImage.src = plant.image;
  modalCategory.innerText = `Category: ${plant.category}`;
  modalPrice.innerText = `Price: ৳${plant.price}`;
  modalDescription.innerText = plant.description;

  // Show the modal
  modal.showModal();
};

// Function to fetch plant details from API
const fetchPlantDetails = async (plantId) => {
  // fetch(`https://openapi.programming-hero.com/api/plant/${plantId}`)
  //   .then((response) => response.json())
  //   .then((data) => data.plants);
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/plant/${plantId}`
    );
    const data = await response.json();

    return data.plants;
  } catch (error) {
    console.error("Error getting plant details:", error);
  }
};

treesCategory.addEventListener("click", async (e) => {
  // Check if clicked element is the title (h2 with id="show-modal")
  if (e.target.id === "show-modal") {
    // Get the plant ID from the Add to Cart button in the same card
    const card = e.target.closest("div.h-full");
    const addToCartButton = card.querySelector("button");
    const plantId = addToCartButton.dataset.plantId;

    // Get and show plant details in modal
    const plantDetails = await fetchPlantDetails(plantId);
    if (plantDetails) {
      showPlantDetailsInModal(plantDetails);
    }
  }
  // Handle Add to Cart button click separately
  else if (e.target.innerText === "Add to Cart") {
    handleAddToCart(e);
  }
});

const handleAddToCart = (e) => {
  const card = e.target.closest("div.h-full");
  const name = card.querySelector("h2").innerText;
  const priceText = card.querySelector(
    "div.flex.justify-between p span"
  ).innerText;
  const price = parseInt(priceText.replace("৳", "").trim());

  cart.push({
    name: name,
    price: price,
  });

  showCart(cart);
  updateTotalPrice();
};

const showCart = (cart) => {
  cartContainer.innerHTML = "";

  cart.forEach((item, index) => {
    cartContainer.innerHTML += `
            <div class="flex justify-between items-center bg-[#f0fdf4] mx-3 p-2 mb-2 rounded-lg" data-index="${index}">   
                <div>
                    <div class="text-[14px] font-semibold">${item.name}</div>
                    <div class="text-[16px] text-[#777777] font-normal">

                        <span>৳${item.price}</span>
                    </div>
                </div>

                <div class="cursor-pointer">
                    <span class="remove-item">❌</span>
                </div>
            </div>
        `;
  });
};

const removeFromCart = (index) => {
  cart.splice(index, 1);
  showCart(cart);
  updateTotalPrice();
};

cartContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item")) {
    const index = e.target.closest("[data-index]").getAttribute("data-index");
    removeFromCart(index);
  }
});

const total = document.getElementById("total");

const updateTotalPrice = () => {
  let totalPrice = 0;

  cart.forEach((item) => {
    totalPrice += item.price;
  });

  total.innerText = totalPrice;
};
