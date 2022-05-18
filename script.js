/*All your HTML elements should be created with DOM.
 *DONE* Use the async/await.
 *DONE* Use try-catch to handle errors.
 *DONE* Use fetch() to get the data from Open Brewery API/


https://www.openbrewerydb.org/documentation/01-listbreweries
https://www.openbrewerydb.org/

Random  = https://api.openbrewerydb.org/breweries/random
single  = https://api.openbrewerydb.org/breweries/madtree-brewing-cincinnati
search = https://api.openbrewerydb.org/breweries/search?query={search}


Things to show on page:-
1. Implement a search filter based on the text entered in the input field.
    # *DONE* search button = use  url encoding for spaces.
    # *DONE* reset button
    # *DONE* random button
    

// add  attr href="value" in DOM of data

2. *DONE* Display the breweries name and type. = name , brewery_type
3. *DONE* Display the brewery’s address. = street, address_2,address_3,city,state,   county_province,postal_code, country
4. *DONE* Also display the website url. = website_url
5.  *DONE*Display the phone no of the brewery. = phone

*/

//------------------------/navbar <i class="fa fa-beer" aria-hidden="true"></i>
//------------------------/ info abt site

//------------------------/search
//------------------------/body
//------------------------/
//------------------------/footer

//------------------------/footer
console.log("");
//get input from textbox
let myForm = document.getElementById("myform");

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  performAction(myForm.innerText);
});

let buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    performAction(button.innerText);
  });
});
console.log(buttons);

function performAction(text) {
  let url = "https://api.openbrewerydb.org/breweries/";
  let search = document.getElementById("searchBox");
  // let datarow = document.getElementById("cardDiv");
  if (text == "Clear") {
    search.value = "";
    // datarow.style.display = "none";
    clearData();
    return;
  } else if (text == "Random Brewery") {
    url += "random";
  } else {
    url += `search?query=${search.value}`;
  }
  //   datarow.style.display = "block";
  fetchData(url);
  url = "";
}

async function fetchData(url) {
  try {
    let response = await fetch(url); //rml
    console.log("response", response);
    let result = await response.json();
    console.log("result", result);

    if (result.length == "0") {
      alert("Data not found");
      //   let datarow = document.getElementById("cardDiv");
      //   datarow.style.display = "none";
      return;
    }
    displayData(result);
  } catch (e) {
    console.error(e);
  }

  function displayData(data) {
    console.log("displayData", data[0]);
    var allChilds = document.getElementById("infoDiv").children;

    Array.from(allChilds).forEach((child) => {
      let children = child.children;

      for (let i = 0; i < children.length; i++) {
        // let nestedchildren = child.children;
        fillData(children[i], data);
      }
    });
  }
  // call url based on search or random
  //display data on promise resolve

  function fillData(children, data) {
    if (children.id == "nameValue") {
      children.innerText = data[0].name;
    } else if (children.id == "typeValue") {
      children.innerText = data[0].brewery_type;
    } else if (children.id == "addressValue") {
      children.innerText =
        (data[0].street == null ? "" : "Street : " + data[0].street + "\n") +
        (data[0].address_2 == null && data[0].address_3 == null
          ? ""
          : "address:"(data[0].address_2 == null ? "" : data[0].address_2) +
            (data[0].address_3 == null ? "" : data[0].address_3) +
            "\n") +
        (data[0].city == null ? "" : "City : " + data[0].city + "\n") +
        (data[0].state == null ? "" : "State : " + data[0].state + "\n") +
        (data[0].county_province == null
          ? ""
          : "County_province : " + data[0].county_province + "\n") +
        (data[0].postal_code == null
          ? ""
          : "Postal_code : " + data[0].postal_code + "\n") +
        (data[0].country == null ? "" : "Country : " + data[0].country);
    } else if (children.id == "phoneValue") {
      children.innerText = data[0].phone;
    } else if (children.id == "urlValue") {
      if (data[0].website_url == null) {
        children.innerText = "";
        return;
      }
      children.innerText = data[0].website_url;
      children.setAttribute("href", data[0].website_url);
    } else {
    }
  }
}

function clearData() {
  let nameValue = (document.getElementById("nameValue").innerText = "");
  let typeValue = (document.getElementById("typeValue").innerText = "");
  let addressValue = (document.getElementById("addressValue").innerText = "");
  let phoneValue = (document.getElementById("phoneValue").innerText = "");
  let urlValue = (document.getElementById("urlValue").innerText = "");
}
