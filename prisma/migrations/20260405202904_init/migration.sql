-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "version" TEXT,
    "slug" TEXT NOT NULL,
    "precio" REAL NOT NULL,
    "year" INTEGER NOT NULL,
    "kilometros" INTEGER NOT NULL,
    "combustible" TEXT NOT NULL,
    "cambio" TEXT NOT NULL,
    "potencia" INTEGER,
    "motor" TEXT,
    "color" TEXT,
    "puertas" INTEGER,
    "plazas" INTEGER,
    "etiqueta_ambiental" TEXT,
    "descripcion" TEXT,
    "equipamiento" TEXT,
    "observaciones" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'disponible',
    "destacado" BOOLEAN NOT NULL DEFAULT false,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "fecha_publicacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "VehicleImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vehicle_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "es_principal" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "VehicleImage_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT,
    "mensaje" TEXT NOT NULL,
    "vehicle_id" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'nuevo',
    "fecha_creacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Lead_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'admin'
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "telefono" TEXT,
    "whatsapp" TEXT,
    "email" TEXT,
    "direccion" TEXT,
    "horario" TEXT,
    "textos_home" TEXT,
    "redes_sociales" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_slug_key" ON "Vehicle"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");
