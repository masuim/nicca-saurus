import { prisma } from '@/lib/prisma';
import { Nicca } from '@/schemas/nicca-schemas';
import { ApiResult } from '@/types/api-types';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export const GET = async (): Promise<NextResponse<ApiResult<Nicca[]>>> => {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({
        success: false,
        error: 'ユーザーが認証されていません',
        status: 401,
      });
    }

    const niccas = await prisma.nicca.findMany({
      where: {
        userId: userId,
      },
      include: {
        week: true,
      },
    });

    const formattedNiccas = niccas.map((nicca) => ({
      id: nicca.id,
      title: nicca.title,
      week: {
        sunday: !!nicca.week?.sunday,
        monday: !!nicca.week?.monday,
        tuesday: !!nicca.week?.tuesday,
        wednesday: !!nicca.week?.wednesday,
        thursday: !!nicca.week?.thursday,
        friday: !!nicca.week?.friday,
        saturday: !!nicca.week?.saturday,
      },
    }));

    return NextResponse.json({ success: true, data: formattedNiccas, status: 200 });
  } catch (error) {
    console.error('日課の取得中にエラーが発生しました:', error);
    return NextResponse.json({
      success: false,
      error: '日課の取得中にエラーが発生しました',
      status: 500,
    });
  }
};
