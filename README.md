### https://blockcerts-dapp.herokuapp.com/api/v1/auth POST PUBLIC

- - req:

```
{
    "username":"admin@691#!",
    "password":"admin@691#!"
}
```

- res:

```
{
    "status": 200,
    "message": "Logged in succcessfully",
    "data": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQDY5MSMhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTk3Mjk4MDIyLCJleHAiOjE1OTcyOTg2MjJ9.gjaHRKPkjteK4hSjoAGKKxiwin9-61F5ONVvz1vfS9I"
}
```

### https://blockcerts-dapp.herokuapp.com/api/v1/auth/login POST PUBLIC

- req:

```
{
    "username":"123456",
    "password":"123456"

}
```

- res:

```
{
    "status": 200,
    "message": "Logged in Successfully",
    "data": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyZW1haWwiOiIxMjM0NTYiLCJuYW1lIjoiU3Vqb3kgRGV2IiwiaWF0IjoxNTk3Mjk3OTgzLCJleHAiOjE1OTczMDE1ODN9.kgt4DM2gPMgBo6U5-xyhjjkHJBItKp7aJuI0oSawZX4"
}
```

### https://blockcerts-dapp.herokuapp.com/api/v1/auth/register POST PUBLIC

- req:

```
{
    "fname": "Sujoy",
    "lname": "Dev",
    "email": "123456",
    "phone": "1234567890",
    "password": "123456"
}
```

- res:

```
{
    "message": "Registered Successfully",
    "data": "123456"
}
```

### https://blockcerts-dapp.herokuapp.com/api/v1/protected/addCerts POST PRIVATE

- req:

```
{
    "cert": [
        {
            "email": "sujoydev99@gmail.com",
            "zdczs": "zsc"
        }
    ]
    "svg":"filename.svg"
}
```

- res:

```
{
"message":"Data will be updated shortly on the blockchain network"
}
```

### https://blockcerts-dapp.herokuapp.com/api/v1/protected/email@email.com GET PRIVATE

- res:

```
{
    "message": "certifictaes found",
    "data": []
}
```

### https://blockcerts-dapp.herokuapp.com/api/v1/public/single/id_of_cert GET PUBLIC

- res:

```
{
    "result":
	    {
            "email": "rutwik",
            "Column 2": "2-Jan",
            "Column 3": "3-Jan",
            "Column 4": "4-Jan"
	    }
}
```
