# Email Sender API (Serverless Framework - Local Simulation)

[![serverless](https://img.shields.io/badge/serverless-framework-orange?logo=serverless)](https://www.serverless.com/)
[![Node.js](https://img.shields.io/badge/node.js-lts-green?logo=node.js)](https://nodejs.org/)
[![local development](https://img.shields.io/badge/local--dev-serverless--offline-blue)](https://www.npmjs.com/package/serverless-offline)
---

This project provides a simple REST API built with the Serverless Framework. It's designed to **simulate sending emails**—taking a `receiver_email`, `subject`, and `body_text` as input. It's configured to run locally using [serverless-offline](https://github.com/dherault/serverless-offline), making it easy to develop and test without deploying to a cloud provider.

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Running Locally](#running-locally)
- [Testing the API](#testing-the-api)
- [Future Enhancements](#future-enhancements)

---

## Introduction

This serverless service demonstrates a basic email sending API. While it currently **simulates sending emails**, the structure is ready for integration with real email services like AWS SES, SendGrid, or Nodemailer. It focuses on setting up a local development environment using the Serverless Framework and serverless-offline, complete with robust input validation and error handling.

---

## Features

- **REST API Endpoint:** `POST /send-email`
- **Input Parameters:** `receiver_email`, `subject`, `body_text`
- **Local Execution:** Runs entirely on your machine using serverless-offline.
- **Input Validation:**
- Checks for missing required fields.
- Basic validation for `receiver_email` format.
- Handles invalid JSON requests.
- **Error Handling:** Returns appropriate HTTP status codes (`200 OK`, `400 Bad Request`, `500 Internal Server Error`).
- **Email Sending Simulation:** Logs email details to the console instead of sending real emails.

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js (LTS version recommended)**
Download from [https://nodejs.org/](https://nodejs.org/)
- **Serverless Framework CLI**
Install globally:
```bash
npm install -g serverless
```
- **A Text Editor / IDE**
(e.g., VS Code, Sublime Text, Notepad++)

---

## Project Structure

```
email-sender-api/
├── node_modules/ # Directory for installed npm packages
├── .gitignore # Specifies intentionally untracked files to ignore
├── handler.js # The AWS Lambda function logic for sending emails
├── package.json # Defines project metadata and dependencies
├── package-lock.json # Records the exact versions of dependencies
├── README.md # This file
└── serverless.yml # The Serverless Framework configuration file
```

- **serverless.yml:** Core configuration file for your Serverless service (functions, events, provider settings, plugins).
- **handler.js:** Contains the JavaScript logic for the Lambda function (`sendEmail`), including input processing, validation, and simulated email sending.
- **package.json:** Lists dependencies (e.g., `serverless-offline`) and scripts (e.g., `npm start` to run the offline server).

---

## Setup Instructions

Follow these steps to get the project running on your local machine:

1. **Navigate to Your Projects Folder:**
```bash
cd path/to/your/projects/folder
```
_Replace `path/to/your/projects/folder` with your actual directory path._

2. **Create the Serverless Service:**
```bash
serverless
```
- Select **AWS / Node.js / HTTP API** when prompted.
- Enter `email-sender-api` for the project name.
- Choose **Login/Register** and complete the process in your web browser.
- Choose **Skip Adding An App** if asked.

3. **Navigate into the Project Directory:**
```bash
cd email-sender-api
```

4. **Install Dependencies:**
```bash
npm install serverless-offline --save-dev
```

---

## Running Locally

1. Open your terminal and navigate to the `email-sender-api` directory.
2. Start the local Serverless Offline server:
```bash
npm start
```
3. You should see output indicating that serverless-offline is running and your API is available at
`http://localhost:3000/dev/send-email`.

---

## Testing the API

Open a new terminal window (do **not** close the `npm start` window).

Use `curl` (or Postman/Insomnia) to send HTTP POST requests to your local API endpoint.

### 1. **Test a Successful Email Send**

```bash
curl -X POST http://localhost:3000/dev/send-email \
-H "Content-Type: application/json" \
-d '{"receiver_email": "test@example.com", "subject": "Hello from Serverless API", "body_text": "This is a test email sent from your local serverless API."}'
```

**Expected Response (HTTP 200 OK):**
```json
{
"message": "Email request received and processed successfully.",
"details": {
"receiver_email": "test@example.com",
"subject": "Hello from Serverless API"
}
}
```
_In the `npm start` terminal, you will see logs simulating the email send._

---

### 2. **Test with Missing `body_text` (Error Handling)**

```bash
curl -X POST http://localhost:3000/dev/send-email \
-H "Content-Type: application/json" \
-d '{"receiver_email": "test@example.com", "subject": "Missing body"}'
```

**Expected Response (HTTP 400 Bad Request):**
```json
{
"message": "Missing one or more required fields: receiver_email, subject, body_text."
}
```

---

### 3. **Test with Invalid `receiver_email` Format (Error Handling)**

```bash
curl -X POST http://localhost:3000/dev/send-email \
-H "Content-Type: application/json" \
-d '{"receiver_email": "invalid-email", "subject": "Invalid Email", "body_text": "Some text."}'
```

**Expected Response (HTTP 400 Bad Request):**
```json
{
"message": "Invalid receiver_email format."
}
```

---

## Future Enhancements

- **Integrate a Real Email Service:**
Replace the simulation in `handler.js` with actual calls to AWS SES, SendGrid, Mailgun, or another provider:
- Install their SDKs (e.g., `npm install aws-sdk`, `@sendgrid/mail`).
- Add required IAM permissions in `serverless.yml` if deploying to AWS.
- Configure API keys or verified sender identities.

- **Deployment to AWS:**
- Configure AWS CLI credentials on your machine.
- Run `sls deploy` from the project root to deploy to AWS Lambda and API Gateway.

- **Add Unit/Integration Tests**
- **Implement More Sophisticated Input Validation** (e.g., using Joi or Yup)
- **Add Logging and Monitoring**

---

### GitHub Topics / Tags

```
serverless
serverless-framework
email
api
nodejs
serverless-offline
aws-lambda
aws
rest-api
local-development
simulation
```
## 👤 Author

* Aryan Kashyap
* aryankashyap7899@gmail.com
* [My Github Profile](https://github.com/Void604)
