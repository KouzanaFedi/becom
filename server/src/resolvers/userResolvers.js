import
{ comparePassword, emailValidate, encryptPassword, recupCode, getToken } from '../utils/util';
import { AuthenticationError, PubSub, ValidationError, toApolloError } from 'apollo-server';
import { User } from '../models/schema/user';
import { INVALIDE_EMAIL_ERROR, USER_EXISTS_ERROR, PASSWORD_INVALIDE_ERROR, USER_NOT_EXISTS_ERROR, RECUP_CODE_INVALIDE_ERROR, RECUP_CODE_EXPIRED_ERROR } from '../utils/errors/UserError';
import { RecupCode } from '../models/schema/recupCode';
const pubSub = new PubSub();
export const userResolvers = {
  Query: {
    hi: (_, args, context) =>
    {
      return { msg: 'Hello world' };
    }, verifyRecupCode: async (_, args) =>
    {
      const email = args.email;
      const code = args.code;

      const recupCode = await RecupCode.findOne({ email });
      if (recupCode == null) throw new AuthenticationError(RECUP_CODE_INVALIDE_ERROR.toString());

      if (code !== recupCode.code) {
        return {
          succes: false
        }
      } else {
        const codeCreationDate = new Date(recupCode.created_at);
        const currentTime = new Date();
        const expireIn = 1; // 1 day
        const expiredDate = new Date(codeCreationDate.setDate(codeCreationDate.getDate() + expireIn));
        if (expiredDate > currentTime) {
          return {
            succes: true
          }
        } else {
          return {
            succes: false
          }
        }
      }
    }
  },
  Mutation: {
    login: async (_, args) =>
    {
      const user = await User.findOne({ email: args.email });
      if (user == null) {
        throw new AuthenticationError(USER_NOT_EXISTS_ERROR.toString());
      }
      const isMatch = await comparePassword(args.password, user.password);
      if (isMatch) {
        const token = getToken(user.toJSON());
        return {
          id: user.id, email: user.email, name: user.name, password: user.password, token, createdAt: user.created_at,
          updatedAt: user.updated_at,
        };
      } else {
        throw new AuthenticationError(PASSWORD_INVALIDE_ERROR.toString());
      }
    },
    register: async (_, args) =>
    {
      //Check conditions
      if (!emailValidate(args.email)) throw new AuthenticationError(INVALIDE_EMAIL_ERROR.toString());
      const userExists = await User.exists({ email: args.email });
      if (userExists) throw new AuthenticationError(USER_EXISTS_ERROR.toString());

      const newUser = {
        name: args.name,
        password: await encryptPassword(args.password),
        email: args.email
      };

      try {
        const regUser = new User(newUser);
        const token = getToken(regUser.toJSON());
        regUser.save();
        pubSub.publish('USER_CREATED', {
          usersCreated: {
            id: regUser.id,
            name: regUser.name,
            password: regUser.password,
            token,
          },
        });
        return {
          id: regUser.id,
          name: regUser.name,
          password: regUser.password,
          email: regUser.email,
          token,
        };
      } catch (e) {
        console.log(e);
      }
    },
    generateRecupCode: async (_, args) =>
    {
      const email = args.email;
      const filter = { email: email };
      const userExists = await User.exists(filter);
      if (!userExists) throw new AuthenticationError(USER_NOT_EXISTS_ERROR.toString());

      RecupCode.deleteMany({ email: email }, {}, () => { });

      const code = recupCode();
      try {
        const rc = new RecupCode({
          code: code,
          email: email
        });

        rc.save();

        return {
          succes: true
        }

      } catch (error) {
        console.log(error);
      }
    },
    updatePassword: async (_, args) =>
    {
      const email = args.email;
      const newPassword = await encryptPassword(args.newPassword);
      User.findOneAndUpdate({ email: email }, { $set: { password: newPassword } }, { new: true }, (err, doc) =>
      {
        if (err) {
          throw new AuthenticationError(RECUP_CODE_EXPIRED_ERROR.toString());
        }
      })
      return {
        succes: true
      }
    }
  },

  Subscription: {
    usersCreated: {
      subscribe: () => pubSub.asyncIterator(['USER_CREATED']),
    },
  },
};
