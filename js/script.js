//Declare ana array to hold all our data
let apiData= [];

let apiURL = "https://api.airtable.com/v0/appRYNKgjKQri5iQ0/tblXNBWV4UjsiYfdI?api_key=key9T87RgmIzQMES7"

let ingredients = [];

class CustomSelect {
    constructor(originalSelect) {

        this.originalSelect = originalSelect;
        this.customSelect = document.createElement("div");
        this.customSelect.classList.add("select");

        this.originalSelect.querySelectorAll("option").forEach(optionElement => {
            const itemElement = document.createElement("div");

            itemElement.classList.add("ingredient_select");
            itemElement.textContent = optionElement.textContent;
            this.customSelect.appendChild(itemElement);

            if (optionElement.selected) {
                this._select(itemElement);
            }

            itemElement.addEventListener("click", () => {
                if(itemElement.classList.contains("ingredient_select--selected")){
                    this._deselect(itemElement);
                } else {
                    this._select(itemElement);
                }
            })
        })

        this.originalSelect.insertAdjacentElement("afterend", this.customSelect);
 
    }

    _select(itemElement) {
        const index = Array.from(this.customSelect.children).indexOf(itemElement);

        this.originalSelect.querySelectorAll("option")[index].selected = true;
        itemElement.classList.add("ingredient_select--selected");
    } 

    _deselect(itemElement){
        const index = Array.from(this.customSelect.children).indexOf(itemElement);

        this.originalSelect.querySelectorAll("option")[index].selected = false;
        itemElement.classList.remove("ingredient_select--selected");
    } 

}

document.querySelectorAll(".custom-select").forEach(selectElement => {
    new CustomSelect(selectElement);
});

const select_menu = document.getElementById("ingredient_select");
const image_container = document.getElementById("image_container");

//only to request data from the api
async function fetchData(url){
    let response = await fetch(url);
    let jsonData = await response.json();
    return jsonData;
}

async function getData(){
    let data = await fetchData(apiURL);

    for(let i = 0; i<data.records.length;i++){
        let records = data.records[i].fields;
        apiData.push(records);
    }

    select_menu.addEventListener('change', function handleChange(event){
        imageSearch();
    
    })

    console.log(apiData);

    
}

function removeDuplicates(arr){
    return arr.filter((item, index) => arr.indexOF(item) === index);
}
// to search for correct cartoon characters and display 
function imageSearch(){
    console.log(select_menu.value);

    //filter
    const results = apiData.filter((entry)=>{
        const ingredientNameMatch = entry.ingredinetName.includes(select_menu.value);
        return ingredientNameMatch;
    })

    renderSortedImages(ingredientNameMatch, image_container);
}

function renderSortedImages(sortedData, container){
    container.innerHTML = ("div");


    sortedData.forEach((entry, index)=>{
        const image = document.createElement("img");
        image.src = entry.Image[0].url;

        container.appendChild(image);
    })
}

getData();
