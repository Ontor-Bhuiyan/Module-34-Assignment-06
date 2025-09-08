// cetagory navbar JS start
const navCategory = document.getElementById("nav-category");

const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const categories = data.categories;
            displayCategory(categories)
        })
}

const displayCategory = (categories) => {
    categories.forEach(category => {
        navCategory.innerHTML += `
            <li class="text-[16px] font-medium py-2 hover:bg-[#15803D] hover:text-white rounded-lg p-2 cursor-pointer" id="${category.id}"><button class="cursor-pointer">${category.category_name}</button></li>
        `;
    });
    console.log(navCategory)
    navCategory.addEventListener('click', (event) => {
        const allLi = document.querySelectorAll('li');
            allLi.forEach(li => {
                li.classList.remove('bg-[#15803D]', 'text-white');
            });
            if(event.target.localName === 'li'){
                event.target.classList.add('bg-[#15803D]', 'text-white')
                displayTreesByCategory(event.target.id)
            }
    });
}

const treesCategory = document.getElementById('trees-category');

const displayTreesByCategory = (categoryId) => {
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
        .then(response => response.json())
        .then(data => {
            showTressByCategory(data.plants)
            console.log(data.plants)
        })
        .catch(error => {
            console.log(error);
        })
}

const showTressByCategory = (plants) => {

    treesCategory.innerHTML = '';

    plants.forEach(plant => {
        treesCategory.innerHTML += `
            <div class="w-[350px] h-[460px] bg-white rounded-lg">
                <div>
                    <img class="w-[325px] h-[250px] mx-auto py-3 mx-5" src="${plant.image}" alt="" />
                    <h2 class="text-[14px] font-semibold px-3 pb-3">${plant.name}</h2>
                    <p class="text-[12px] font-normal text-[#1F2937] px-3 pb-3">${plant.description}</p>
                    <div class="flex justify-between items-center px-3 pb-3">
                      <div class="text-[#15803D] bg-[#DCFCE7] px-3 py-1 rounded-[30px]">
                        <p class="text-[14px] font-normal">${plant.category}</p>
                      </div>
                      <div>
                        <p class="text-[14px] font-semibold"><span><i class="fa-solid fa-bangladeshi-taka-sign text-[14px] font-normal"></i>${plant.price}</span></p>
                      </div>
                    </div>
                    <button class="w-[324px] text-white py-2 mx-3 mb-3 bg-[#15803D] rounded-[30px] cursor-pointer">Add to Cart</button>
                </div>
            </div>
        `;
    })
}




loadCategory()
displayTreesByCategory()