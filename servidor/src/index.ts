import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

// 1. Configuración inicial
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// 2. Middlewares (Gestores de tráfico)
app.use(cors()); // Permite conexiones externas
app.use(express.json()); // Permite recibir datos en formato JSON

// 3. Rutas de prueba
app.get("/", (req, res) => {
  res.send(
    "¡Hola! El servidor del Inventario de la Iglesia está funcionando ⛪",
  );
});

// Ruta para probar la conexión a la base de datos
app.get("/ping", async (req, res) => {
  try {
    const users = await prisma.user.findMany(); // Intenta buscar usuarios (aunque esté vacío)
    res.json({
      status: "OK",
      message: "Conexión a MySQL exitosa",
      userCount: users.length,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "ERROR", message: "No se pudo conectar a la BD" });
  }
});

// 4. Arrancar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
