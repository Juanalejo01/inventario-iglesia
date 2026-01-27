// cliente/src/config.js

// CAMBIA ESTA IP POR LA TUYA QUE SALIÓ EN IPCONFIG
// Detectamos si estamos en web o móvil para elegir la URL correcta
import { Platform } from "react-native";

const IP_ORDENADOR = "192.168.1.XX"; // <--- Pon tu IPv4 aquí
const PUERTO = "3000";

const API_URL =
  Platform.OS === "web"
    ? `http://localhost:${PUERTO}`
    : `http://${IP_ORDENADOR}:${PUERTO}`;

export default API_URL;
