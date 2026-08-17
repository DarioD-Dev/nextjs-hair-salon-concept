"use client";

import { useTranslations } from "next-intl";
import { useActionState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { FieldError } from "@/components/ui/FieldError";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const t = useTranslations("Kontakt");
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);
  const successRef = useRef<HTMLParagraphElement>(null);

  // On success the form is replaced by the confirmation. role="status"
  // announces it, but keyboard focus was left on a submit button that no
  // longer exists — it fell back to <body>, so the next Tab restarted at the
  // top of the page. Moving focus to the confirmation keeps the position.
  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <p
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="font-sans text-accent-copper outline-none"
      >
        {t("success")}
      </p>
    );
  }

  const nameInvalid = Boolean(state.fieldErrors?.name);
  const emailInvalid = Boolean(state.fieldErrors?.email);
  const messageInvalid = Boolean(state.fieldErrors?.message);
  const hasUnattributedError = state.status === "error" && !nameInvalid && !emailInvalid && !messageInvalid;

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="name">{t("nameLabel")}</Label>
        <Input
          id="name"
          name="name"
          required
          aria-invalid={nameInvalid}
          aria-describedby={nameInvalid ? "name-error" : undefined}
        />
        {nameInvalid && <FieldError id="name-error">{t("error")}</FieldError>}
      </div>
      <div>
        <Label htmlFor="email">{t("emailLabel")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          aria-invalid={emailInvalid}
          aria-describedby={emailInvalid ? "email-error" : undefined}
        />
        {emailInvalid && <FieldError id="email-error">{t("error")}</FieldError>}
      </div>
      <div>
        <Label htmlFor="message">{t("messageLabel")}</Label>
        <Textarea
          id="message"
          name="message"
          required
          minLength={10}
          aria-invalid={messageInvalid}
          aria-describedby={messageInvalid ? "message-error" : undefined}
        />
        {messageInvalid && <FieldError id="message-error">{t("error")}</FieldError>}
      </div>
      {hasUnattributedError && <FieldError>{t("error")}</FieldError>}
      <Button type="submit" variant="primary" size="lg" disabled={pending}>
        {pending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
