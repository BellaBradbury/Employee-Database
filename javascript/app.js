const url = "https://randomuser.me/api/1.4/?results=12&nat=us&inc=name,location,email,dob,cell,picture";

const database = document.querySelector('#employees');
const pageHeader = document.querySelector('.header');

const emWindow = document.getElementById('#window');
const thumbItems = document.querySelectorAll('.thumbnail');
const overItems = document.querySelectorAll('.overlay');

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

    const emInfo = `
      <div class='flex-item'>
        <img src="${pfp}">
        <div class='info'>
          <h2 class="name">${name}</h2>
          <p>${email}</p>
          <p class="thumbnail">${city}, ${state}</p>
          <p class="overlay">${city}/p>
          <hr class="overlay">
          <p class="overlay">${phone}</p>
          <p class="overlay">${address}</p>
          <p class="overlay">${dob}</p>
          </div>
      </div>
    `;

    overItems.classList.add('hidden');

    const object = {
      emNumber,
      pfp,
      name,
      email,
      city,
      state,
      phone,
      address,
      dob
    }
    employeeArr.push(object);

    database.insertAdjacentHTML('beforeend', emInfo);
  });
}

console.log(employeeArr);

// MAKES AN EMPLOYEE'S SECTION CLICKABLE TO REVEAL OVERLAY

database.addEventListener( 'click', e => {
  if (e.target === database ) {
    const liveEmployee = e.target.closest('.flex-item');

    thumbItems.classList.add('hidden');
    overItems.classList.remove('hidden');
    overItems.classList.add('active');
  }
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
