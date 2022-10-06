const url = "https://randomuser.me/api/1.4/?results=12&nat=us&inc=name,location,email,dob,cell,picture";

const pageHeader = document.querySelector('.header');
const database = document.querySelector('#employees');
const emCard = document.getElementsByClassName('emCard');

const emWindow = document.getElementById('#window');
const windowContent = document.querySelector('.window-content');
const thumbItem = document.getElementsByClassName('thumbItem');

let employeeArr = [];
let nameArr = [];

// FETCHES 12 RANDOM UNITED STATES "EMPLOYEES"
  // WITH FULL NAME, FULL LOCATION, EMIAL, DOB, CELL #, AND PICTURE
function fetchData() {
  return fetch(url)
    .then( response => response.json() )
    .then( info => {
      const data = info.results;
      employeeArr = info.results;
      createEmployee(info.results);
    })
    .catch( error => console.log('ERROR:', error) );
}

fetchData();

// CREATES EMPLOYEE CARDS TO DISPLAY ON BASE PAGE
function createEmployee(data) {
  data.map( ( employee, index ) => {
    let pfp = `${employee.picture.medium}`;
    let name = `${employee.name.first} ${employee.name.last}`;
    let email = `${employee.email}`;
    let city = `${employee.location.city}`;
    let state = `${employee.location.state}`;

    const emCardInfo = `
      <div class='flex-item emCard' data-index=${index} >
        <img src="${pfp}">
        <div>
          <h2>${name}</h2>
          <p>${email}</p>
          <p>${city}, ${state}</p>
          </div>
      </div>
    `;

    // adds each employee's name to nameArr
    let searchName = name.toLowerCase();
    nameArr.push(searchName);

    // displays employee card on base page
    database.insertAdjacentHTML('beforeend', emCardInfo);
  });
}

// MAKES AN EMPLOYEE'S SECTION CLICKABLE TO REVEAL OVERLAY
function createModal(index) {
  const employee = employeeArr[index];

  let pic = `${employee.picture.large}`;
  let name = `${employee.name.first} ${employee.name.last}`;
  let email = `${employee.email}`;
  let city = `${employee.location.city}`;
  let state = `${employee.location.state}`;
  let phone = `${employee.cell}`;
  let address = `${employee.location.street.number} ${employee.location.street.name}, ${city}, ${state}, ${employee.location.postcode}`;
  let xDOB = `${employee.dob.date}`;

  function getDOB(data) {
    let birthday = xDOB.replace(/[^\d]/g, '');
    birthday = birthday.replace(/(\d{4})(\d{2})(\d{2})(\d+)/, "$2/$3/$1");
    return birthday;
  }

  let dob = getDOB(xDOB);

  // creates modal html & inserts it into window
  const emWindowInfo = `
    <div class="grey overlay">
      <div class='emModal' >
        <button type="submit" class="exit-btn">X</button>
        <img src="${pic}" class="pic">
        <div class="thumb-text">
          <h2 class="thumbItem name">${name}</h2>
          <p class='thumbItem'>${email}</p>
          <p class="thumbItem">${city}</p>
          <hr class="thumbItem">
          <p class="thumbItem">${phone}</p>
          <p class="thumbItem">${address}</p>
          <p class="thumbItem">Birthday: ${dob}</p>
        </div>
      </div>

      <div class="page-btns">
        <button type="submit" class="left-btn pg-btn hidden">&lt;</button>
        <button type="submit" class="right-btn pg-btn hidden">&gt;</button>
      </div>
    </div>
  `;

  windowContent.innerHTML = emWindowInfo;

  // allows modal to close (*not refresh*) unpon click of exit button
  const exitBtn = document.querySelector('.exit-btn');
  const overlay = document.querySelector('.overlay');

  exitBtn.addEventListener( 'click', e => {
    overlay.style.display = 'none';
  });

  // replaces modal html with previous employee upon left button click
    // & hides left button on first employee
  const leftBtn = document.querySelector('.left-btn');

  if (index > 0) {
    leftBtn.classList.remove('hidden');
  }

  leftBtn.addEventListener( 'click', e => {
    const previous = index - 1;
    createModal(previous);
  });

  // replaces modal html with next employee upon right button click
    // & hides right button on last employee
  const rightBtn = document.querySelector('.right-btn');

  if (index < 11) {
    rightBtn.classList.remove('hidden');
  }

  rightBtn.addEventListener( 'click', e => {
    let next = parseInt(index) + 1;
    createModal(next);
  });
}

// CREATES MODAL UNPON EMPLOYEE CARD CLICK
database.addEventListener( 'click', e => {
  const index = e.target.closest('.emCard').dataset.index;
  createModal(index);
});

// CREATES AND INSERTS SEARCH BAR ONTO BASE PAGE
let searchBar = `
  <label for="search" class="search-form">
    <input id="user-search" placeholder="Search by name...">
    <button type="button" class="search-btn">SEARCH</button>
  </label>
`;

pageHeader.insertAdjacentHTML('beforeend', searchBar);

// CHECKS USER INPUT AGAINST KNOWN PROFILES AND DISPLAYS THEM
let searchInput = document.querySelector('#user-search');
let searchValue = searchInput.value.toLowerCase();

console.log(nameArr);
console.log(nameArr.length);

function searchEmployees () {
  for ( let i = 0; i < nameArr.length; i++ ) {
    if ( nameArr[i].includes(searchValue) ) {
      emCard.style.display = 'block';
    } else {
      emCard.style.display = 'none';
    }
  }
}

// CALLS SEARCH FUNCTION
const searchBtn = document.querySelector('.search-btn');

searchInput.addEventListener('keyup', (event) => {
  searchEmployees(searchValue, nameArr);
});

searchBtn.addEventListener('submit', (event) => {
  searchEmployees(searchValue, nameArr);
});
