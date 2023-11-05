"use server";

import { db } from "./db";

type GetRole = (userId: string) => Promise<"ADMIN" | "TEACHER" | null>;
export const getRole: GetRole = async (userId: string) => {
   try {
      const participant = await db.partricipant.findUnique({
         where: {
            userId,
         },
      });
      if (!participant) return null;

      return participant.role;
   } catch (error) {
      console.log("IMPORTANT*[GET_ROLE]");
      console.log(error);
      return null;
   }
};
