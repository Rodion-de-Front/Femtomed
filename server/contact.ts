import nodemailer from "nodemailer";

// Интерфейс для данных формы
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Конфигурация Telegram
// Массив chat_id для отправки сообщений (можно указать несколько аккаунтов)
const TELEGRAM_CHAT_IDS = process.env.TELEGRAM_CHAT_IDS
  ? process.env.TELEGRAM_CHAT_IDS.split(",").map((id) => id.trim())
  : [];

// Токен Telegram бота
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";

// Конфигурация Email
const EMAIL_TO = process.env.EMAIL_TO || "office@femtomed.ru";
const EMAIL_FROM = process.env.EMAIL_FROM || "noreply@femtomed.ru";
const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.gmail.com";
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || "587", 10);
const EMAIL_USER = process.env.EMAIL_USER || "";
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "";

/**
 * Отправка сообщения в Telegram
 */
export async function sendToTelegram(data: ContactFormData): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || TELEGRAM_CHAT_IDS.length === 0) {
    console.warn("Telegram не настроен: отсутствует токен или chat IDs");
    return;
  }

  const message =
    `📧 Новое сообщение с формы обратной связи\n\n` +
    `👤 Имя: ${data.name}\n` +
    `📧 Email: ${data.email}\n` +
    (data.phone ? `📞 Телефон: ${data.phone}\n` : ``) +
    `\n💬 Сообщение:\n${data.message}`;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  // Отправляем сообщение во все указанные чаты
  const promises = TELEGRAM_CHAT_IDS.map(async (chatId) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Telegram API error: ${error}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Ошибка отправки в Telegram (chat_id: ${chatId}):`, error);
      throw error;
    }
  });

  await Promise.all(promises);
}

/**
 * Отправка сообщения на email
 */
export async function sendToEmail(data: ContactFormData): Promise<void> {
  if (!EMAIL_USER || !EMAIL_PASSWORD) {
    console.warn("Email не настроен: отсутствуют учетные данные");
    return;
  }

  // Создаем транспортер для отправки email
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_PORT === 465, // true для 465, false для других портов
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Femtomed Contact Form" <${EMAIL_FROM}>`,
    to: EMAIL_TO,
    subject: `Новое сообщение с формы обратной связи от ${data.name}`,
    html: `
      <h2>Новое сообщение с формы обратной связи</h2>
      <p><strong>Имя:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Телефон:</strong> ${data.phone}</p>` : ""}
      <p><strong>Сообщение:</strong></p>
      <p>${data.message.replace(/\n/g, "<br>")}</p>
    `,
    text: `
Новое сообщение с формы обратной связи

Имя: ${data.name}
Email: ${data.email}
${data.phone ? `Телефон: ${data.phone}` : ""}

Сообщение:
${data.message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Ошибка отправки email:", error);
    throw error;
  }
}

/**
 * Отправка данных формы в Telegram и на email
 */
export async function sendContactForm(data: ContactFormData): Promise<{
  success: boolean;
  errors?: string[];
}> {
  const errors: string[] = [];

  // Отправляем в Telegram
  try {
    await sendToTelegram(data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Неизвестная ошибка";
    errors.push(`Telegram: ${errorMessage}`);
    console.error("Ошибка отправки в Telegram:", error);
  }

  // Отправляем на email
  try {
    await sendToEmail(data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Неизвестная ошибка";
    errors.push(`Email: ${errorMessage}`);
    console.error("Ошибка отправки email:", error);
  }

  // Если есть ошибки, но хотя бы одна отправка прошла успешно, считаем частично успешным
  if (errors.length > 0 && errors.length < 2) {
    return {
      success: true,
      errors,
    };
  }

  // Если все ошибки - полный провал
  if (errors.length === 2) {
    return {
      success: false,
      errors,
    };
  }

  // Все успешно
  return {
    success: true,
  };
}
