import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: '必須フィールドが不足しています' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'パスワードは6文字以上である必要があります' },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { message: 'このメールアドレスは既に使用されています' },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: 'ユーザーが正常に作成されました',
        user: { id: user.id, name: user.name, email: user.email },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('サインアップ中のエラー:', error);
    return NextResponse.json(
      { message: 'サインアップ中に予期せぬエラーが発生しました' },
      { status: 500 },
    );
  }
}
