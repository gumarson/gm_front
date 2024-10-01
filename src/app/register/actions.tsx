import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

type RegisterData = {
  username: string;
  name: string;
  email: string;
  password: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(`Received ${req.method} request`);

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Método ${req.method} não permitido, utilize POST.` });
    return;
  }

  console.log('Request body:', req.body);

  const { username, name, email, password } = req.body as RegisterData;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log('User created:', newUser);

    res.status(201).json(newUser);
  } catch (error) {
    console.error('User creation error:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
