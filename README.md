[![Build Status](https://travis-ci.org/olorunwalawrence/BankaApp.svg?branch=develop)](https://travis-ci.org/olorunwalawrence/BankaApp) [![Coverage Status](https://coveralls.io/repos/github/olorunwalawrence/BankaApp/badge.svg?branch=develop)](https://coveralls.io/github/olorunwalawrence/BankaApp?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/c79ef30b7fbac0464d34/maintainability)](https://codeclimate.com/github/olorunwalawrence/BankaApp/maintainability)
# Banka
Banka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals. This app is meant to support a single bank, where users can signup and create bank accounts online, but must visit the branch to withdraw or deposit money..


* banka is a web application that allows users  to create bank acccount,view account transactions.

* This project motivates me  because its a challenges me a lot and its been my goal to be a web application developer

* Banka  web plication is built on JavaScript programming language, an implementation of  markup on the front-end and back-end was adequate.

How to use the application

* As a new user, navigate to the sign-up page through the link provided at the top right corner of the home page.
* fill the form and sign up

* A signed up user can also log in through their signup credentials;
you can create account, view account information, view all transaction history.
* As an admin, you can create a staff account.

* As an authenticated user, you can log in into your account via the login form provided at the home page. Only an authenticated user can log in otherwise sign up.

visit us at https://olorunwalawrence.github.io/BankaApp/UI on your browser

Programming Stack

Express
html
Nodejs
css
How To Build banka  app

Download Nodejs app on your local machine
<li><a href="https://git-scm.com/downloads">Download git bash terminal on your local machine</a></li>
<li><a href="https://www.getpostman.com/apps">Download postman app on your local machine so that you can test your routes</a></li>
</ul>
After downloading the nodejs app, you will automatically have npm installed already. Npm, is node package manager.

Then clone or download this Repo to your local machine. On your terminal, cd into the directory where you have the file downloaded to and then install the packages by typing
npm install
this will install all dependencies and dev-dependencies for the project, then run this command in your terminal:
npm start

Open the postman and test the following existing routes:

<table>
    <tr>
        <th>API</th>
        <th>HTTP verb</th>
        <th>Action</th>
    </tr>
    <!-- yet to be implemented -->
    <tr>
        <td>/api/v1/auth/signup</td>
        <td>POST</td>
        <td>Create new user</td>
    </tr>
     <!-- yet to be implemented -->
    <tr>
        <td>/api/v1/auth/login</td>
        <td>POST</td>
        <td>Sign in user</td>
    </tr>
    <tr>
        <td>/api/v1/accounts</td>
        <td>POST</td>
        <td>create new account</td>
    </tr>
     <tr>
        <td>'/account/:accountNumber'</td>
        <td>PATCH</td>
        <td>Activate or Deactivate account</td>
    </tr>
    <tr>
        <td>'/account/:accountNumber'</td>
        <td>DELETE</td>
        <td>Delete a specific account</td>
    </tr>
     <tr>
        <td>'/transactions/:accountNumber/credit'</td>
        <td>POST</td>
        <td>credit an account</td>
    </tr>
    <tr>
        <td>'/transactions/:accountNumber/debit'</td>
        <td>POST</td>
        <td>Debit an account</td>
    </tr>

   
</table>
