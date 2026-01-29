import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useRouter } from "expo-router"; // Para navegar entre pantallas
import axios from "axios";
import API_URL from "../src/config"; // Ajusta la ruta si es necesario

export default function RegisterScreen() {
  const router = useRouter();

  // Estados para guardar lo que escribe el usuario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // 1. Validaciones básicas
    if (!name || !email || !password) {
      // Usamos lógica compatible con Web y Móvil
      if (Platform.OS === "web") {
        alert("Error: Por favor completa todos los campos");
      } else {
        Alert.alert("Error", "Por favor completa todos los campos");
      }
      return;
    }

    setLoading(true);

    try {
      // 2. Enviar datos al Backend
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });

      console.log("Respuesta del servidor:", response.data);

      // 3. ÉXITO: Diferenciamos entre Web y Móvil
      if (Platform.OS === "web") {
        // En web usamos la alerta nativa del navegador que es más simple
        window.alert("¡Éxito! Usuario creado correctamente");
        router.back(); // Volvemos atrás inmediatamente
      } else {
        // En móvil usamos la alerta nativa bonita
        Alert.alert("¡Éxito!", "Usuario creado correctamente", [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      }
    } catch (error: any) {
      console.error(error);
      const errorMsg =
        error.response?.data?.message || "Error al conectar con el servidor";

      if (Platform.OS === "web") {
        alert("Error: " + errorMsg);
      } else {
        Alert.alert("Error", errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>
      <Text style={styles.subtitle}>Únete para gestionar el inventario</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre Completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Juan Pérez"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="juan@ejemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="******"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Registrarse</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={styles.linkButton}>
        <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkButton: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "#007AFF",
    fontSize: 14,
  },
});
