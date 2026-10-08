"use server";

import { Resend } from "resend";

export type ReminderState = { status: "idle" | "success" | "error" };

/**
 * Zeigt, was eine echte Terminerinnerung enthalten würde — sofort statt 24
 * Stunden vorher, und an die Adresse aus dem Formular statt an den Salon.
 * Der zeitliche Versatz ist der Teil, den eine Browser-Demo nicht
 * nachbilden kann; deshalb nennt Betreff und Text ausdrücklich, dass das
 * hier die Vorschau ist, nicht der echte, zeitgesteuerte Versand.
 */
export async function sendDemoReminder(
  _prevState: ReminderState,
  formData: FormData,
): Promise<ReminderState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const stylist = String(formData.get("stylist") ?? "").trim();
  const datum = String(formData.get("datum") ?? "").trim();
  const zeit = String(formData.get("zeit") ?? "").trim();

  if (!email) return { status: "error" };

  const text = [
    "Das hier ist eine Vorschau — die echte Erinnerung käme automatisch 24 Stunden vor deinem Termin, nicht sofort.",
    "",
    `Leistung: ${service}`,
    `Stylist:in: ${stylist || "egal"}`,
    `Termin: ${datum}, ${zeit}`,
    "",
    `Wir freuen uns auf dich, ${name}!`,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info(
      `[reminder] RESEND_API_KEY not set — would have sent demo reminder to ${email}:\n${text}`,
    );
    return { status: "success" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Salon Kupferglanz <onboarding@resend.dev>",
      to: email,
      subject: "Vorschau: deine Terminerinnerung",
      text,
    });
    if (error) throw error;
  } catch (error) {
    console.error("[reminder] Resend send failed:", error);
    return { status: "error" };
  }

  return { status: "success" };
}
