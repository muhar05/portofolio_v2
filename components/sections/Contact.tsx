import { existsSync } from "node:fs";
import { join } from "node:path";
import siteData from "@/content/site.json";
import ContactContent from "./contact/ContactContent";

export default function Contact() {
  // Show the CV download only when the PDF actually exists.
  const cvAvailable = existsSync(
    join(process.cwd(), "public", siteData.contact.cv.replace(/^\//, ""))
  );

  return (
    <ContactContent
      contact={siteData.contact}
      email={siteData.email}
      cvAvailable={cvAvailable}
    />
  );
}
