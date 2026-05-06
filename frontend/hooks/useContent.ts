import type { HomepageContent, AboutContent, ContactContent } from "@/types/content";
import homepageData from "@/content/pages/homepage.json";
import aboutData from "@/content/pages/about.json";
import contactData from "@/content/pages/contact.json";

export function getHomepageContent(): HomepageContent {
  return homepageData as HomepageContent;
}

export function getAboutContent(): AboutContent {
  return aboutData as AboutContent;
}

export function getContactContent(): ContactContent {
  return contactData as ContactContent;
}
