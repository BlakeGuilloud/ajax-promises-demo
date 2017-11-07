$('#submit').on('click', () => {
  return new Promise((resolve, reject) => { // Declare a new Promise 
    return fetch('https://jsonplaceholder.typicode.com/users') // Make AJAX request to placeholder users.
      .then((response) => {
        return response.json(); // Turn the fetch response into consumable JSON
      })
      .then((users) => {
        var username = $('#username').val(); // Retrieve the value from input with an id of "username"

        var foundUser = users.find((user) => { // User Array.prototype.find to find a matching user.
          return user.username === username;
        });

        if (foundUser) { // If a user was found in the database, reject this Promise to bubble out to the outer-catch
          reject('User found');
        } else { // Else resolve the value on the username input field for our 'then' block
          resolve(username);
        }
      })
  })
  .then((username) => { // This will only trigger if foundUser on line 14 was false.
    // Make AJAX request to create a new user.
    $('#feedback').html('Make a new user with this data: ' + username);
  })
  .catch((err) => { // Append whatever error message is returned from the promise rejecting.
    $('#feedback').html(err);
  });
  
})