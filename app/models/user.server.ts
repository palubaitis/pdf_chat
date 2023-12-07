import { users } from "db/schema/user";
import { eq } from "drizzle-orm";
import { db } from "~/services/db.server";
import { hashPassword } from "~/utils/password";

export type User = typeof users.$inferSelect; // Return type when queried
export type NewUser = typeof users.$inferInsert; // Insert type

export async function createUser(
  email: string,
  password: string,
): Promise<User> {
  const hashedPassword = await hashPassword(password);
  const returnedUsers = await db
    .insert(users)
    .values({
      email,
      password: hashedPassword,
    })
    .returning();
  return returnedUsers[0];
}

export async function getUserById(id: number): Promise<User> {
  const returnedUsers = await db.select().from(users).where(eq(users.id, id));
  return returnedUsers[0];
}

export async function getUserByEmail(email: string): Promise<User> {
  const returnedUsers = await db
    .select()
    .from(users)
    .where(eq(users.email, email));
  return returnedUsers[0];
}

export async function changePassword(user_id: number, password: string) {
  const hashedPassword = await hashPassword(password);
  await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.id, user_id));
}

export async function updateUserById(user_id: number, update: Partial<User>) {
  await db.update(users).set(update).where(eq(users.id, user_id));
}

export async function getUserByCustomerId(customerId: string) {
  const returnedUsers = await db
    .select()
    .from(users)
    .where(eq(users.subscription_customer, customerId));
  return returnedUsers[0];
}