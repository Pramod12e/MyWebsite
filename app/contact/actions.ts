"use server";

import { Resend } from "resend";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendMessage(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const honeypot = String(formData.get("company") ?? "");

  // Bots fill hidden fields; pretend it worked.
  if (honeypot) {
    return { status: "success", message: "Thanks! Your message was sent." };
  }

  if (!name || name.length > 100) {
    return { status: "error", message: "Please enter your name." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (message.length < 10 || message.length > 2000) {
    return {
      status: "error",
      message: "Message should be between 10 and 2000 characters.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    return {
      status: "error",
      message: "The contact form is temporarily unavailable. Please try again later.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      return { status: "error", message: "Something went wrong. Please try again." };
    }

    return { status: "success", message: "Thanks! Your message was sent." };
  } catch {
    return { status: "error", message: "Something went wrong. Please try again." };
  }
}
