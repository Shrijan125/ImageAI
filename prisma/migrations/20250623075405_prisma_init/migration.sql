-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MAN', 'WOMAN', 'OTHERS');

-- CreateEnum
CREATE TYPE "Ethinicity" AS ENUM ('ASIAN', 'BLACK', 'ASIAN_AMERICAN', 'WHITE', 'EAST_ASIAN', 'SOUTH_EAST_ASIAN', 'SOUTH_ASIAN', 'MIDDLE_EASTERN', 'PACIFIC', 'HISPANIC');

-- CreateEnum
CREATE TYPE "EyeColor" AS ENUM ('BROWN', 'BLUE', 'GREEN', 'GRAY', 'HAZEL', 'AMBER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'GENERATED', 'FAILED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "Gender" NOT NULL,
    "age" INTEGER NOT NULL,
    "ethinicity" "Ethinicity" NOT NULL,
    "eyeColor" "EyeColor" NOT NULL,
    "bald" BOOLEAN NOT NULL,
    "triggerWord" TEXT,
    "tensorPath" TEXT,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "images" TEXT[],
    "userId" TEXT NOT NULL,
    "falAIRequestId" TEXT,
    "zipUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutputImages" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "modelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "falAIRequestId" TEXT,
    "prompt" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OutputImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Packs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Packs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackPrompts" (
    "id" TEXT NOT NULL,
    "packId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PackPrompts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "OutputImages" ADD CONSTRAINT "OutputImages_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "TrainModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackPrompts" ADD CONSTRAINT "PackPrompts_packId_fkey" FOREIGN KEY ("packId") REFERENCES "Packs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
