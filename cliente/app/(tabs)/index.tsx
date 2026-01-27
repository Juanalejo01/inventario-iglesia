import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import axios from "axios";

// IMPORTANTE: Subimos 2 niveles (../../) para llegar a 'src'
import API_URL from "../../src/config";

export default function HomeScreen() {
  const [mensaje, setMensaje] = useState<string>("Cargando...");
  const [estado, setEstado] = useState<"cargando" | "exito" | "error">(
    "cargando",
  );

  useEffect(() => {
    probandoConexion();
  }, []);

  const probandoConexion = async () => {
    try {
      console.log("Intentando conectar a:", API_URL + "/ping");
      const respuesta = await axios.get(`${API_URL}/ping`);

      // Si llegamos aquí, ¡éxito!
      setMensaje(respuesta.data.message);
      setEstado("exito");
    } catch (error) {
      console.error("Error de conexión:", error);
      setMensaje("Error: No se pudo conectar con el servidor backend");
      setEstado("error");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Inventario Iglesia</Text>

      <View
        style={[styles.card, estado === "error" ? styles.error : styles.exito]}
      >
        <Text style={styles.texto}>Estado del Servidor:</Text>
        {estado === "cargando" ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Text style={styles.respuesta}>{mensaje}</Text>
        )}
      </View>

      <Text style={styles.footer}>IP Configurada: {API_URL}</Text>

      {/* Botón para reintentar si falló */}
      {estado === "error" && (
        <Text
          style={{ marginTop: 20, color: "blue" }}
          onPress={probandoConexion}
        >
          Toca aquí para reintentar
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  texto: {
    fontSize: 16,
    marginBottom: 10,
  },
  respuesta: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  error: { borderLeftWidth: 5, borderLeftColor: "red" },
  exito: { borderLeftWidth: 5, borderLeftColor: "green" },
  footer: {
    marginTop: 30,
    color: "#888",
    fontSize: 12,
  },
});
