# Delivery app, test project for *Eliftech school*

### 1. Install

Clone git repo:

```
git clone https://github.com/holdennekt/food-ordering-app
```

### 2. Create db

For this project you'll need [postgresql](https://www.postgresql.org/download) db installed on your machine.

```
psql -c 'create database "food-delivery";'
```

### 3. Fill config data

Create **.env** file in server folder with structure like this and fill your data:

```
SERVER_HOST=localhost
SERVER_PORT=4000
JWT_SECRET=hmmmWhatCanBeHere..
DB_NAME=food-delivery
DB_USER=myuser
DB_PASSWORD=mypassword
DB_HOST=localhost
DB_PORT=5432
```

### 4. Change directory:

```
cd food-ordering-app
```

### 5. Fill initial data in db

```
node server/insertDbData.js
```

### 6. Build & run

```
npm start
```

## Or follow the link
[http://ec2-18-212-66-88.compute-1.amazonaws.com](http://ec2-18-212-66-88.compute-1.amazonaws.com)
