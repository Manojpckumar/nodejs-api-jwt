

# Node JS Crud API with JWT authentication

Node JS api with JWT authentication , Express for CRUD operation on mysql database.

## To Run install npm for node_modules

```npm
npm install
```

## Install Nodemon and add it to dependancy for live update
```npm
npm install nodemon --save-dev
```

## Install Express and Mysql packages
```npm
npm install express mysql
```

## Install JWT packages
```npm
npm install jsonwebtoken
```

## Check for the scripts section inside package.json for setting up the start for nodemon
```npm
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  }
  ```

  <!-- while server.js is your node.js server file -->

## To start the server 
```npm
npm start
```

## Important
```npm
To check and work with this api use Postman or some other applications. To access the routes user need to pass the authorization token in the Authorization header that is generated when user login.
```




## API Reference

#### To get all books :

```http
  GET /books 
```
#### To get one book by its id :

```http
  GET /books/id 
```

#### To create a new book:

```http
  POST /books 
```

| Parameter          | Type     | Description                       |
| :--------          | :------- | :----------- |
| `book_title`       | `string` | **Required**.|
| `description`      | `string` | **Required**.|
| `author_name`      | `string` | **Required**.|
| `price`            | `integer` | **Required**.|


#### To get update one book information by its id :

```http
  PATCH /book 
```

| Parameter          | Type     | Description                       |
| :--------          | :------- | :----------- |
| `book_title`       | `string` | **Required**.|
| `description`      | `string` | **Required**.|
| `author_name`      | `string` | **Required**.|
| `price`            | `integer` | **Required**.|
| `id`               | `integer` | **Required**.|

#### To delete one book by its id :

```http
  DELETE /book/id 
```
