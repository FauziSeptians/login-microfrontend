import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function RedirectPage() {
  const { userId } = await auth();

  console.log(userId);

  if (!userId) {
    redirect('/sign-in');
  }

  redirect(process.env.NEXT_PUBLIC_ROUTE || '');
}
