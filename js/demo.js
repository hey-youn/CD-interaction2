//Declare ana array to hold all our dat
let apiURL = "https://api.airtable.com/v0/appRYNKgjKQri5iQ0/tblXNBWV4UjsiYfdI?api_key=key9T87RgmIzQMES7";

let apiData=[];

//these will be unique catagories based on your search functions
let cartoonsShows = [];

const select_menu = document.getElementById("cartoon_show_select");
const image_container = document.getElementById("image_container");
const color_button = document.getElementsById("change_border_color");

//only to request data from the api
async function fetchData(url){
    let response = await fetch(url);
    let jsonData = await response.json();
    return jsonData;
}

//which will also push data into apiData[] to make it more usable
async function getData(){
    let data = await fetchData(apiURL);

    for(let i = 0; i<data.records.length;i++){
        let records = data.records[i].fields;
        apiData.push(records);
    }

    console.log(apiData);

    makeDropdown();

    //adding an event listener on html element
    select_menu.addEventListener('change', function handleChange(event){
        imageSearch();
    
    })

    color_button.addEventListener('click',function changeColor(event){
        document.querySelector("img").style.borderColor = "#ff0000"
    })
   
}

getData();

function makeDropdown(){
    //iterate over all the description (cartoon show)
    for(let i = 0; i<apiData.length;i++){
        let ShowName = apiData[i].food;
        cartoonsShows.push(ShowName);
    };

    cartoonsShows = removeDuplicates(cartoonsShows);
    console.log(cartoonsShows);

    //for every show in cartoonShows, add a new option in the select menubar
    cartoonsShows.forEach(element => {
        let new_option = document.createElement("option");
        new_option.className = "option";
        new_option.innerHTML = element;
        new_option.value = element;
        select_menu.appendChild(new_option);
    })
}

function removeDuplicates(arr){
    return arr.filter((item, index) => arr.indexOF(item) === index);
}
// to search for correct cartoon characters and display 
function imageSearch(){
    console.log(select_menu.value);

    //filter
    const results = apiData.filter((entry)=>{
        const showNameMatch = entry.ShowName.includes(select_menu.value);
        return showNameMatch;
    })

    renderSortedImages(showNameMatch, image_container);
}

function renderSortedImages(sortedData, container){
    container.innerHTML = "";

    sortedData.forEach((entry, index)=>{
        const image = document.createElement("img");
        image.src = entry.Image[0].url;

        container.appendChild(image);
    })
}