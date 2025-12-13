import { UserSchema } from 'api-contracts/user';
import { ObjectId } from 'mongodb';
import { z } from 'zod';

export const UserDbSchema = UserSchema.omit({ id: true }).extend({
  _id: z.instanceof(ObjectId),
});
export type UserDb = z.infer<typeof UserDbSchema>;
