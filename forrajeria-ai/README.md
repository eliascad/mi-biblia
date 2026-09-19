# Asistente IA para Forrajeria

Chatbot para Forrajeria El Remanso usando Node.js, Express y Google Gemini.

## Requisitos

- Node.js instalado.
- Una clave de Google Gemini desde [Google AI Studio](https://aistudio.google.com/).

## Instalacion

1. Abri una terminal en esta carpeta.
2. Ejecuta `npm install`.
3. Copia `.env.example` como `.env` y agrega tu clave:

```env
GEMINI_API_KEY=tu_clave_real
PORT=3000
```

4. Inicia el servidor con `npm start`.
5. Abre `http://localhost:3000`.

Para desarrollo usa `npm run dev`.

## Seguridad

La clave de Gemini se mantiene en el backend y `.env` esta excluido por `.gitignore`. No publiques ese archivo.

El asistente no reemplaza a un veterinario y deriva las consultas sanitarias urgentes a un profesional.
