const { User } = require('../models/user');

// Function to create a new user
User.createUser = async (req, res) => {
  try {
    // Create a new user object based on the request body
    const newUser = new User(req.body);

    // Save the new user to the database
    await newUser.save().then((result) => {
      // If the user is successfully saved, send a success message and the new user data back to the client
      res.status(200).send({ message: 'User successfully created', data: result });
    });
  }
  catch (err) {
    // If there is an error, log the error and send an error message back to the client
    console.log(err)
    res.status(500).send({ message:'User not successfully created. ' + err });
  }
}

// Export the User object so that it can be used by other parts of the application
module.exports = { User };
