-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING NOT NULL,
    "phone" STRING NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
