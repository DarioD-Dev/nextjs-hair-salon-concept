"use server";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  fieldErrors?: {
    name?: string;
    email?: string;
    message?: string;
  };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Demo only — validates and reports success, but nothing is actually sent
// yet. This is the backend seam: swap the body once a real mail/CRM
// integration exists, no call site (ContactForm) has to change.
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const fieldErrors: ContactFormState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "required";
  if (!EMAIL_PATTERN.test(email)) fieldErrors.email = "invalid";
  if (message.length < 10) fieldErrors.message = "tooShort";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }

  return { status: "success" };
}
