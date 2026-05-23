import { useState } from "react";

import { useForm as useHookForm } from "react-hook-form";
import { submitContactForm } from "../services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { cn } from "../lib/utils";

const contactSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useHookForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      await submitContactForm({
        full_name: data.fullName,
        email: data.email,
        phone_number: data.phone,
        subject: data.subject as any,
        message: data.message
      });
      setIsSuccess(true);
      reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#111111] pt-24 md:pt-32 min-h-screen">
      <section className="py-16 bg-surface dark:bg-[#1a1a1a] text-center px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-black dark:text-white mb-6">Get In Touch</h1>
        <p className="text-lg text-muted-text dark:text-gray-400 max-w-2xl mx-auto">Have a project in mind or a question about our services? We'd love to hear from you.</p>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16">

            {/* Contact Form */}
            <div className="lg:w-3/5">
              <h2 className="text-3xl font-serif text-black dark:text-white mb-8">Send a Message</h2>

              {submitError && (
                <div className="bg-red-50 border border-red-200 p-4 text-red-700 mb-6">
                  {submitError}
                </div>
              )}

              {isSuccess ? (
                <div className="bg-green-50 border border-green-200 p-8 text-center">
                  <h3 className="text-2xl font-serif text-green-800 mb-4">Thank you!</h3>
                  <p className="text-green-700">We've received your message and will be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white mb-2">Full Name *</label>
                      <input
                        type="text"
                        {...register("fullName")}
                        className={cn(
                          "w-full px-4 py-3 border focus:outline-none transition-colors bg-white dark:bg-[#1a1a1a] dark:text-white",
                          errors.fullName ? "border-red-500 focus:border-red-500" : "border-border dark:border-white/10 focus:border-primary"
                        )}
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white mb-2">Email Address *</label>
                      <input
                        type="email"
                        {...register("email")}
                        className={cn(
                          "w-full px-4 py-3 border focus:outline-none transition-colors bg-white dark:bg-[#1a1a1a] dark:text-white",
                          errors.email ? "border-red-500 focus:border-red-500" : "border-border dark:border-white/10 focus:border-primary"
                        )}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        {...register("phone")}
                        className={cn(
                          "w-full px-4 py-3 border focus:outline-none transition-colors bg-white dark:bg-[#1a1a1a] dark:text-white",
                          errors.phone ? "border-red-500 focus:border-red-500" : "border-border dark:border-white/10 focus:border-primary"
                        )}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white mb-2">Subject *</label>
                      <select
                        {...register("subject")}
                        className={cn(
                          "w-full px-4 py-3 border focus:outline-none transition-colors bg-white dark:bg-[#1a1a1a] dark:text-white",
                          errors.subject ? "border-red-500 focus:border-red-500" : "border-border dark:border-white/10 focus:border-primary"
                        )}
                      >
                        <option value="">Select a subject...</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Booking Question">Booking Question</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">Message *</label>
                    <textarea
                      rows={5}
                      {...register("message")}
                      className={cn(
                        "w-full px-4 py-3 border focus:outline-none transition-colors resize-none bg-white dark:bg-[#1a1a1a] dark:text-white",
                        errors.message ? "border-red-500 focus:border-red-500" : "border-border dark:border-white/10 focus:border-primary"
                      )}
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full md:w-auto min-w-[200px]"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Details */}
            <div className="lg:w-2/5">
              <div className="bg-surface dark:bg-[#1a1a1a] p-10 border border-border dark:border-white/10 h-full">
                <h3 className="text-2xl font-serif text-black dark:text-white mb-8">Contact Information</h3>

                <div className="space-y-8">
                  <div className="flex items-start">
                    <Phone className="text-primary dark:text-white mr-4 shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium text-black dark:text-white mb-1">Phone</h4>
                      <a href="tel:+2348107572373" className="text-muted-text dark:text-gray-400 hover:text-primary transition-colors block">+234 810 757 2373</a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="text-primary dark:text-white mr-4 shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium text-black dark:text-white mb-1">Email</h4>
                      <a href="mailto:abimbolaolawale014@gmail.com" className="text-muted-text dark:text-gray-400 hover:text-primary transition-colors block">abimbolaolawale014@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="text-primary dark:text-white mr-4 shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium text-black dark:text-white mb-1">Location</h4>
                      <p className="text-muted-text dark:text-gray-400">Lagos, Nigeria</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="text-primary dark:text-white mr-4 shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium text-black dark:text-white mb-1">Business Hours</h4>
                      <p className="text-muted-text dark:text-gray-400">Mon–Sat: 9am – 6pm WAT</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border dark:border-white/10">
                  <h4 className="font-medium text-black dark:text-white mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 rounded-full border border-border dark:border-white/10 flex items-center justify-center text-muted-text dark:text-gray-400 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#b5952f] hover:text-[#111111] hover:border-transparent transition-all"><FaInstagram size={18} /></a>
                    <a href="#" className="w-10 h-10 rounded-full border border-border dark:border-white/10 flex items-center justify-center text-muted-text dark:text-gray-400 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#b5952f] hover:text-[#111111] hover:border-transparent transition-all"><FaFacebookF size={18} /></a>
                    <a href="#" className="w-10 h-10 rounded-full border border-border dark:border-white/10 flex items-center justify-center text-muted-text dark:text-gray-400 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#b5952f] hover:text-[#111111] hover:border-transparent transition-all"><FaXTwitter size={18} /></a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
