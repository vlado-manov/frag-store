import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "../models/userModel";

passport.use(
  new GoogleStrategy(
    {
      // TODO: Create ID and SECRET
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOneAndUpdate(
        { email: profile.emails?.[0].value },
        { name: profile.displayName },
        { upsert: true, new: true }
      );
      done(null, user);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      // TODO: Create ID and SECRET
      clientID: process.env.FACEBOOK_APP_ID!,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
      callbackURL: "/auth/facebook/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOneAndUpdate(
        { email: profile.emails?.[0].value },
        { name: profile.displayName },
        { upsert: true, new: true }
      );
      done(null, user);
    }
  )
);
