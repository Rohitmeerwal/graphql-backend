import User from '../models/User';
import { generateToken, hashPassword, comparePassword } from '../utils/auth';

export const authResolver = {
  Mutation: {
    register: async (_: any, { username, email, password }: { username: string, email: string, password: string }) => {
      try {
        const userExists = await User.findOne({ email });
        if (userExists) {
          throw new Error('User already exists');
        }

        const hashedPassword = await hashPassword(password);
        const user = new User({
          username,
          email,
          password: hashedPassword,
        });

        await user.save();
        const token = generateToken(user.id);

        return { token };
      } catch (error) {
        console.error('Registration Error:', error);
        throw new Error('Registration failed');
      }
    },
    login: async (_: any, { email, password }: { email: string, password: string }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('Invalid credentials');
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
          throw new Error('Invalid credentials');
        }

        const token = generateToken(user.id);

        return { token };
      } catch (error) {
        console.error('Login Error:', error);
        throw new Error('Login failed');
      }
    },
    logout: async (_: any, { token }: { token: string }) => {
      try {
        return { message: 'Logged out successfully' };
      } catch (error) {
        console.error('Logout Error:', error);
        throw new Error('Logout failed');
      }
    }
  }
};