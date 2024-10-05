import { LoginRequest, LoginResponse } from '../../utils/user.interface';
import { generateJWT } from '../../utils/jwt';
import { createError, defineEventHandler, readBody, setCookie } from 'h3';
import { UserService } from './../../services/userService';

const userService = new UserService();

export default defineEventHandler(async (event) => {
  try {
    const { email, password }: LoginRequest = await readBody(event);
    // Validate credentials and generate JWT token
    // This is where you'd typically check against a database
    if (email === 'user@example.com' && password === 'password') {
      const userId = userService.getUserId(email);
      const rolePermission = userService.getRolePermission(email);
      const payload = {
        id: userId,
        email,
        rolePermission,
      };
      console.log('Payload to be logged in:', payload);
      const token = generateJWT(payload);
      // Set HTTP-only cookie
      setCookie(event, 'auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // send it with HTTPS only in production
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });
      console.log('Login successful:', payload);
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
