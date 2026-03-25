import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: "Get in touch with Hamdi's Travel Agency. We're here to help you plan your perfect trip. Contact us by phone, email, or visit our office.",
};

export default function ContactPage() {
  return <ContactClient />;
}
