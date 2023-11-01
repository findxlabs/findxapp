// Import necessary modules
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

export default function Init() {
    // Generate RSA key pair
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });

    // Dummy data
    const dummyData = {
        username: "vitalis",
        password: "123456",
        password_confirm: "123456",
        email: "vitalis@example.com",
        email_confirm: "vitalis@example.com"
    };

    // Convert dummy data to JSON string
    const dummyJsonString = JSON.stringify(dummyData);

    // Encrypt the dummy data with the public key
    const encryptedBuffer = crypto.publicEncrypt(publicKey, Buffer.from(dummyJsonString));
    
    // Convert the encrypted buffer to a Base64 string
    const base64EncryptedString = encryptedBuffer.toString('base64');

    // Print the encrypted dummy data
    console.log('Encrypted dummy data:', base64EncryptedString);

    // Store the private key securely (using environment variable as an example)
    process.env.PRIVATE_KEY = privateKey;

    // Generate random UUID
    const appInitSignature = uuidv4();

    const jsonData = {
        data: {
            publicKey: publicKey, // Return the public key in the response
            defaultLanguage: process.env.DEFAULT_LANGUAGE || 'EN',
            minAndroidAppVersion: process.env.MIN_ANDROID_APP_VERSION || '',
            minIOSAppVersion: process.env.MIN_IOS_APP_VERSION || '',
            appInitSignature: appInitSignature // Use the generated UUID
        },
        statusCode: 200,
        message: 'Success',
        succeeded: true
    };

    return <pre>{JSON.stringify(jsonData, null, 2)}</pre>;
}
