const admin = require('firebase-admin');
import { NextResponse } from 'next/server';

// Use environment variables for Firebase credentials
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN
};

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(req) {
  const { username, apikey, deviceid } = await req.json()

  try {
    // Validate the username, apikey, and deviceid
    if (!username || !apikey || !deviceid) {
      console.log('Missing required fields:', username, apikey, deviceid);
      return NextResponse.json({ status: 'Error: Missing required fields' });
    }

    // Define your payload
    const message = {
      data: {
        command: 'DEVICE_STATUS',
      },
      token: deviceid,
    };


    // Send a message to the device corresponding to the provided device ID
    try {
      const response = await admin.messaging().send(message);
      console.log('Successfully sent message:', response);
      return NextResponse.json({ status: 'Message sent successfully' });
    } catch (error) {
      console.error('Error sending message:', error);
      return NextResponse.json({ status: 'Error sending message' });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ status: 'An error occurred' });
  }
}
