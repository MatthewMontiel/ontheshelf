// function to sync session with logged in user
const loginUser = async (event) => {
  event.preventDefault();
  // local variables
  const email = document.querySelector("#submit-email").value.trim();
  const password = document.querySelector("#submit-password").value.trim();
  // got a light, check for matches
  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    // good match show shelf, bad match yell at user
    if (response.ok) {
      document.location.replace("/shelf");
    } else {
      alert(response.statusText);
    }
  }
};

// function for new user
const createUser = async (event) => {
  event.preventDefault();
  // local variables
  const name = document.querySelector("#create-name").value.trim();
  const email = document.querySelector("#create-email").value.trim();
  const password = document.querySelector("#create-password").value.trim();
// make sure new user not a clone
  if (name && email && password) {
    const response = await fetch("/api/users/", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    // user approved allow shelf view, disapproved user gets yelled at
    if (response.ok) {
      document.location.replace("/shelf");
    } else {
      alert(response.statusText);
    }
  }
};

// review view port to find and listen to execute functions
document
  .querySelector("#member-form").addEventListener("submit", loginUser);

document
  .querySelector("#register-form").addEventListener("submit", createUser);
