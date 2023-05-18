const loginUser = async (event) => {
   event.preventDefault();
 
   // Collect values from the login form
   const email = document.querySelector('#submit-email').value.trim();
   const password = document.querySelector('#submit-password').value.trim();
 
   if (email && password) {
     // Send a POST request to the API endpoint
     const response = await fetch('/api/users/login', {
       method: 'POST',
       body: JSON.stringify({ email, password }),
       headers: { 'Content-Type': 'application/json' },
     });
 
     if (response.ok) {
       // If successful, redirect the browser to the profile page
       document.location.replace('/shelf');
     } else {
       alert(response.statusText);
     }
   }
 };
 
 const createUser = async (event) => {
   event.preventDefault();
 
   const name = document.querySelector('#create-name').value.trim();
   const email = document.querySelector('#create-email').value.trim();
   const password = document.querySelector('#create-password').value.trim();
 
   if (name && email && password) {
     const response = await fetch('/api/users/', {
       method: 'POST',
       body: JSON.stringify({ name, email, password }),
       headers: { 'Content-Type': 'application/json' },
     });
 
     if (response.ok) {
       document.location.replace('/shelf');
     } else {
       alert(response.statusText);
     }
   }
 };
 
 document
   .querySelector('.login-form')
   .addEventListener('submit', loginFormHandler);
 
 document
   .querySelector('.signup-form')
   .addEventListener('submit', signupFormHandler);
 