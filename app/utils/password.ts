import bcrypt from "bcrypt";

const PASSWORD_SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, PASSWORD_SALT_ROUNDS, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword as string;
}

export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
