import NextAuth, {NextAuthOptions} from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import type { Adapter } from 'next-auth/adapters';
import prisma from '../../../src/lib/prisma'
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Email from "next-auth/providers/email"

const githubId = process.env.GITHUB_ID
const githubSecret = process.env.GITHUB_SECRET

const googleId = process.env.GOOGLE_ID
const googleSecret = process.env.GOOGLE_SECRET

const smtpHost = process.env.SMTP_HOST
const smtpPort = process.env.SMTP_PORT
const smtpUser = process.env.SMTP_USER
const smtpPswrd = process.env.SMTP_PASSWORD
const emailFrom = process.env.EMAIL_FROM

if(!githubId || !githubSecret){
    throw new Error('no github')
}

if(!googleId || !googleSecret){
  throw new Error('no google')
}

if(!smtpHost || !smtpPort || !smtpUser || !smtpPswrd){
  throw new Error('no smtp')
}

export const authConfig = {
    providers: [
      GitHub({
        clientId: githubId,
        clientSecret: githubSecret,
      }),
      Google({
        clientId: googleId,
        clientSecret: googleSecret,
      }),
      Email({
        server: {
          host: smtpHost,
          port: smtpPort,
          auth: {
            user: smtpUser,
            pass: smtpPswrd
          }
        },
        from: emailFrom
      })
    ],
    adapter: PrismaAdapter(prisma) as Adapter,
    callbacks: {
      session: async({session, user}) => {
        if(session.user){
          session.user.id = user.id
        }
        return session
      }
    }
} satisfies NextAuthOptions

export default NextAuth(authConfig)