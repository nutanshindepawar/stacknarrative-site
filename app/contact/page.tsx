import type { Metadata } from "next";
import Contact from "@/components/pages/contact";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Tell us where content is slowing you down. We read every message, reply personally and tell you honestly whether we're the right fit.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <Contact />;
}
