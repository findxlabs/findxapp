
import { NextResponse } from 'next/server';
import admin from 'firebase-admin';

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
// Initialize the Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(req) {
  
    try {
    const { username, apikey, command, payload, device, feedback } = await req.json()

        // Validate the inputs here...
        if (!username || !apikey || !command || !payload || !device) {
          return NextResponse.rewrite('/400').json({ status: 'error', message: 'Missing required fields' });
        }    

    // Check if the command is valid
    const validCommands = [
      'START_TRACKING', 'STOP_TRACKING', 'DEVICEINFO', 'HISTORY', 'LOCK', 'UNLOCK', 'ALARM', 'MESSAGE', 'STARTEMERGENCY', 'STOPEMERGENCY', 'FAKE_SHUTDOWN', 'BACKUP', 'STOP_BACKUP', 'RECORDAUDIO', 'TAKEPICTURE', 'CAPTUREVIDEO', 'SCREENSHOT', 'SCREENRECORD', 'CALLLOG', 'SMSLOG', 'WIPE', 'WIPESD', 'GETAPPCONF', 'STARTSHELL', 'HIDE', 'UNHIDE', 'CALL', 'SMS', 'ENABLEBLUETOOTH', 'DISABLEBLUETOOTH', 'ENABLEHOTSPOT', 'DISABLEHOTSPOT', 'GET_APP_LIST', 'LAUNCH_APP', 'START_SERVICE', 'SEND_BROADCAST', 'REBOOT'
    ];

    if (!validCommands.includes(command)) {
      return NextResponse.json({ status: 'error', message: 'Invalid command' });
    }


    console.log('Original Payload:', payload);

    // Send the data via FCM...
    const message = {
      "data": {
        "command": command,
        "payload": JSON.stringify(payload) // Manually stringify the payload
      },
      token: device, // Assuming 'device' is the FCM token of the target device
    };

    let results = []; // This should be the results from your FCM logic

    await admin.messaging().send(message)
        .then((response) => {
        console.log('Successfully sent message:', response);
        results.push(response); // Add the response to the results array
      })
      .catch((error) => {
        console.log('Error sending message:', error);
        results.push(error); // Add the error to the results array
      });

    return NextResponse.json({ auth: apikey, feedback: feedback, command: command, devices: device, results: results });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ status: 'An error occurred' });
  }
}
