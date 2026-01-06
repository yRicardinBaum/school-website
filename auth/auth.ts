import { env } from "@/env";
import { prisma } from "@/prisma/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
    password: {
      hash: (password) => Bun.password.hash(password),
      verify: ({ password, hash }) => Bun.password.verify(password, hash),
    },
  },
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  experimental: { joins: true },
});
