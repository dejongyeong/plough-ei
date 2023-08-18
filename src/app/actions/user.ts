'use server';

import { prisma } from '@/lib/prisma';

interface AddUserProps {
  name: string;
  email: string;
  job: string;
  isMember: boolean;
  isInterested: boolean;
  agree: boolean;
}

export async function addUser({
  name,
  email,
  job,
  isMember,
  isInterested,
  agree,
}: AddUserProps) {
  await prisma.user.create({
    data: {
      name: name,
      email: email,
      profession: job,
      is_member: isMember,
      is_interested: isInterested,
      future_communication: agree,
    },
  });
}
