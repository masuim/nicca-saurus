import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export const GET = async () => {
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

    const activeNicca = await prisma.nicca.findFirst({
      where: {
        userId: userId,
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      hasActiveNicca: !!activeNicca,
      status: 200,
    });
  } catch (error) {
    console.error('アクティブな日課の確認中にエラーが発生しました:', error);
    return NextResponse.json({
      success: false,
      error: 'アクティブな日課の確認中にエラーが発生しました',
      status: 500,
    });
  }
};
