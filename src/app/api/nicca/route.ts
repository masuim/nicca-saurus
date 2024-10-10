import { prisma } from '@/lib/prisma';
import { Nicca, NiccaSchema, SAURUS_TYPES } from '@/schemas/nicca/nicca-schemas';
import { ApiResult } from '@/types/api-types';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

// TODO: prisma使う場合は、api配下ではなくて良い？調査したい。これだと通信回数が増えちゃって遅い？？
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
      SAURUS_TYPES.options[Math.floor(Math.random() * SAURUS_TYPES.options.length)];

    const newNicca = await prisma.nicca.create({
      data: {
        title: parsedNicca.title,
        week: {
          create: parsedNicca.week,
        },
        saurusType: randomSaurusType,
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
