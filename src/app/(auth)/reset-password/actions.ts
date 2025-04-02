'use server';

import { dbDeleteActionToken, dbValidateToken } from '@/db/functions/token';
import { dbGetUserByEmail, dbUpdateUserPassword } from '@/db/functions/user';

export async function updateUserPasswordAction({
  email,
  password,
  token,
}: {
  email: string;
  password: string;
  token: string;
}) {
  const userActionRow = await dbValidateToken(token);

  if (
    userActionRow === undefined ||
    userActionRow.token !== token ||
    userActionRow.action !== 'reset-password'
  ) {
    throw new Error('Invalid token');
  }

  const user = await dbGetUserByEmail({ email });

  if (user === undefined) {
    throw new Error('User not found');
  }

  await dbUpdateUserPassword({ email: user.email, password });
  await dbDeleteActionToken({ token });
}

export async function checkUserExistsAction({ email }: { email: string }) {
  const user = await dbGetUserByEmail({ email });

  return { email: user?.email };
}
