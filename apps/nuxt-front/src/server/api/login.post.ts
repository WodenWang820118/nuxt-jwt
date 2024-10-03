import { User } from '../../utils/user.interface';
import { generateJWT } from '../../utils/jwt';
import { createError, defineEventHandler, readBody, setCookie } from 'h3';

interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
}

export default defineEventHandler(async (event) => {
  const { email, password }: LoginRequest = await readBody(event);
  console.log('Email:', email);
  console.log('Password:', password);
  // Validate credentials and generate JWT token
  // This is where you'd typically check against a database
  if (email === 'user@example.com' && password === 'password') {
    const token = generateJWT({ secretPhrase: 'secret' }); // Implement this function

    // Set HTTP-only cookie
    setCookie(event, 'auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return { user: { id: '123', email } } as LoginResponse;
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Invalid credentials',
  });
});
