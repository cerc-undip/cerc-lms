import { APIError, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  user: {
    additionalFields: {
      division: {
        type: "string",
        required: false,
        input: true,
      },
      nim: {
        type: "string",
        required: false,
        input: true,
      },
      generation: {
        type: "number",
        required: false,
        input: true,
      },
      status: {
        type: "string",
        defaultValue: "PENDING",
        input: false,
      },
      selectedCurriculumId: {
        type: "string",
        required: false,
        input: false,
      },
      curriculumStatus: {
        type: "string",
        required: false,
        defaultValue: "IN_PROGRESS",
        input: false,
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const nim = (user.nim as string).trim(); 

          const existing = await prisma.user.findUnique({
            where: { nim },
            select: { id: true },
          });

          if (existing) {
            throw new APIError("BAD_REQUEST", {
              message: "NIM is already registered",
            });
          }

          return { data: { ...user, nim } };
        },
      },
    },
  },

  plugins: [
    admin({
      defaultRole: "GUEST",
      adminRoles: ["ADMIN"],
    }),
    nextCookies(),
  ],
});
