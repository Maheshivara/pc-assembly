-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_config" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "user_id_fk" UUID NOT NULL,
    "motherboard_mpn" TEXT NOT NULL,
    "cpu_mpn" TEXT NOT NULL,
    "gpu_mpn" TEXT NOT NULL,
    "cpu_fan_mpn" TEXT NOT NULL,
    "psu_mpn" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "config_memory" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_config_id_fk" UUID NOT NULL,
    "memory_mpn" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "config_memory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "config_storage" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_config_id_fk" UUID NOT NULL,
    "storage_mpn" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "config_storage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "config_history" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_config_id_fk" UUID NOT NULL,
    "action" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "config_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "user_config" ADD CONSTRAINT "user_config_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "config_memory" ADD CONSTRAINT "config_memory_user_config_id_fk_fkey" FOREIGN KEY ("user_config_id_fk") REFERENCES "user_config"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "config_storage" ADD CONSTRAINT "config_storage_user_config_id_fk_fkey" FOREIGN KEY ("user_config_id_fk") REFERENCES "user_config"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "config_history" ADD CONSTRAINT "config_history_user_config_id_fk_fkey" FOREIGN KEY ("user_config_id_fk") REFERENCES "user_config"("id") ON DELETE CASCADE ON UPDATE CASCADE;
