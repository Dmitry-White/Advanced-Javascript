const App = () => {
  const PRODUCTS_YAML_URL = '/js/data/products.yml';
  const PEOPLE_YAML_URL = '/js/data/people.yml';

  const displayProductsYAML = (data) => {
    const productDataYAML = YAML.stringify(data);
    console.log(productDataYAML);

    const productsYaml = YAML.load(PRODUCTS_YAML_URL);

    displayProducts(productsYaml);
  };

  const displayPeopleYAML = (data) => {
    const peopleDataYAML = YAML.stringify(data);
    console.log(peopleDataYAML);

    const peopleYaml = YAML.load(PEOPLE_YAML_URL);

    displayPeople(peopleYaml);
  };

  const displayProductsXML = (data) => {
    const j2x = json2xml(data);
    const section = document.querySelector(".product-list");
    section.innerHTML = j2x;
  }

  const displayPeopleXML = (data) => {
    const parser = new DOMParser();
    const peopleDataNode = parser.parseFromString(data, 'text/xml');
    const peopleDataJson = xml2json(peopleDataNode, '');
    const parsedData = JSON.parse(peopleDataJson);

    const fragment = document.createDocumentFragment();

    const section = document.querySelector(".people-cards");
    const item = document.createElement("div");
    const image = document.createElement("img");
    const cardInfo = document.createElement("div");
    const cardName = document.createElement("h3");
    const cardTitle = document.createElement("h4");
    const cardText = document.createElement("p");

    let person = EMPTY_OBJECT;

    item.className = "person-card";
    cardInfo.className = "card-info";
    cardName.className = "card-name";
    cardTitle.className = "card-title";
    cardText.className = "card-text";

    cardInfo.appendChild(cardName);
    cardInfo.appendChild(cardTitle);
    item.appendChild(image);
    item.appendChild(cardInfo);
    item.appendChild(cardText);

    parsedData.people.div.forEach((el) => {
      person = item.cloneNode(true);

      const currentImage = person.querySelector("img");
      currentImage.src = el.img["@src"];
      currentImage.alt = el.img["@alt"];

      person.querySelector(".card-name").innerHTML = el.div.h3["#text"];
      person.querySelector(".card-title").innerHTML = el.div.h4["#text"];
      person.querySelector(".card-text").innerHTML = el.p["#text"];

      fragment.appendChild(person);
    });
    section.appendChild(fragment);
  };

  const displayProducts = (data) => {
    // create document fragment and template for each product
    const fragment = document.createDocumentFragment();
    
    const section = document.querySelector(".product-list");
    const item = document.createElement("li");
    const image = document.createElement("img");
    const text = document.createElement("h2");

    let product = EMPTY_OBJECT;

    item.className = "product-item";
    image.className = "product-image";
    text.className = "product-name";

    item.appendChild(image);
    item.appendChild(text);

    // create a document node for each product and add it to the document fragment
    data.products.forEach((el) => {
      product = item.cloneNode(true);

      const currentImage = product.querySelector(".product-image");
      currentImage.src = "images/products/" + el.image;
      currentImage.alt = el.alt;

      product.querySelector(".product-name").innerHTML = el.name;

      fragment.appendChild(product);
    });

    // insert the document fragment at the appropriate place in the document
    section.appendChild(fragment);
  }

  const displayPeople = (data) => {
    const fragment = document.createDocumentFragment();

    const section = document.querySelector(".people-cards");
    const item = document.createElement("div");
    const image = document.createElement("img");
    const cardInfo = document.createElement("div");
    const cardName = document.createElement("h3");
    const cardTitle = document.createElement("h4");
    const cardText = document.createElement("p");

    let person = EMPTY_OBJECT;

    item.className = "person-card";
    cardInfo.className = "card-info";
    cardName.className = "card-name";
    cardTitle.className = "card-title";
    cardText.className = "card-text";

    cardInfo.appendChild(cardName);
    cardInfo.appendChild(cardTitle);
    item.appendChild(image);
    item.appendChild(cardInfo);
    item.appendChild(cardText);

    // create a document node for each product and add it to the document fragment
    data.cards.forEach((el) => {
      person = item.cloneNode(true);

      const currentImage = person.querySelector("img");
      currentImage.src = "images/employees/" + el.img.src;
      currentImage.alt = el.img.alt;

      person.querySelector(".card-name").innerHTML = el.cardInfo.cardName;
      person.querySelector(".card-title").innerHTML = el.cardInfo.cardTitle;
      person.querySelector(".card-text").innerHTML = el.cardText;

      fragment.appendChild(person);
    });

    // insert the document fragment at the appropriate place in the document
    section.appendChild(fragment);
  }

  const validate = (data, schema, callback) => {
    const dataCheck = tv4.validateMultiple(data, schema);
    
    if (dataCheck.valid) {
      console.log('Valid Data');
      callback(data);
    } else {
      console.log(dataCheck);
    }
  }

  displayProductsXML(PRODUCT_DATA_XML);
  displayPeopleXML(PERSON_DATA_XML);

  displayProductsYAML(PRODUCT_DATA);
  displayPeopleYAML(PERSON_DATA);  

  validate(PRODUCT_DATA, productSchema, displayProducts);
  validate(PERSON_DATA, personSchema, displayPeople);
}

document.addEventListener("DOMContentLoaded", App);