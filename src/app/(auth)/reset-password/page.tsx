import { dbValidateToken } from '@/db/functions/token';
import { notFound } from 'next/navigation';
import { z } from 'zod';

import InitiatePasswordResetForm from './initiate-password-reset';
import ResetPasswordForm from './reset-password-form';

const pageContextSchema = z.object({
  searchParams: z.object({
    token: z.string().optional(),
  }),
});

export default async function Page(context: unknown) {
  const result = pageContextSchema.safeParse(context);

  if (!result.success) {
    return notFound();
  }

  const maybeToken = result.data.searchParams.token;
  const userActionRow = maybeToken !== undefined ? await dbValidateToken(maybeToken) : undefined;

  return (
    <main className="flex justify-center items-center px-8 min-h-screen">
      {userActionRow !== undefined ? (
        <ResetPasswordForm {...userActionRow} />
      ) : (
        <InitiatePasswordResetForm />
      )}
    </main>
  );
}
