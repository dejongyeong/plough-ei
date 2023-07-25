'use server';

import { prisma } from '@/lib/prisma';

interface IProps {
  name: string;
  phone: string;
  email: string;
}

export async function addUser({ name, phone, email }: IProps) {
  await prisma.user.create({
    data: {
      name: name,
      phone: phone,
      email: email,
    },
  });
}
