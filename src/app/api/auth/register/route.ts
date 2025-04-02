import { dbCreateNewUser } from '@/db/functions/user';
import { emailSchema, firstNameSchema, lastNameSchema, passwordSchema } from '@/utils/schemas';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const registerUserRequestSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const body = registerUserRequestSchema.safeParse(json);

    if (!body.success) {
      return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
    }

    const maybeUser = await dbCreateNewUser({
      ...body.data,
    });

    if (maybeUser === undefined) {
      return NextResponse.json({ success: false, error: 'Failed to create user' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'User created' }, { status: 201 });
  } catch (error) {
    console.error('Failed to register:', error);
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
