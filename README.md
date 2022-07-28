# Delivery app, test project for Eliftech school

### Install

```
git clone https://github.com/holdennekt/food-ordering-app
cd food-ordering-app
```

### Create db

For this project you'll need postgresql db installed on your machine

```
psql -c 'create database "food-delivery";'
```

### Fill config data

Create .env file in server folder with structure like this and fill your data:

```
SERVER_HOST=localhost
SERVER_PORT=4000
JWT_SECRET=hmmmWhatCanBeHere..
DB_NAME=food-ordering
DB_USER=myuser
DB_PASSWORD=mypassword
DB_HOST=localhost
DB_PORT=5432
```

### Fill initial data in db

```
node server/insertDbData.js
```

### Build & run

```
npm start
```

# Or open link
[ec2-18-212-66-88.compute-1.amazonaws.com](ec2-18-212-66-88.compute-1.amazonaws.com)