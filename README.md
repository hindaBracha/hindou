Vacation Rentals Management System
Description
A system for managing vacation rental properties. Publishers can add, update, and manage properties, cities, and categories. Clients can search and filter properties, view details including weather forecasts.

Features
Authentication: JWT-based for both publishers and clients.
City Management: Add cities, get real-time weather.
Category Management: Add categories.
Property Management: Add, update, delete properties.
Search: Filter properties by city, category, price, beds.
API Endpoints
Publisher: Register, login, add city/category, add/update/delete properties.
Client: Register, login, view/search properties by city/category/beds/price.
Weather: Current weather and forecast for properties.
Technologies
Node.js, Express, MongoDB
JWT, bcrypt for authentication
Nodemailer for email notifications
How to Run
Clone the repo:
git clone https://github.com/hindaBracha/hindou.git
Install dependencies:
npm install
Set up .env with necessary keys.
Run server:
npm start
