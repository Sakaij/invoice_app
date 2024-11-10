import { NextApiRequest, NextApiResponse } from 'next';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import jwt from 'jsonwebtoken';

// Google OAuth Strategy setup
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "http://localhost:3000/api/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

// Facebook OAuth Strategy setup
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID!,
  clientSecret: process.env.FACEBOOK_APP_SECRET!,
  callbackURL: "http://localhost:3000/api/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle JWT generation or OAuth redirects
  if (req.method === 'POST') {
    const token = jwt.sign({ userId: 123 }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}