import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Nicca } from '@/schemas/nicca/nicca-schemas';

export async function NiccaDataFetcher(): Promise<Nicca[] | null> {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const niccas = await prisma.nicca.findMany({
    where: { userId: userId },
    include: { week: true },
  });

  return niccas.map((nicca) => ({
    title: nicca.title,
    week: nicca.week
      ? {
          sunday: !!nicca.week.sunday,
          monday: !!nicca.week.monday,
          tuesday: !!nicca.week.tuesday,
          wednesday: !!nicca.week.wednesday,
          thursday: !!nicca.week.thursday,
          friday: !!nicca.week.friday,
          saturday: !!nicca.week.saturday,
        }
      : {
          sunday: false,
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
        },
  }));
}
