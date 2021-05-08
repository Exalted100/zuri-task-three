The entry point to start the app is "node app". It may also be started by running "npm run start".
There is a single route: "/". The actions that can be performed on the route include a get request, a post request, a put request, and a delete request.

A get request to the route provides all the data stored in the database.
A post request to the database stores new data. It accepts a name, email, and country from the request.body. The fields are required and an error would be returned if any field is omitted.
A put request to the database modifies the database. The id of the data to be modified should be available at request.query.id while the modification should be available at request.body.
A delete request deletes data from the database. The delete request would use the id available at req.query.id to find the data to delete.

The heroku link for the project is available here: https://fathomless-gorge-74793.herokuapp.com/
