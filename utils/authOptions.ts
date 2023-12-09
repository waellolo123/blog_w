import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import prisma from '../app/lib/prismadb';
import { AuthOptions } from 'next-auth';


export const authOptions:AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider ({
      credentials: {
        email: {label: 'email', type: 'text'},
        password: {label: 'password', type: 'password'}
      },
      async authorize(credentials){
        if(!credentials?.email || !credentials?.password){
          throw new Error('Invalid Credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if(!user || !user?.hashedPassword){
          throw new Error('Invalid Credentials');
        }

        const isCorrect = await bcrypt.compare(credentials.password, user.hashedPassword);
        if(!isCorrect){
          throw new Error('Invalid Credentials');
        }
        return user;
      }
    })
  ],
  pages: {
    signIn: "/"
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
}