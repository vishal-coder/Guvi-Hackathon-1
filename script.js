//create HTML DOM Structure
createHTMLStructure();

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

function performAction(text) {
  let url = "https://api.openbrewerydb.org/breweries/";
  let search = document.getElementById("searchBox");

  if (text == "Clear") {
    search.value = "";
    clearData();
    return;
  } else if (text == "Random Brewery") {
    url += "random";
  } else {
    url += `search?query=${search.value}`;
  }
  fetchData(url);
  url = "";
}

async function fetchData(url) {
  try {
    let response;
    response = await fetch(url, { cache: "no-cache" });
    let result = await response.json();

    if (result.length == "0") {
      clearData();
      throw "No data found for given input";
    }
    displayData(result);
  } catch (err) {
    alert(err);
  }

  function displayData(data) {
    var allChilds = document.getElementById("infoDiv").children;

    Array.from(allChilds).forEach((child) => {
      let children = child.children;

      for (let i = 0; i < children.length; i++) {
        fillData(children[i], data);
      }
    });
  }

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
      console.log(data[0].phone == null);
      data[0].phone == null
        ? (children.innerText = "Not Available")
        : (children.innerText = data[0].phone);
    } else if (children.id == "urlValue") {
      if (data[0].website_url == null) {
        children.innerText = "Not Available";
        return;
      }

      children.innerHTML = `<a href="${data[0].website_url}" target="_blank">${data[0].website_url}</a> `;
    } else {
    }
  }
}

function clearData() {
  document.getElementById("nameValue").innerText = "";
  document.getElementById("typeValue").innerText = "";
  document.getElementById("addressValue").innerText = "";
  document.getElementById("phoneValue").innerText = "";
  document.getElementById("urlValue").innerText = "";
}

function createHTMLStructure() {
  let nav = createHTMLEle("nav", "class", "navbar navbar-custom");
  let spanNav = createHTMLEle(
    "span",
    "class",
    "navbar-brand mb-0 h1 text-center"
  );
  let navi = createHTMLEle("i", "class", "fa fa-beer fa-2x");
  let spanNested = createHTMLEle(
    "span",
    "class",
    "brand-name",
    null,
    null,
    "Brewery Directory"
  );

  spanNav.append(navi, spanNested);
  nav.append(spanNav);

  let container = createHTMLEle("div", "class", "container");
  let rowH = createHTMLEle("div", "class", "row");
  let r1_div = createHTMLEle("div", "class", "col-lg-12 text-center");
  let h1 = document.createElement("h1");
  h1.innerText = "Welcome to Brewery directory";

  r1_div.append(h1);
  rowH.append(r1_div);
  container.append(rowH);

  let rowbtn = createHTMLEle("div", "class", "row");
  let r2_div1 = createHTMLEle("div", "class", "col-lg-2");
  let r2_div2 = createHTMLEle("div", "class", "col-lg-8 text-center");

  let formDiv = createHTMLEle("div", "class", "form_group");
  let form = document.createElement("form");
  form.setAttribute("id", "myform");

  let searchbx = createHTMLEle("input", "type", "text", "id", "searchBox");
  searchbx.setAttribute("name", "searchBox-el");
  searchbx.setAttribute("required", true);

  let searchBtn = createHTMLEle(
    "input",
    "type",
    "submit",
    "class",
    "btn btn-primary"
  );
  searchBtn.setAttribute("value", "Search");
  searchBtn.setAttribute("id", "seachBtn");

  let clearBtn = createHTMLEle(
    "button",
    "type",
    "button",
    "class",
    "btn btn-primary"
  );
  clearBtn.innerText = "Clear";

  let randomBtn = createHTMLEle(
    "button",
    "type",
    "button",
    "class",
    "btn btn-primary"
  );
  randomBtn.innerText = "Random Brewery";

  form.append(searchbx, searchBtn, clearBtn, randomBtn);
  formDiv.append(form);

  r2_div2.append(formDiv);

  let r2_div3 = createHTMLEle("div", "class", "col-lg-2");

  rowbtn.append(r2_div1, r2_div2, r2_div3);

  let datarow = createHTMLEle("div", "class", "row", "id", "datarow");
  let r3_div1 = createHTMLEle("div", "class", "col-lg-3");
  let r3_div2 = createHTMLEle("div", "class", "col-lg-6 text-center");

  let cardDiv = createHTMLEle("div", "class", "card", "id", "cardDiv");
  let infoDiv = createHTMLEle("div", "class", "infodiv", "id", "infoDiv");

  let dataDiv1 = createHTMLEle("div", "class", "data");
  let nameDiv1 = createHTMLEle("div", "id", "name");
  nameDiv1.innerText = "Name";
  let nameDiv2 = createHTMLEle("div", "id", "nameValue", "class", "value");
  dataDiv1.append(nameDiv1, nameDiv2);

  let dataDiv2 = createHTMLEle("div", "class", "data");
  let typeDiv1 = createHTMLEle("div", "id", "type");
  typeDiv1.innerText = "Type";
  let typeDiv2 = createHTMLEle("div", "id", "typeValue", "class", "value");
  dataDiv2.append(typeDiv1, typeDiv2);

  let dataDiv3 = createHTMLEle("div", "class", "data");
  let addressDiv1 = createHTMLEle("div", "id", "address");
  addressDiv1.innerText = "Address";
  let addressDiv2 = createHTMLEle(
    "div",
    "id",
    "addressValue",
    "class",
    "value"
  );
  dataDiv3.append(addressDiv1, addressDiv2);

  let dataDiv4 = createHTMLEle("div", "class", "data");
  let phoneDiv1 = createHTMLEle("div", "id", "phone");
  phoneDiv1.innerText = "Phone";
  let phoneDiv2 = createHTMLEle("div", "id", "phoneValue", "class", "value");
  dataDiv4.append(phoneDiv1, phoneDiv2);

  let dataDiv5 = createHTMLEle("div", "class", "data");
  let urlDiv1 = createHTMLEle("div", "id", "url");
  urlDiv1.innerText = "Website";
  let urlDiv2 = createHTMLEle("div", "id", "urlValue", "class", "value");
  let a = document.createElement("a");
  a.setAttribute("href", "");
  a.setAttribute("target", "_blank");
  urlDiv2.append(a);

  dataDiv5.append(urlDiv1, urlDiv2);

  infoDiv.append(dataDiv1, dataDiv2, dataDiv3, dataDiv4, dataDiv5);
  cardDiv.append(infoDiv);
  r3_div2.append(cardDiv);

  let r3_div3 = createHTMLEle("div", "class", "col-lg-3");
  datarow.append(r3_div1, r3_div2, r3_div3);

  container.append(rowH, rowbtn, datarow);
  document.body.append(nav, container);
}
function createHTMLEle(tagName, attr, value1, attr1, value2, textValue) {
  let ele = document.createElement(tagName);
  ele.setAttribute(attr, value1);
  if (attr1 != null) ele.setAttribute(attr1, value2);
  if (textValue != null) ele.innerText = textValue;

  return ele;
}
