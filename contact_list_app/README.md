# contact-list-app
The app that can be used with [Postman Essential Training](https://www.linkedin.com/learning/postman-essential-training-21969591) and [The Complete Software Tester](https://www.amazon.com/Complete-Software-Tester-Strategies-High-Quality-ebook/dp/B09NGVVCJ9) [Github](https://github.com/kristinjackvony/contact-list-app)


# Contact List App - Server Setup
This guide explains how to set up and run the server for the Contact List App.

### Clone the Repository
    git clone https://github.com/Hanbub/test_automation_frameworks.git
    cd ./contact_list_app

### Install Dependencies
    npm install

### Configure Environment Variables
Edit `.env` file in the `contact_list_app` directory and add the following content:

    JWT_SECRET=PUT_HERE_JWT
    PORT=3000
    MONGO_URL=mongodb://localhost:27017/mydatabase

### Start the Server
    node ./contact_list_app/src/index.js


The server should now be running at:
    http://localhost:3000

Make sure MongoDB is running before starting the server and add "mydatabase"
This server is intended to work with a frontend client, but it can be tested independently using tools like Postman or curl.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 16.x or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (local or cloud-based MongoDB instance)