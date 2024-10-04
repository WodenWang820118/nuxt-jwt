import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secretPhrase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateJWT(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  });
}

export function verifyJWT(token: string): jwt.JwtPayload | string {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error(error);
    return null;
  }
}
