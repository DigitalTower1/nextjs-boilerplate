'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, "Name required"),
  company: z.string().min(2, "Company required"),
  projectType: z.string().min(3, "Tell us what you need"),
  budget: z.string().min(1, "Budget required"),
  email: z.string().email("Invalid email address"),
});

export async function submitContact(formData: z.infer<typeof contactSchema>) {
  // Simulate DB/Email delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  console.log("Form Received:", formData);
  return { success: true };
}