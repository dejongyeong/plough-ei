'use server';

import { prisma } from '@/lib/prisma';

interface IProps {
  name: string;
  phone: string;
}

export async function addUser({ name, phone }: IProps) {
  await prisma.user.create({
    data: {
      name: name,
      phone: phone,
    },
  });
}
