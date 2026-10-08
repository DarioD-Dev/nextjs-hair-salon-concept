"use server";

import { Resend } from "resend";
import { SALON } from "@/data/salon";

export type BookingFormState = {
  status: "idle" | "success" | "error";
  fieldErrors?: {
    name?: string;
    email?: string;
  };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Dieselbe Ehrlichkeit wie bei der Kontakt-Serveraktion: Ohne
 * RESEND_API_KEY wird nur geloggt, nicht gesendet. Und dieselbe Grenze wie
 * bei KLARWERKs Terminseite — das hier ist eine Anfrage, keine Buchung. Es
 * gibt keinen echten Kalender, der den gewählten Slot reserviert; genau
 * deshalb nennt die Bestätigung das auch so.
 */
export async function submitBookingRequest(
  _prevState: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const stylist = String(formData.get("stylist") ?? "").trim();
  const datum = String(formData.get("datum") ?? "").trim();
  const zeit = String(formData.get("zeit") ?? "").trim();

  const fieldErrors: BookingFormState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "required";
  if (!EMAIL_PATTERN.test(email)) fieldErrors.email = "invalid";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }

  const text = [
    `Leistung: ${service}`,
    `Stylist:in: ${stylist || "egal"}`,
    `Wunschtermin: ${datum}, ${zeit}`,
    "",
    `${name} <${email}>`,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info(`[booking] RESEND_API_KEY not set — would have sent:\n${text}`);
    return { status: "success" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Salon Kupferglanz <onboarding@resend.dev>",
      to: SALON.email,
      replyTo: email,
      subject: `Terminanfrage von ${name}`,
      text,
    });
    if (error) throw error;
  } catch (error) {
    console.error("[booking] Resend send failed:", error);
    return { status: "error" };
  }

  return { status: "success" };
}
