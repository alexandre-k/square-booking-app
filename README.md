# square-booking-app
App for Square Unboxed Hackathon

## Prepare
### Square API
Go to https://developer.squareup.com/apps/
Get your `Sandbox Application ID` and `Sandbox Access Token`.
Set your environment variables as exportable variables under a Bash shell. Windows is not supported.

### OAuth
Under development but at the moment Auth0 is being used. Creating an account is needed, but a custom authentication server will likely be used.

### Database
MongoDB is used as a database. A password should be randomly created. We suggest reusing passwords generated in Bitwarden, `pwgen` or any other password generator.

## Run
```
docker-compose build
docker-compose up
```

## Access the React app

Go to your browser and enter `http://localhost:3000` in the URL. Any other port can be used instead if 3000 is already being used. See the default in `docker-compose.yml`.
