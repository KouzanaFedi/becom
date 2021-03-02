import {
  comparePassword,
  encryptPassword,
  getPayload,
  getToken,
} from '../utils/util';
import { AuthenticationError } from 'apollo-server';
import { User } from '../models/schema/user';

export const userResolvers = {
  Query: {
    me: (_, args, context) => {
      // console.log(context.user)
      if (context.loggedIn) {
        return context.user;
      } else {
        throw new AuthenticationError('Please Login Again!');
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      const newUser = {
        name: args.name,
        password: await encryptPassword(args.password),
      };
      //Check conditions
      const userExists = await User.exists({ name: args.name });
      if (userExists) {
        throw new AuthenticationError('User Already Exists!');
      }
      try {
        const regUser = new User(newUser);
        const token = getToken(regUser.toJSON());
        console.log(regUser);
        regUser.save();
        return {
          id: regUser.id,
          name: regUser.name,
          password: regUser.password,
          token,
        };
      } catch (e) {
        throw e;
      }
    },
    login: async (_, args) => {
      const user = await User.findOne({ name: args.name });
      console.log(user);
      if (user == null) {
        throw new AuthenticationError('No user of this name!');
      }
      const isMatch = await comparePassword(args.password, user.password);
      if (isMatch) {
        const token = getToken(user.toJSON());
        return { id: user.id, name: user.name, password: user.password, token };
      } else {
        throw new AuthenticationError('Wrong Password!');
      }
    },
  },
};
