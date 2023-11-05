import { NextResponse } from 'next/server';
import crypto from 'crypto';

function decrypt(cipherText, privateKey) {
  const buffer = Buffer.from(cipherText, 'base64');
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  return decrypted.toString('utf8');
}
export async function POST(req) {
    try {
      // Parse the request body
      const requestBody = await req.json();
      console.log('Request Body:', requestBody);
  
      // Extract the ciphertext from the request body
      const { data: { cipherText } } = requestBody;
  
      // Use your private key to decrypt the ciphertext
      const decrypted = decrypt(cipherText, process.env.PRIVATE_KEY);
  
      // Parse the decrypted data
      const {
        username,
        password,
        password_confirm,
        email,
        email_confirm,
      } = JSON.parse(decrypted);
  
      console.log('Extracted fields:', {
        username,
        password,
        password_confirm,
        email,
        email_confirm,
      });
  
      // TODO: Add your signup logic here
  
      return NextResponse.json({ message: 'Signup successful' });
  
    } catch (error) {
      // Handle specific decryption errors
      if (error.message === 'Decryption failed') {
        return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
      } else {
        // Handle other errors
        return NextResponse.json({ message: 'An error occurred during signup' }, { status: 500 });
      }
    }
  }
  