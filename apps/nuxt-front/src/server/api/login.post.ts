import { LoginRequest, LoginResponse } from '../../utils/user.interface';
import { generateJWT } from '../../utils/jwt';
import { createError, defineEventHandler, readBody, setCookie } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const { email, password }: LoginRequest = await readBody(event);

    // Validate credentials and generate JWT token
    // This is where you'd typically check against a database
    if (email === 'user@example.com' && password === 'password') {
      const token = generateJWT({
        id: '123',
        email,
      });
      console.log('Generated token:', token);
      // Set HTTP-only cookie
      setCookie(event, 'auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });
      console.log('Login successful:', email);
      return { user: { id: '123', email } } as LoginResponse;
    }

    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    });
  } catch (error) {
    console.error('Login error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    });
  }
});
