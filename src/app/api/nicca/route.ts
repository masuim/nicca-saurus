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
          create: {
            monday: parsedNicca.week.monday,
            tuesday: parsedNicca.week.tuesday,
            wednesday: parsedNicca.week.wednesday,
            thursday: parsedNicca.week.thursday,
            friday: parsedNicca.week.friday,
            saturday: parsedNicca.week.saturday,
            sunday: parsedNicca.week.sunday,
          },
        },
        saurustype: randomSaurusType,
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
