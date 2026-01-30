import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Alert,
} from "react-native";
import { useRouter, Link } from "expo-router";
import axios from "axios";
import API_URL from "../src/config";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // 1. Validaciones
    if (!email || !password) {
      if (Platform.OS === "web") alert("Por favor ingresa email y contraseña");
      else Alert.alert("Error", "Por favor ingresa email y contraseña");
      return;
    }

    setLoading(true);

    try {
      // 2. Petición al Servidor
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      console.log("Login correcto:", response.data);

      // 3. Éxito
      if (Platform.OS === "web") {
        window.alert(`Bienvenido, ${response.data.user.name}!`);
        router.replace("/(tabs)"); // Ir al inicio
      } else {
        Alert.alert(
          "¡Bienvenido!",
          `Hola de nuevo, ${response.data.user.name}`,
          [{ text: "Entrar", onPress: () => router.replace("/(tabs)") }],
        );
      }
    } catch (error: any) {
      console.error(error);
      const mensajeError =
        error.response?.data?.message || "Error al iniciar sesión";

      if (Platform.OS === "web") alert(mensajeError);
      else Alert.alert("Error", mensajeError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Text style={styles.subtitle}>Ingresa a tu cuenta para continuar</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="juan@admin.com"
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
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>¿No tienes cuenta? </Text>
        <Link href="/register" asChild>
          <TouchableOpacity>
            <Text style={styles.link}>Regístrate aquí</Text>
          </TouchableOpacity>
        </Link>
      </View>
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
    backgroundColor: "#34C759", // Verde para diferenciar del registro
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
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: "#666",
  },
  link: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});
