let apiURL = "https://api.airtable.com/v0/appRYNKgjKQri5iQ0/tblXNBWV4UjsiYfdI?api_key=key9T87RgmIzQMES7"

let apiData;

async function getData(url) {
    let response = await fetch(url);
    let jsonData = await response.json();
    return jsonData;
}

async function main() {
    apiData = await getData(apiURL);

    console.log(apiData);
    let i = 0;
    let record = apiData.records[i].fields;

    for (i = 0; i < apiData.records.length; i++) {
        let name = apiData.records[i].fields.food;
        console.log(name);
        let heading = document.createElement("p");
        heading.innerHTML = name;
        document.body.appendChild(heading); 
        //let image = document.createElement("img")
            //image.src = apiData.records[i].fields.photo[0].url;
            //image.className
    }

}

main();