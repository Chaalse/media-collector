-- CreateTable
CREATE TABLE "Media" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "url" VARCHAR(255) NOT NULL,
    "type" VARCHAR(50) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);
