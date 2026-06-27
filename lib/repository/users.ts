import { User } from '@/generated/prisma/browser';
import { PClient } from '@/prisma/PrismaClient';

async function getUser(email: string): Promise<User | undefined> {
  try {
    PClient.$connect();
    console.log(email)
    var user = await PClient.user.findFirst({
      where: { email },
    });
    PClient.$disconnect();

    if (!user) {
      console.error(`User with email ${email} not found.`);
      return undefined;
    }

    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export { getUser };