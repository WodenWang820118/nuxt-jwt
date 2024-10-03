import { LoginCheckResponse } from '../../utils/user.interface';
import { verifyJWT } from '../../utils/jwt';
import { createError, defineEventHandler, getCookie } from 'h3';

export default defineEventHandler(async (event) => {
  // Retrieve the auth token from the cookie
  const token = getCookie(event, 'auth_token');

  if (!token) {
    return { isLoggedIn: false } as LoginCheckResponse;
  }

  try {
    // Verify the JWT token
    const payload = verifyJWT(token); // Implement this function
    // If the token is valid, return the user information
    console.log('Payload when fetching user:', payload);
    return {
      isLoggedIn: true,
      user: payload,
    } as LoginCheckResponse;
  } catch (error) {
    // If the token is invalid, return an error
    console.error(error);
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid or expired token',
    });
  }
});
