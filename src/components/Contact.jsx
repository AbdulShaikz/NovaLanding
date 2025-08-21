import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";


const Schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email({ message: "Valid email required" }),
  message: z.string().min(10, "Message must be at least 10 characters"),
  _honey: z.string().optional(),   // honeypot field will remain empty for real users
});

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [toast, setToast] = useState(null); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm({
    resolver: zodResolver(Schema),
    mode: "onTouched",
  });

  // auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  // focus first invalid field when submit fails
  const onError = (errs) => {
    const keys = Object.keys(errs);
    if (keys.length) {
      setFocus(keys[0]);
    }
  };

  const onSubmit = async (data) => {
    // honeypot check
    if (data._honey) {
      // likely a bot — pretend success or drop silently
      setToast({ type: "success", text: "Thanks — message sent!" });
      setStatus("success");
      reset();
      return;
    }

    setStatus("sending");

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("Missing EmailJS environment variables (VITE_EMAILJS_...)");
      setStatus("error");
      setToast({ type: "error", text: "Configuration error. Contact the site owner." });
      return;
    }

    const templateParams = {
      name: data.name,
      email: data.email,
      message: data.message,
      from_name: data.name,
      from_email: data.email,
    };

    try {
      const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      // result contains status/text from EmailJS SDK
      console.info("EmailJS send OK (status):", result.status);
      setStatus("success");
      reset();
      setToast({ type: "success", text: "Message sent — I’ll reply soon!" });
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
      setToast({ type: "error", text: "Failed to send. Please try again or email me directly." });
    }
  };

  return (
    <section id="contact" className="py-16">
      <div className="container max-w-2xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Me</h2>

        {/* accessible polite live region (for AT) */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {status === "success" && "Thanks — message sent!"}
          {status === "error" && "Something went wrong. Please try again."}
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit, onError)}
          className="space-y-4"
          aria-label="Contact form"
          noValidate
        >
          {/* honeypot - hidden from users but visible to bots */}
          <input
            {...register("_honey")}
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div>
            <label htmlFor="name" className="block text-sm mb-1">
              Name
            </label>
            <input
              id="name"
              {...register("name")}
              name="name"
              type="text"
              placeholder="Your name"
              className={`w-full p-3 border rounded-lg bg-transparent border-gray-200 dark:border-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 ${
                errors.name ? "ring-1 ring-red-500" : ""
              }`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-err" : undefined}
            />
            {errors.name && (
              <p id="name-err" className="text-sm text-red-600 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email
            </label>
            <input
              id="email"
              {...register("email")}
              name="email"
              type="email"
              placeholder="you@company.com"
              className={`w-full p-3 border rounded-lg bg-transparent border-gray-200 dark:border-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 ${
                errors.email ? "ring-1 ring-red-500" : ""
              }`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-err" : undefined}
            />
            {errors.email && (
              <p id="email-err" className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm mb-1">
              Message
            </label>
            <textarea
              id="message"
              {...register("message")}
              name="message"
              rows={5}
              placeholder="How can I help?"
              className={`w-full p-3 border rounded-lg bg-transparent border-gray-200 dark:border-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 ${
                errors.message ? "ring-1 ring-red-500" : ""
              }`}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-err" : undefined}
            />
            {errors.message && (
              <p id="message-err" className="text-sm text-red-600 mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-blue-700 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
              aria-live="polite"
            >
              {status === "sending" ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Sending…
                </>
              ) : (
                "Send Message"
              )}
            </button>

            <div className="text-sm text-gray-500" aria-live="polite">
              {status === "success" && "Thanks — message sent!"}
              {status === "error" && "Something went wrong. Please try again."}
            </div>
          </div>
        </form>
      </div>

      {/* simple toast UI*/}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed right-4 bottom-6 z-50 max-w-sm w-full rounded-md px-4 py-3 text-sm shadow-lg ${
            toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {toast.text}
        </div>
      )}
    </section>
  );
}
