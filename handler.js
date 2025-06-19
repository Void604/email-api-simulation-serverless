// handler.js
'use strict';

// No AWS SDK import needed for simulation

module.exports.sendEmail = async (event) => {
  // Log the entire event for debugging. This is helpful to see what data the Lambda receives.
  console.log('Received event:', JSON.stringify(event, null, 2));

  let requestBody;
  // Error handling: Attempt to parse the request body.
  // If the body is not valid JSON, it will throw an error.
  try {
    // When using API Gateway, the body comes as a string, so we need to parse it.
    requestBody = JSON.parse(event.body);
  } catch (error) {
    console.error('Failed to parse request body:', error);
    // Return a 400 Bad Request if the JSON is invalid.
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Crucial for CORS if your frontend is on a different domain
      },
      body: JSON.stringify({
        message: 'Invalid JSON in request body.',
        error: error.message,
      }),
    };
  }

  // Destructure the required fields from the parsed request body.
  const { receiver_email, subject, body_text } = requestBody;

  // Error handling: Validate if all required fields are present.
  if (!receiver_email || !subject || !body_text) {
    console.warn('Missing required fields:', { receiver_email, subject, body_text });
    // Return a 400 Bad Request if any required field is missing.
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Missing one or more required fields: receiver_email, subject, body_text.',
      }),
    };
  }

  // Error handling: Basic validation for email format.
  // This regex checks for a common email pattern. For production, consider a more robust library.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(receiver_email)) {
    console.warn('Invalid receiver_email format:', receiver_email);
    // Return a 400 Bad Request if the email format is invalid.
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Invalid receiver_email format.',
      }),
    };
  }

  // --- Core Logic: Simulate Email Sending ---
  try {
    // Placeholder: Log the email details as if it were being sent.
    console.log(`--- Simulating Email Send ---`);
    console.log(`To: ${receiver_email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: \n${body_text}`);
    console.log(`-----------------------------`);

    // If the email service call is successful, return a 200 OK response.
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Email request received and processed successfully.',
        details: {
          receiver_email,
          subject,
          // You might add an email service's message ID here if available
        },
      }),
    };
  } catch (error) {
    // Catch any errors that occur during the email sending process itself.
    console.error('Error during email sending process:', error);
    // Return a 500 Internal Server Error.
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'An internal server error occurred while attempting to send the email.',
        error: error.message,
      }),
    };
  }
};