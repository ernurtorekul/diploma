-- AlterTable
ALTER TABLE "bins" ADD COLUMN     "fullnessPercentage" INTEGER DEFAULT 0,
ADD COLUMN     "fullnessThreshold" INTEGER NOT NULL DEFAULT 85,
ADD COLUMN     "lastFullnessUpdate" TIMESTAMP(3);
