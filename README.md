# FakeCommerce

## Why?

WHile conducting a training session on ReactJs, I had to supply my students APIs for their implementation. Got so many options in Web but couldnt be satisfied. So built this one as dummy project. Hope it can help others as well.

## How to

you can fetch data with any kind of methods you know(fetch API, Axios, jquery ajax,...)

## Pre-requisites

1. NodeJs
2. MongoDb
3. Npm

## How To Run

1. At first clone the project.
2. Run `yarn` or `npm install` to install all the dependencies
3. The system will run on `port: 8080`. You can modify it by changing the port in `server.js` or adding an `env` variable.
4. Once installed, run `yarn start` or `npm start`
5. The API url will be `localhost:{PORT}/{ROUTES}`

### Get all products

```js
fetch("{BASE_URL}/products")
    .then((res) => res.json())
    .then((json) => console.log(json));
```

### Get a single product

```js
fetch("{BASE_URL}/products/1")
    .then((res) => res.json())
    .then((json) => console.log(json));
```

### Add new product

##### Dependency

Required Admin User account

```js
fetch("{BASE_URL}/products", {
    method: "POST",
    headers: {
        authorization:"bearer {TOKEN}"  
    },
    body: JSON.stringify({
        title: "test product",
        price: 13.5,
        description: "lorem ipsum set",
        image: "BASE64",
        stock: 123,
        category:{
            _id:"1234"
        } 
    }),
})
    .then((res) => res.json())
    .then((json) => console.log(json));
```

### Get a product in a particular category ID

```js
fetch("{BASE_URL}/products/category/1234")
    .then((res) => res.json())
    .then((json) => console.log(json));
```

### Edit Product

Required Admin User account

```js
fetch("{BASE_URL}/products/213123", {
    method: "PATCH",
    body: JSON.stringify({
        title: "test product",
        price: 13.5,
        description: "lorem ipsum set",
        image: "BASE64",
        stock: 123,
        category_id: "1234",
    }),
})
    .then((res) => res.json())
    .then((json) => console.log(json));
```

### Delete Product

Required Admin User account

```js
fetch("{BASE_URL}/products/213123", {
    method: "DELETE",
})
    .then((res) => res.json())
    .then((json) => console.log(json));
```

# Category

### Get Category List

```js
fetch("{BASE_URL}/category")
    .then((res) => res.json())
    .then((json) => console.log(json));
```

### Create a Category

Require Admin Account

```js
fetch("{BASE_URL}/category", {
    method: "POST",
    body: JSON.stringify({
        name: "test Category",
        description: "Description",
    }),
})
    .then((res) => res.json())
    .then((json) => console.log(json));
```

### Edit a Category

Require Admin Account

```js
fetch("{BASE_URL}/category/{ID}", {
    method: "PATCH",
    body: JSON.stringify({
        name: "test Category",
        description: "Description",
    }),
})
    .then((res) => res.json())
    .then((json) => console.log(json));
```

### Delete a Category

Require Admin Account

```js
fetch("{BASE_URL}/category/{ID}", {
    method: "DELETE",
})
    .then((res) => res.json())
    .then((json) => console.log(json));
```

# Cart

### Get Cart

Require User Authentication

```js
fetch("{BASE_URL}/cart")
    .then((res) => res.json())
    .then((json) => console.log(json));
```

### Get Cart

Require User Authentication

```js
fetch('{BASE_URL}/cart',
{
  method: 'POST',{
      "product":{
  		"id": "6059fbefe439202d2bd1120a",
  		"quantity" : 1
  	},
  }
})
	.then((res) => res.json())
	.then((json) => console.log(json));
```

# Order

### Get All Order List

Require Admin Authentication

```js
fetch("{BASE_URL}/order")
    .then((res) => res.json())
    .then((json) => console.log(json));
```

### Checkout a Cart

Require User Authentication

```js
fetch("{BASE_URL}/order/checkout")
    .then((res) => res.json())
    .then((json) => console.log(json));
```

### Update an Order

Require User Authentication

```js
fetch('{BASE_URL}/order/{ID}',{
  method: 'PATCH',
  {
      Status: any of [0,1,2]
  }
})
	.then((res) => res.json())
	.then((json) => console.log(json));
```

    # USER

### SignUP

```js
fetch('{BASE_URL}/signup',{
  method: "POST",{
      email: "test@gmail.com",
		username: 'username',
		password: 'password',
		firstname: 'First name',
		lastname: 'Last name',
		address: {
			city: 'Address',
			street:'Address',
			number: 'Address'
			zipcode: 'Address',
			geolocation: {
				lat: 'LAT',
				long:'LONG',
			},
		},
		phone: 'Phone Number',
  }
})
	.then((res) => res.json())
	.then((json) => console.log(json));
```

### SignIn

```js
fetch('{BASE_URL}/signin',{
  method: "POST",{
      email: "test@gmail.com",
		password: 'password',
  }
})
	.then((res) => res.json())
	.then((json) => console.log(json));
```

## ToDo

-   Add graphql support
-   Add pagination
-   Add another language support

```

```
