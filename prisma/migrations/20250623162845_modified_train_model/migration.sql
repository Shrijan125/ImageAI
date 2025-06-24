-- AlterTable
ALTER TABLE "TrainModel" ADD COLUMN     "thumbNailUrl" TEXT;

-- AddForeignKey
ALTER TABLE "TrainModel" ADD CONSTRAINT "TrainModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
