const handelCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    //  console.log(data)
    const category = data.data;
    handelCategoryItem(category)

}

const handelCategoryItem = (data) => {
    const tabContainer = document.getElementById('tab-container');
    data.forEach((item) => {
        const div = document.createElement('div');
        // console.log(data)
        div.innerHTML = `    
        <a onclick='handelLoadItem("${item.category_id}")' class="tab btn-ghost rounded-lg active active:bg-slate-400 bg-slate-100 hover:bg-slate-200 text-xl">${item.category}</a>
        `
        tabContainer.appendChild(div);
    });

}

const handelLoadItem = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    // console.log(data.data)
    const categories = data.data;
    if (categories.length <= 0) {
        const cardContainer2 = document.getElementById('card-Container2');
        cardContainer2.innerText = '';
        const cardContainer = document.getElementById('card-Container');
        cardContainer.innerText = '';
        const cardContainer3 = document.getElementById('card-Container3')
        cardContainer3.innerText = '';
        const div2 = document.createElement('div');
        div2.innerHTML = `
        <div class="card w-full text-center items-center">
                <img src="logo/Icon.png" alt="">
                <h1 class="text-5xl font-bold">Oops!! Sorry, There is no <br> content here</h1>
            </div>
        `
        cardContainer2.appendChild(div2)
    }
    else {
        const cardContainer = document.getElementById('card-Container');
        cardContainer.innerText = '';
        const cardContainer2 = document.getElementById('card-Container2');
        cardContainer2.innerText = '';
        const cardContainer3 = document.getElementById('card-Container3')
        cardContainer3.innerText = '';
        categories.forEach((category) => {
            // console.log(category)
            const div = document.createElement('div')
            div.innerHTML = `
        <div class="card w-full lg:w-72 h-full bg-base-100 shadow-xl">
                    <figure><img class="h-44 w-full" src="${category.thumbnail}" alt="Shoes"/></figure>
                    <p class="text-right text-white bg-black -mt-8">${category.others.posted_date ? calculateTime(category.others.posted_date) : ' '}</p>
                    <div class="card-body">
                        <div class="card-footer flex justify-between mt-4">
                            <div class="flex flex-col">
                                <div>
                                    <div class=" avatar ">
                                        <div class="w-12 rounded-full">
                                            <img src="${category.authors[0].profile_picture}" alt="">  
                                        </div>
                                        <h2 class="card-title ml-2">
                                            ${category.title}
                                        </h2>
                                    </div>
                                </div>
                                <div class="block">
                                    <div><p>${category.authors[0].profile_name} <span>${category.authors[0].verified ? '<i class="text-blue-400 fa-solid fa-certificate"></i>' : ' '} </span></p> </div>
                                    <small><span>${category.others.views}</span></small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `
            cardContainer.appendChild(div)
        })
    }
}



handelCategory()


// Blog button

document.getElementById('blog').addEventListener('click', function () {
    location.href = 'blog.html';
})

//  Calculate time

const calculateTime = (inputValue) => {
    const calculateHour = parseInt(inputValue / 3600);
    const findMin = inputValue - (calculateHour * 3600);
    const calculateMin = parseInt(findMin / 60);
    const findSec = findMin - (calculateMin * 60);
    // console.log(calculateHour+'h' +':'+ calculateMin+'m'+ ':'+ findSec);
    return calculateHour + 'hrs' + ' ' + calculateMin + 'min' + ' ' + 'ago';
}

//  btn sort

document.getElementById('btn-sort').addEventListener('click', function () {
    const handelSortItem = async () => {
        const response = await fetch('https://openapi.programming-hero.com/api/videos/category/1000')
        const data = await response.json();
        const allData = data.data;
        function compareViewsData(a, b) {
            const viewsA = parseInt(a.others.views);
            const viewsB = parseInt(b.others.views);
            return viewsB - viewsA;
        }
        allData.sort(compareViewsData);
        // console.log(allData)
        allData.forEach((category) => {
            const cardContainer3 = document.getElementById('card-Container3')
            // cardContainer3.innerText = '';
            const cardContainer = document.getElementById('card-Container');
            cardContainer.innerText = '';
            // console.log(category)
            const cardContainer2 = document.getElementById('card-Container2');
            cardContainer2.innerText = '';
            const div = document.createElement('div')
            div.innerHTML = `
        <div class="card w-full lg:w-72 h-full bg-base-100 shadow-xl">
                    <figure><img class="h-44 w-full" src="${category.thumbnail}" alt="Shoes"/></figure>
                    <p class="text-right text-white bg-black -mt-8">${category.others.posted_date ? calculateTime(category.others.posted_date) : ' '}</p>
                    <div class="card-body">
                        <div class="card-footer flex justify-between mt-4">
                            <div class="flex flex-col">
                                <div>
                                    <div class=" avatar ">
                                        <div class="w-12 rounded-full">
                                            <img src="${category.authors[0].profile_picture}" alt="">  
                                        </div>
                                        <h2 class="card-title ml-2">
                                            ${category.title}
                                        </h2>
                                    </div>
                                </div>
                                <div class="block">
                                    <div><p>${category.authors[0].profile_name} <span>${category.authors[0].verified ? '<i class="text-blue-400 fa-solid fa-certificate"></i>' : ' '} </span></p> </div>
                                    <small><span>${category.others.views}</span></small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `
            cardContainer3.appendChild(div)
        })
    }
    handelSortItem()
})