import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
// IMPORTANTE: Añadimos loginUser aquí abajo vvv
import { registerUser, loginUser } from "./controllers/userController";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- RUTAS ---

app.get("/ping", (req, res) => {
  res.json({ message: "Conexión a MySQL exitosa" });
});

app.post("/register", registerUser);

// NUEVA RUTA: Login
app.post("/login", loginUser);

// --- ARRANQUE ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
