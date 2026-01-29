import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
// 1. Importamos la función de registro que acabas de crear
import { registerUser } from "./controllers/userController";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- RUTAS ---

// Ruta de prueba
app.get("/ping", (req, res) => {
  res.json({ message: "Conexión a MySQL exitosa" });
});

// 2. NUEVA RUTA: Registro de usuarios
// Cuando llegue una petición POST a '/register', se ejecuta 'registerUser'
app.post("/register", registerUser);

// --- ARRANQUE ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
