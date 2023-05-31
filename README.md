# Surf Store

Welcome to the Surf Store repository! This is a web application developed as part of the final project for the Web Application Development course. The Surf Store is an online store that sells surf-related products and provides additional features such as a shopping cart, integration with webcams on beaches, Twitter API integration, chat functionality using web sockets,etc. This README.md file provides an overview of the project, its features, and instructions for running and contributing to the project.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Features

The Surf Store offers the following features:

1. Surf Staff Shop: Browse and purchase surf-related products.
2. Shop Cart: Add items to your cart, view the cart, and proceed to checkout.
3. Webcams: View live feeds from webcams placed in various beaches.
4. Twitter API: Access the latest surf-related tweets and trends.
5. Chat Web Socket: Engage in real-time chat with other users on the website.
6. Login: Create an account, log in, and manage your profile information.

## Technologies Used

The following technologies were used in the development of this project:

- Front-end:
  - HTML, CSS, JavaScript
  - jQuery for DOM manipulation and AJAX requests
  - Bootstrap for styling

- Back-end:
  - Node.js with Express.js as the web server framework
  - MongoDB for the database
  - Mongoose as the MongoDB object modeling tool

- APIs:
  - Webcams API for live webcam feeds
  - Twitter API for surf-related tweets and trends

- Additional Libraries and Tools:
  - Socket.IO for real-time chat functionality

## Installation

To set up the Surf Store project on your local machine, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Surf-Store/Web-Surf-Store.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Web-Surf-Store
   ```
   
3. Create a `.env` file in the `backend/config` directory and provide the necessary environment variables. Refer to the `.env.example` file for the required variables.

4. Start the development server:

   ```bash
   cd ../backend
   npm start
   ```
   This will start the back-end development server.

5. Open your browser and visit `http://localhost:3000` to access the Surf Store.

## Usage

Once you have the project set up and running, you can start exploring the Surf Store and its various features. Here are some guidelines for using the different functionalities:

- Surf Staff Shop:
  - Browse the available surf-related products.
  - Add desired products to your cart by clicking the "Add to Cart" button.
  - View and manage your cart by clicking the cart icon in the header.
  - Proceed to checkout by following the provided steps.

- Webcams:
  - Access the "Webcams" section to view live feeds from different beaches.
  - Click on a webcam feed to enlarge it.

- Twitter API:
  - Check the "Twitter" section to see the latest surf-related tweets and trends.
- Chat Web Socket:
  - Engage in real-time chat with other users on the website.
  - Use the chat feature to discuss surfing, ask questions, or interact with fellow surf enthusiasts.
- Login:
  - Create a new account or log in using existing credentials.
  - Manage your profile information, including email and password.

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute the code as per the terms of the license.

 
