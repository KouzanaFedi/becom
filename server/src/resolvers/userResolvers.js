import {
  comparePassword,
  encryptPassword,
  getPayload,
  getToken,
} from '../utils/util';
import { AuthenticationError, PubSub } from 'apollo-server';
import { User } from '../models/schema/user';
const pubSub = new PubSub();
export const userResolvers = {
  Query: {
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
          token,
        };
      } catch (e) {
        throw e;
      }
    },
  },
  Subscription: {
    usersCreated: {
      subscribe: () => pubSub.asyncIterator(['USER_CREATED']),
    },
  },
};
