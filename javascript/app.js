const url = "https://randomuser.me/api/1.4/?results=12&nat=us&inc=name,location,email,dob,cell,picture";

const database = document.querySelector('#employees');
const pageHeader = document.querySelector('.header');

const emCard = document.getElementsByClassName('emCard');

const emWindow = document.getElementById('#window');
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
  let emNumber = 0;

  data.map( employee => {
    emNumber += 1;

    let pfp = `${employee.picture.medium}`;
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

    const emCardInfo = `
      <div class='flex-item ${emNumber} emCard' >
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

function createModal(emCard, employeeArr) {
  const emWindowInfo = `
    <div class='${emNumber} emModal' >
      <img src="${pfp}">
      <div>
        <h2 class="thumbItem">${name}</h2>
        <p class='thumbItem'>${email}</p>
        <p class="thumbItem">${city}/p>
        <hr class="thumbItem">
        <p class="thumbItem">${phone}</p>
        <p class="thumbItem">${address}</p>
        <p class="thumbItem">${dob}</p>
        </div>
    </div>
  `;

  emWindow.insertAdjacentHTML('beforeend', emWindowInfo);
}

database.addEventListener( 'click', e => {
  createModal();
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
