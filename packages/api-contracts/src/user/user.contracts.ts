import { IdSchema } from '../common';
import { UserBaseSchema } from './user.model';
import { z } from 'zod';

export const UserSchema = UserBaseSchema.extend({
  id: IdSchema,
});
export type User = z.infer<typeof UserSchema>;

export const UserInputSchema = UserBaseSchema;
export type UserInput = z.infer<typeof UserInputSchema>;

export const UserUpdateSchema = UserBaseSchema.partial();
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
