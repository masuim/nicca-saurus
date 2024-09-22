import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { ApiResult } from '@/types/api-types';

export const POST = async (
  req: Request,
): Promise<NextResponse<ApiResult<{ id: string; name: string; email: string }>>> => {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        error: '必須フィールドが不足しています',
        status: 400,
      });
    }

    if (password.length < 6) {
      return NextResponse.json({
        success: false,
        error: 'パスワードは6文字以上である必要があります',
        status: 400,
      });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        error: 'このメールアドレスは既に使用されています',
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      data: { id: user.id, name: user.name, email: user.email },
      status: 201,
    });
  } catch (error) {
    console.error('サインアップ中のエラー:', error);
    return NextResponse.json({
      success: false,
      error: 'サインアップ中に予期せぬエラーが発生しました',
      status: 500,
    });
  }
};
