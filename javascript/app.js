const url = "https://randomuser.me/api/1.4/?results=12&nat=us&inc=name,location,email,dob,cell,picture";

const database = document.querySelector('#employees');
const pageHeader = document.querySelector('.header');

const emCard = document.getElementsByClassName('emCard');

const emWindow = document.getElementById('#window');
const windowContent = document.querySelector('.window-content');
const thumbItem = document.getElementsByClassName('thumbItem');

const userSearch = document.getElementById('#search');
let employeeArr = [];
let searchArr = [];

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

function createEmployee(data) {
  // let emNumber = 0;

  data.map( ( employee, index ) => {
    // emNumber += 1;

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

  const exitBtn = document.querySelector('.exit-btn');
  const overlay = document.querySelector('.overlay');

  exitBtn.addEventListener( 'click', e => {
    overlay.style.display = 'none';
  });

  const leftBtn = document.querySelector('.left-btn');
  const rightBtn = document.querySelector('.right-btn');

  if (index > 0) {
    leftBtn.classList.remove('hidden');
  }

  if (index < 11) {
    rightBtn.classList.remove('hidden');
  }

  leftBtn.addEventListener( 'click', e => {
    const previous = index - 1;
    createModal(previous);
  });

  rightBtn.addEventListener( 'click', e => {
    let next = parseInt(index) + 1;
    createModal(next);
  });
}

database.addEventListener( 'click', e => {
  const index = e.target.closest('.emCard').dataset.index;
  createModal(index);
});

// CREATES AND INSERTS SEARCH BAR ONTO BASE PAGE
let searchBar = `
  <label for="search" class="search-form">
    <input id="search" placeholder="Search by name...">
    <button type="button" class="search-btn">SEARCH</button>
  </label>
`;

pageHeader.insertAdjacentHTML('beforeend', searchBar);

// CHECKS USER INPUT AGAINST KNOWN PROFILES AND DISPLAYS THEM
// const searchEmployees = (searchValue, employeeArr) => {
//
//   for ( let i = 0; i < employeeArr.length; i++ ) {
//     if ( employeeArr[i].includes(searchValue) ) {
//       searchArr.push(employeeArr[i]);
//     }
//   }
//     createEmployee(searchArr,1);
// };
//
// console.log(searchArr);

// CALLS SEARCH FUNCTION
// userSearch.addEventListener('keyup', (event) => {
//   let searchInput = event.target.value.toLowerCase();
//   searchEmployees(searchInput);
// });
