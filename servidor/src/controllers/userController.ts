import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Función para registrar un nuevo usuario
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validar que nos envíen los datos necesarios
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Faltan datos (nombre, email o password)" });
    }

    // 2. Comprobar si el usuario ya existe en la base de datos
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // 3. Encriptar la contraseña (¡Seguridad ante todo!)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Guardar el usuario en MySQL
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 5. Responder al cliente (frontend)
    res.status(201).json({
      message: "Usuario creado con éxito",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor al crear usuario" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Validar que lleguen los datos
    if (!email || !password) {
      return res.status(400).json({ message: "Falta email o contraseña" });
    }

    // 2. Buscar al usuario por email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Credenciales inválidas (Usuario no encontrado)" });
    }

    // 3. Comparar la contraseña (la que envían vs la encriptada)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Credenciales inválidas (Contraseña incorrecta)" });
    }

    // 4. ¡Éxito! Devolvemos los datos del usuario (sin la contraseña)
    res.json({
      message: "Login exitoso",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor al iniciar sesión" });
  }
};
