"use client";

import { useActionState } from "react";
import { sendMessage, type ContactState } from "@/app/contact/actions";

const initialState: ContactState = { status: "idle", message: "" };

const fieldClass =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-accent";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendMessage, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          placeholder="Your name"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          minLength={10}
          maxLength={2000}
          placeholder="How can I help?"
          className={`${fieldClass} resize-none`}
        />
      </div>

      {/* Honeypot field for bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Sending..." : "Send message"}
      </button>

      {state.status !== "idle" && (
        <p
          role="status"
          className={
            state.status === "success"
              ? "text-sm text-emerald-600"
              : "text-sm text-red-600"
          }
        >
          {state.message}
        </p>
      )}
    </form>
  );
}