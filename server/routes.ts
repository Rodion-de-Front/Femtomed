import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactForm, type ContactFormData } from "./contact";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Эндпоинт для отправки формы обратной связи
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, message } = req.body as ContactFormData;

      // Валидация обязательных полей
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: "Пожалуйста, заполните все обязательные поля",
        });
      }

      // Валидация email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Некорректный email адрес",
        });
      }

      const result = await sendContactForm({
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim(),
        message: message.trim(),
      });

      if (result.success) {
        res.status(200).json({
          success: true,
          message: "Сообщение успешно отправлено",
          warnings: result.errors,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Ошибка при отправке сообщения",
          errors: result.errors,
        });
      }
    } catch (error) {
      console.error("Ошибка обработки формы:", error);
      res.status(500).json({
        success: false,
        message: "Внутренняя ошибка сервера",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
