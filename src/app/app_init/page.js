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

    // Store the private key securely (you can use a secure storage mechanism)
    // For example, you can use environment variables, secure vaults, or databases.

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
