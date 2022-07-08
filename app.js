const url = "https://randomuser.me/api/1.4/?results=12&nat=us&inc=name,location,email,dob,cell,picture";
const database = document.querySelector('#employees');

// FETCHES 12 RANDOM UNITED STATES "EMPLOYEES"
  // WITH FULL NAME, FULL LOCATION, EMIAL, DOB, CELL #, AND PICTURE
function fetchData() {
  fetch(url)
    .then( response => response.json() )
    .then( info => createEmployee(info.results))
    .catch( error => console.log('ERROR:', error) );
}

fetchData();

function createEmployee(data) {
  data.forEach( employee => {
    const thumbnail = `
      <div class='flex-item'>
        <img src="${employee.picture.thumbnail}">
        <h2>${employee.name.first} ${employee.name.last}</h2>
        <p>${employee.email}</p>
        <p>${employee.location.city}, ${employee.location.state}</p>
      </div>
    `;
    database.insertAdjacentHTML('beforeend', thumbnail);
  });
}


// const overlay = `
// <div class='overlay'>
//   <img src="${employee.picture.thumbnail}">
//   <h2>${employee.name.first} ${employee.name.last}</h2>
//   <p>${employee.email}</p>
//   <p>${employee.location.city}/p>
//   <hr>
//   <p>${employee.cell}</p>
//   <p>${employee.location.street}, ${employee.location.city}, ${employee.location.state}, ${employee.location.postcode}</p>
//   <p>Birthday:***BIRTHDAY***</p>
// </div>
// `;
