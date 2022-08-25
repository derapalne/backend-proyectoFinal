export {};

declare global {
    namespace Express {
      interface User {
        nombre: string;
        apellido: string;
        email: string;
        telefono: string;
        direccion: string;
      }
    }
  }