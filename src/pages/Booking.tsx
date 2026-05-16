import { useState } from "react";

import { useForm as useHookForm, Controller as HookController } from "react-hook-form";
import { submitBookingForm } from "../services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import { Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";
import { cn } from "../lib/utils";

const bookingSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  eventType: z.string().min(1, "Please select an event type"),
  date: z.date(),
  timePreference: z.string().min(1, "Please select a time preference"),
  needsTravel: z.boolean(),
  locationDetails: z.string().optional(),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function Booking() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useHookForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      needsTravel: false,
    }
  });

  const watchNeedsTravel = watch("needsTravel");
  const watchEventType = watch("eventType");
  const watchDate = watch("date");
  const watchTime = watch("timePreference");

  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      await submitBookingForm({
        full_name: data.fullName,
        email: data.email,
        phone_number: data.phone,
        event_type: data.eventType as any,
        preferred_date: format(data.date, "yyyy-MM-dd"),
        preferred_time: data.timePreference as any,
        location_needed: data.needsTravel,
        location_details: data.locationDetails,
        additional_notes: data.notes
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
    <div className="bg-white dark:bg-[#050b14] pt-24 md:pt-32 min-h-screen">
      <section className="py-16 bg-surface dark:bg-[#0a1f44] text-center px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-black dark:text-white mb-6">Book a Session</h1>
        <p className="text-lg text-muted-text dark:text-gray-400 max-w-2xl mx-auto">Tell us about your vision. Fill out the form below to initiate the booking process, and we will get back to you within 24 hours.</p>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          
          {isSuccess ? (
            <div className="max-w-2xl mx-auto bg-surface dark:bg-[#0a1f44] p-12 text-center border border-border dark:border-white/10">
              <CheckCircle2 size={64} className="text-primary dark:text-white mx-auto mb-6" />
              <h3 className="text-3xl font-serif text-black dark:text-white mb-4">Request Received</h3>
              <p className="text-muted-text dark:text-gray-400 text-lg">
                Your booking request has been successfully submitted. We'll confirm your session and reach out to you within 24 hours.
              </p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
              
              {/* Form */}
              <div className="lg:w-2/3">
                {submitError && (
                  <div className="bg-red-50 border border-red-200 p-4 text-red-700 mb-6">
                    {submitError}
                  </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Personal Details */}
                  <div className="bg-surface dark:bg-[#0a1f44] p-8 border border-border dark:border-white/10">
                    <h3 className="text-xl font-serif text-black dark:text-white mb-6 border-b border-border dark:border-white/10 pb-4">Personal Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-black dark:text-white mb-2">Full Name *</label>
                        <input type="text" {...register("fullName")} className={cn("w-full px-4 py-3 border focus:outline-none dark:text-blue-900", errors.fullName ? "border-red-500" : "border-border dark:border-white/10 focus:border-primary")} />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black dark:text-white mb-2">Email Address *</label>
                        <input type="email" {...register("email")} className={cn("w-full px-4 py-3 border focus:outline-none dark:text-blue-900", errors.email ? "border-red-500" : "border-border dark:border-white/10 focus:border-primary")} />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black dark:text-white mb-2">Phone Number *</label>
                        <input type="tel" {...register("phone")} className={cn("w-full px-4 py-3 border focus:outline-none dark:text-blue-900", errors.phone ? "border-red-500" : "border-border dark:border-white/10 focus:border-primary")} />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Session Details */}
                  <div className="bg-surface dark:bg-[#0a1f44] p-8 border border-border dark:border-white/10">
                    <h3 className="text-xl font-serif text-black dark:text-white mb-6 border-b border-border dark:border-white/10 pb-4">Session Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-black dark:text-white mb-2">Type of Event *</label>
                        <select {...register("eventType")} className={cn("w-full px-4 py-3 border focus:outline-none bg-white dark:bg-[#050b14] dark:text-blue-900", errors.eventType ? "border-red-500" : "border-border dark:border-white/10 focus:border-primary")}>
                          <option value="">Select an event type...</option>
                          <option value="Wedding">Wedding</option>
                          <option value="Portrait Session">Portrait Session</option>
                          <option value="Corporate Event">Corporate Event</option>
                          <option value="Birthday">Birthday</option>
                          <option value="Brand Shoot">Brand Shoot</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.eventType && <p className="text-red-500 text-xs mt-1">{errors.eventType.message}</p>}
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-medium text-black dark:text-white mb-2">Preferred Date *</label>
                        <HookController
                          control={control}
                          name="date"
                          render={({ field }) => (
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                                className={cn(
                                  "w-full px-4 py-3 border flex justify-between items-center bg-white dark:bg-[#050b14] dark:text-blue-900",
                                  errors.date ? "border-red-500" : "border-border dark:border-white/10 focus:border-primary",
                                  !field.value && "text-gray-500"
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon size={18} className="text-muted-text dark:text-gray-400" />
                              </button>
                              {isCalendarOpen && (
                                <div className="absolute top-full left-0 mt-2 bg-white dark:bg-[#050b14] border border-border dark:border-white/10 z-10 p-2 shadow-lg">
                                  <DayPicker
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(e) => { field.onChange(e); setIsCalendarOpen(false); }}
                                    disabled={{ before: new Date() }}
                                    modifiersClassNames={{
                                      selected: "bg-primary text-white hover:bg-primary hover:text-white",
                                      today: "font-bold text-primary"
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        />
                        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-black dark:text-white mb-2">Preferred Time *</label>
                        <select {...register("timePreference")} className={cn("w-full px-4 py-3 border focus:outline-none bg-white dark:bg-[#050b14] dark:text-blue-900", errors.timePreference ? "border-red-500" : "border-border dark:border-white/10 focus:border-primary")}>
                          <option value="">Select a time...</option>
                          <option value="Morning (8am–12pm)">Morning (8am–12pm)</option>
                          <option value="Afternoon (12pm–4pm)">Afternoon (12pm–4pm)</option>
                          <option value="Evening (4pm–7pm)">Evening (4pm–7pm)</option>
                        </select>
                        {errors.timePreference && <p className="text-red-500 text-xs mt-1">{errors.timePreference.message}</p>}
                      </div>

                      <div className="md:col-span-2 pt-4">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input type="checkbox" {...register("needsTravel")} className="w-5 h-5 accent-primary cursor-pointer border-border dark:border-white/10" />
                          <span className="text-black dark:text-white font-medium">Will you need us to travel to a location?</span>
                        </label>
                      </div>

                      {watchNeedsTravel && (
                        <div className="md:col-span-2 animate-in fade-in slide-in-from-top-4 duration-300">
                          <label className="block text-sm font-medium text-black dark:text-white mb-2">Location Details *</label>
                          <input type="text" {...register("locationDetails")} placeholder="e.g. Victoria Island, Lagos" className="w-full px-4 py-3 border border-border dark:border-white/10 focus:outline-none focus:border-primary dark:text-blue-900" />
                        </div>
                      )}

                      <div className="md:col-span-2 pt-4">
                        <label className="block text-sm font-medium text-black dark:text-white mb-2">Additional Notes (Optional)</label>
                        <textarea rows={4} {...register("notes")} className="w-full px-4 py-3 border border-border dark:border-white/10 focus:outline-none focus:border-primary resize-none dark:text-blue-900"></textarea>
                      </div>
                    </div>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-4 text-lg">
                    {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                  </button>
                </form>
              </div>

              {/* Sidebar Summary */}
              <div className="lg:w-1/3">
                <div className="sticky top-32 bg-primary text-white p-8 border border-primary/20">
                  <h3 className="text-2xl font-serif mb-6 border-b border-white/20 pb-4">Booking Summary</h3>
                  
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-white/60 mb-1 uppercase tracking-wider text-xs">Event Type</p>
                      <p className="font-medium text-lg">{watchEventType || "Not selected"}</p>
                    </div>
                    
                    <div>
                      <p className="text-white/60 mb-1 uppercase tracking-wider text-xs">Date</p>
                      <p className="font-medium text-lg">{watchDate ? format(watchDate, "MMMM d, yyyy") : "Not selected"}</p>
                    </div>
                    
                    <div>
                      <p className="text-white/60 mb-1 uppercase tracking-wider text-xs">Time</p>
                      <p className="font-medium text-lg">{watchTime || "Not selected"}</p>
                    </div>

                    <div className="pt-4 border-t border-white/20 mt-4">
                      <p className="text-white/60 mb-1 uppercase tracking-wider text-xs">Location Needs</p>
                      <p className="font-medium">{watchNeedsTravel ? "Travel Required" : "Studio / No Travel"}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </section>
    </div>
  );
}
