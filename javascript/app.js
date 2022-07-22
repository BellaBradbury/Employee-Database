const url = "https://randomuser.me/api/1.4/?results=12&nat=us&inc=index,name,location,email,dob,cell,picture";
const database = document.querySelector('#employees');
const pageHeader = document.querySelector('.header');
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
      createEmployee(info.results);
    })
    .catch( error => console.log('ERROR:', error) );
}

fetchData();

function createEmployee(data) {
  data.map( employee => {
    let name = `${employee.name.first} ${employee.name.last}`;
    let index = 0;

    const thumbnail = `
      <div class='flex-item'>
        <img src="${employee.picture.medium}">
        <div class='info'>
          <h2 class="name">${employee.name.first} ${employee.name.last}</h2>
          <p>${employee.email}</p>
          <p>${employee.location.city}, ${employee.location.state}</p>
          </div>
      </div>
    `;

    const object = {
      name
    }
    employeeArr.push(object);

    database.insertAdjacentHTML('beforeend', thumbnail);
  });
}

console.log(employeeArr);

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

// const overlay = `
// <div class='overlay'>
//   <img src="${employee.picture.medium}">
//   <h2>${employee.name.first} ${employee.name.last}</h2>
//   <p>${employee.email}</p>
//   <p>${employee.location.city}/p>
//   <hr>
//   <p>${employee.cell}</p>
//   <p>${employee.location.street}, ${employee.location.city}, ${employee.location.state}, ${employee.location.postcode}</p>
//   <p>Birthday:***BIRTHDAY***</p>
// </div>
// `;
