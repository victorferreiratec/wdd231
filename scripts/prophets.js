const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets);
    displayProphets(data.prophets); // note that you reference the prophets array of the JSON data object, not just the object
}

getProphetData();

const displayProphets = (prophets) => {
     prophets.forEach((prophet) => {
        // Create elements to add to the div.cards element
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let portrait = document.createElement('img');
        let birthday = document.createElement('p');
        let place = document.createElement('p');
        
        // Build the h2 content out to show the prophet's full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        
        // Build the information of birth date
        birthday.textContent = `Date of Birth: ${prophet.birthdate}`;

        // Build the information of place of birth
        place.textContent = `Place of Birth : ${prophet.birthplace}`;

        // Build the image portrait by setting all the relevant attributes
        portrait.setAttribute('src',prophet.imageurl);
        portrait.setAttribute('alt',`Portrait of ${prophet.lastname} ${prophet.name}`);
        portrait.setAttribute('loading','lazy');
        portrait.setAttribute('width','340');
        portrait.setAttribute('heigth','440');

        // Append the section(card) with the created elements
        card.appendChild(fullName);
        card.appendChild(birthday);
        card.appendChild(place);
        card.appendChild(portrait);

        cards.appendChild(card);
    });// end of arrow function and forEach loop
}