-- AddForeignKey
ALTER TABLE "OutputImages" ADD CONSTRAINT "OutputImages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
