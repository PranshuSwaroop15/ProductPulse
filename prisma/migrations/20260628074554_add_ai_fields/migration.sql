-- AlterTable
ALTER TABLE "FeedbackItem" ADD COLUMN     "businessImpact" TEXT,
ADD COLUMN     "confidence" DOUBLE PRECISION,
ADD COLUMN     "modelUsed" TEXT,
ADD COLUMN     "suggestedAction" TEXT;
