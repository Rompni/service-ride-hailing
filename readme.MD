# SERVICE RIDE HAILING SIMPLE

## Running:

1. `yarn install`
2. `nvm use` : You need to install nvm and node version v16.15.1
3. you need to have all enviroment variables in .env file
4. `yarn typeorm:create` : Create database
5. `yarn typeorm:run` : Run migrations
6. `yarn typeorm:inject` : To create 2 riders and 2 drivers
7. `yarn start` : To start the server

## Information about data

### Drivers

    tempmail@driver.com: testpassword - user_id: 4ce17eae-fe7a-11ed-be56-0242ac120002 - driverId: c2dc2bfe-fe7a-11ed-be56-0242ac120002
    tempmail1@driver.com: testpassword - user_id: a4b11f60-fe7d-11ed-be56-0242ac120002 - driverId: c2dc2bfe-fe7a-11ed-be56-0242ac120003


### Riders

    tempmail2@rider.com': testpassword
    tempmail3@rider.com': testpassword

## Endpoints

-  `POST /api/v1/rider/payment-method` : Create a payment method for a rider

```
{
    "cardToken": "tok_test_53031_84B717C0248a39Eb1604e65f1c44FA4d"
}
```

`cardToken` is credid card tokenized

-  `post /api/v1/ride/` : Create a ride by a rider

```
{
    "paymentMethodId": "1c2f825d-4f90-422c-93d9-b16731b56608"
}
```

`paymentMethodId`: is the id of the payment method created by the rider

-  `post /api/v1/ride/finish` : Finish a ride by a driver

```
{
    "rideId": "af9ce021-a62b-48c5-a4da-f38a19248b94",
    "destination": {
        "lat": 10,
        "long": 10
    }
}
```

`rideId`: is the id of the ride created by the rider
`destination`: is the destination of the ride (lat and long)

-  `post /api/v1/auth/login` : Login a user (rider or driver) and return a token to use in the other endpoints

```
{
    "email": "rompni@gmail.com",
    "password": "rompni"
}

```

`email`: is the email of the user
`password`: is the password of the user

## Running

1. Login with a rider and create a payment method with the token card `POST /api/v1/rider/payment-method`
2. Create a ride with the id of payment method created `post /api/v1/ride/`
3. Login with a driver and finish the ride with the id and ubication(lat-long) `post /api/v1/ride/finish`
4. You can see the transaction of the ride using the payments API
