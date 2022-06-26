import passport from 'passport'
import passportGoogle, { VerifyCallback } from 'passport-google-oauth20'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from '../../utils/secret'
import User from '../../models/user'

const GoogleStrategy = passportGoogle.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
      async (accessToken:string, refreshToken:string, profile:any, done:VerifyCallback) => {

        const newUser = {
          googleId: profile.id,
          name: profile.name.givenName,
          lastname: profile.name.familyName,
          createdAt: '',
          updatedAt: ''
        }
        try {
          let user = await User.findOne({ googleId: profile.id})

          if(user){
            done(null, user)
          }
          else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (error) {
          console.log(error)
        }
    }
  )
);