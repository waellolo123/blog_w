import { Blog, User } from "@prisma/client";

export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailverified"> & {
  createdAt: string;
  updatedAt: string;
  emailverified: string | null;
};
export type safeBlogs = Omit<Blog, "createdAt"> & {
  createdAt: string;
};


