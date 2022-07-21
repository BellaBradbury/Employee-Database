const url = "https://randomuser.me/api/1.4/?results=12&nat=us&inc=index,name,location,email,dob,cell,picture";
const database = document.querySelector('#employees');
const searchInput = document.querySelector('input').value.toLowerCase();
let employeeArr = [];

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


// SEARCHES TO SEE IF SEARCH FIELD INPUT MATCHES A LISTED EMPLOYEE
// function searchBar(e) {
//   data.forEach( employeeName => {
//     if (searchInput === )
//   );
// }
