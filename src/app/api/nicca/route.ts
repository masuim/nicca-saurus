import { prisma } from '@/lib/prisma';
import { Nicca, NiccaSchema, SaurusTypeSchema } from '@/schemas/nicca-schemas';
import { ApiResult } from '@/types/api-types';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export const GET = async (): Promise<NextResponse<ApiResult<Nicca[]>>> => {
  try {
    const dashboardData = await prisma.nicca.findMany({
      include: {
        week: true,
      },
    });

    const formattedData = dashboardData.map((nicca) => ({
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

    return NextResponse.json({ success: true, data: formattedData, status: 200 });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({
      success: false,
      error: 'データ取得中にエラーが発生しました',
      status: 500,
    });
  }
};

export const POST = async (request: Request): Promise<NextResponse<ApiResult<Nicca>>> => {
  try {
    const nicca = await request.json();
    const parsedNicca = NiccaSchema.parse(nicca);
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({
        success: false,
        error: 'ユーザーが認証されていません',
        status: 401,
      });
    }

    const randomSaurusType =
      SaurusTypeSchema.options[Math.floor(Math.random() * SaurusTypeSchema.options.length)];

    const newNicca = await prisma.nicca.create({
      data: {
        title: parsedNicca.title,
        week: {
          create: parsedNicca.week,
        },
        saurusType: randomSaurusType,
        status: 'active',
        completedSets: 0,
        user: { connect: { id: userId } },
      },
      include: { week: true },
    });

    const formattedNicca = {
      title: newNicca.title,
      week: {
        sunday: !!newNicca.week?.sunday,
        monday: !!newNicca.week?.monday,
        tuesday: !!newNicca.week?.tuesday,
        wednesday: !!newNicca.week?.wednesday,
        thursday: !!newNicca.week?.thursday,
        friday: !!newNicca.week?.friday,
        saturday: !!newNicca.week?.saturday,
      },
    };

    return NextResponse.json({ success: true, data: formattedNicca, status: 201 });
  } catch (error) {
    console.error('Error registering nicca:', error);
    return NextResponse.json({
      success: false,
      error: '日課登録中にエラーが発生しました',
      status: 500,
    });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse<ApiResult<{ id: string }>>> => {
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

    const niccaId = params.id;

    const nicca = await prisma.nicca.findUnique({
      where: { id: niccaId },
      include: { week: true, achievements: true },
    });

    if (!nicca) {
      return NextResponse.json({
        success: false,
        error: '日課が見つかりません',
        status: 404,
      });
    }

    if (nicca.userId !== userId) {
      return NextResponse.json({
        success: false,
        error: 'この日課を削除する権限がありません',
        status: 403,
      });
    }

    await prisma.$transaction([
      prisma.achievementDate.deleteMany({ where: { niccaId: niccaId } }),
      prisma.week.delete({ where: { niccaId: niccaId } }),
      prisma.nicca.delete({ where: { id: niccaId } }),
    ]);

    return NextResponse.json({ success: true, data: { id: niccaId }, status: 200 });
  } catch (error) {
    console.error('Error deleting nicca:', error);
    return NextResponse.json({
      success: false,
      error: '日課削除中にエラーが発生しました',
      status: 500,
    });
  }
};
