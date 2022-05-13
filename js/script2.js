let apiData= [];

let apiURL = "https://api.airtable.com/v0/appRYNKgjKQri5iQ0/tblXNBWV4UjsiYfdI?api_key=key9T87RgmIzQMES7"

let apiURL2 = "https://api.airtable.com/v0/appRYNKgjKQri5iQ0/tblCkd5LDRTFUyO9Q?api_key=key9T87RgmIzQMES7"

let ingredients = [];

let search_results = [];

const select_menu = document.getElementById("ingredients-select"); 
const img_container = document.getElementById("img_container");

async function fetchData(url){
    let response = await fetch(url);
    let jsonData = await response.json();
    return jsonData;
}

async function getData(){
    let data = await fetchData(apiURL); 

    //reducing the array and making it simpler
    for(let i = 0; i<data.records.length; i++){
        let record = data.records[i].fields;
        apiData.push(record);
    }

    console.log(apiData);

    let show_button = document.getElementById("show");

    makeMultiselect();
    
    let buttons = document.getElementsByClassName("options");
        for(let i=0; i<buttons.length; i++){
            buttons[i].addEventListener('click', function handleChange(event){
                search_results.push(buttons[i].value);
                console.log(search_results);
                //imageSearch(search_results);
            });   
           
        } 
        show_button.addEventListener("click",function show_images(){
            imageSearch(search_results);
            search_results=[];
        })
}


function makeMultiselect(){
    for(let i = 0; i<apiData.length;i++){
        for(let j=0;j<apiData[i].ingredient.length;j++){
            let ingredientName = apiData[i].ingredient[j];
        ingredients.push(ingredientName);
        }     
    };

    ingredients = removeDuplicates(ingredients);
    console.log(ingredients);

    let i=0;
    ingredients.forEach(element => {
        let option = document.createElement("button");
        option.className = "options";
        option.id = "option" + i;
        option.innerHTML = element;
        option.value = element;
        select_menu.appendChild(option);
        i++;
    });

}

/*function ingredient_tag(data, container){
    container.innerHTML = "";

    data.forEach((entry,index) => {
        const image = document.createElement("img");
        image.src = apiData[i].Attachments[0].url;
        image.classList.add("img")
    })
}*/

function removeDuplicates(arr) {
    return arr.filter((item,index) => arr.indexOf(item) === index);
}

function imageSearch(array){
    //console.log(button.value);

    const results = apiData.filter((entry) => {
        const descriptionMatch = array.every((ing) => {return entry.ingredient.includes(ing);})
        console.log(descriptionMatch);
        return descriptionMatch;

    });



    renderSortedImages(results, img_container);
}

function renderSortedImages(data, container){
   container.innerHTML = "";

    data.forEach((entry, index) => {
        const image = document.createElement("img");
        image.src = entry.image[0].url;

        container.appendChild(image);
    });
}

getData();