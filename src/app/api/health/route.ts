import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json('Ok', { status: 200, statusText: 'Ok' });
}
