import { prisma } from '@/lib/prisma';
import { NiccaSchema, SaurusTypeSchema } from '@/schemas/nicca-schemas';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const dashboardData = await prisma.nicca.findMany({
      include: {
        week: true,
      },
    });
    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ message: 'データ取得中にエラーが発生しました' }, { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const nicca = await request.json();
    const parsedNicca = NiccaSchema.parse(nicca);
    const session = await getSession();
    const userId = session?.user?.id;

    const randomSaurusType =
      SaurusTypeSchema.options[Math.floor(Math.random() * SaurusTypeSchema.options.length)];

    const newNicca = await prisma.nicca.create({
      data: {
        title: parsedNicca.title,
        week: {
          create: {
            monday: parsedNicca.week.mon,
            tuesday: parsedNicca.week.tue,
            wednesday: parsedNicca.week.wed,
            thursday: parsedNicca.week.thu,
            friday: parsedNicca.week.fri,
            saturday: parsedNicca.week.sat,
            sunday: parsedNicca.week.sun,
          },
        },
        saurustype: randomSaurusType,
        user: { connect: { id: userId } },
      },
    });
    return NextResponse.json(newNicca, { status: 201 });
  } catch (error) {
    console.error('Error registering nicca:', error);
    return NextResponse.json({ message: '日課登録中にエラーが発生しました' }, { status: 500 });
  }
};
