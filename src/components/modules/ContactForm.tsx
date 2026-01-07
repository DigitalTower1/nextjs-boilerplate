'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { submitContact } from '@/lib/actions';

const schema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  projectType: z.string().min(3),
  budget: z.string().min(1),
  email: z.string().email(),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // --- MAGNETIC BUTTON EFFECT ---
  useGSAP(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const xTo = gsap.quickTo(btn, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(btn, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = btn.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Only magnetize if cursor is within 100px
      if (Math.hypot(x, y) < 100) {
        xTo(x * 0.4);
        yTo(y * 0.4);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  });

  const onSubmit = async (data: FormData) => {
    const result = await submitContact(data);
    if (result.success) alert("Message sent!");
  };

  const inputStyles = `
    bg-transparent border-b-2 border-white/20 px-2 pb-1
    focus:outline-none focus:border-accent transition-colors
    font-display font-medium text-accent inline-block
    placeholder:text-white/10
  `;

  return (
    <section className="relative w-full min-h-screen bg-background flex items-center px-6 py-24">
      <div className="max-w-[1400px] mx-auto">
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="font-display text-[5vw] md:text-[4vw] leading-[1.4] text-foreground uppercase tracking-tighter"
        >
          {/* Narrative Sentence */}
          <div>
            Hello, my name is{" "}
            <input 
              {...register("name")} 
              placeholder="Full Name" 
              className={`${inputStyles} w-[20vw]`}
            />
            {" "}and I represent{" "}
            <input 
              {...register("company")} 
              placeholder="Company" 
              className={`${inputStyles} w-[20vw]`}
            />
            . I'm looking for a partner to help me with{" "}
            <input 
              {...register("projectType")} 
              placeholder="Project Type" 
              className={`${inputStyles} w-[30vw]`}
            />
            {" "}for a budget of{" "}
            <select 
              {...register("budget")} 
              className={`${inputStyles} appearance-none cursor-pointer`}
            >
              <option value="" disabled className="bg-black">Budget</option>
              <option value="10k-50k" className="bg-black">$10k - $50k</option>
              <option value="50k-150k" className="bg-black">$50k - $150k</option>
              <option value="150k+" className="bg-black">$150k+</option>
            </select>
            . You can reach me at{" "}
            <input 
              {...register("email")} 
              placeholder="Email Address" 
              className={`${inputStyles} w-[25vw]`}
            />
            .
          </div>

          {/* Validation Errors Overlay */}
          <div className="h-8 mt-4">
            {Object.keys(errors).length > 0 && (
              <p className="text-sm font-body normal-case tracking-normal text-red-500">
                Please complete the sentence properly.
              </p>
            )}
          </div>

          {/* Magnetic Submit Button */}
          <div className="mt-20 flex justify-center md:justify-end">
            <button
              ref={buttonRef}
              type="submit"
              disabled={isSubmitting}
              className="group relative w-40 h-40 md:w-56 md:h-56 rounded-full bg-accent text-background flex items-center justify-center overflow-hidden transition-transform active:scale-95"
            >
              <span className="relative z-10 font-display font-black text-xl md:text-2xl italic group-hover:scale-110 transition-transform">
                {isSubmitting ? "SENDING..." : "SEND IT"}
              </span>
              {/* Liquid Hover Effect */}
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}