# BookStoreApp-Distributed-Application

> Account Service

There are 2 users in the system currently. 
ADMIN, USER

To Get `access_token` for the user, you need `clientId` and `clientSecret`

clientId : `defaultfirstclientid` <br />
clientSecret : `jwtpass` <br />
<br />
Admin userName: `admin.admin`  <br />
password: `jwtpass`<br />
<br />
Normal User userName: `john.doe`<br />
password: `jwtpass`
<br />

*To get the accessToken (Admin User)* 

```curl defaultfirstclientid:jwtpass@localhost:4001/oauth/token -d grant_type=password -d username=admin.admin -d password=jwtpass```

<br />

![Untitled Diagram](https://user-images.githubusercontent.com/14878408/58747472-a98e3580-8420-11e9-850f-c7fba99d8d1d.jpg)
