import { FeedbackForm } from "@/components/feedback-form";

export default function FeedbackPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Desktop Split Layout */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between md:gap-12">
          {/* LEFT SIDE - Intro Content */}
          <div className="lg:w-1/2 space-y-6 flex flex-col justify-center items-center">
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="Company Logo"
                className="h-16 lg:h-28"
              />
            </div>

            <div className="space-y-4 max-w-xl flex flex-col items-center">
              <h1 className="text-2xl md:text-4xl font-bold text-secondary tracking-tight">
                We'd Love to Hear From You
              </h1>

              <p className="text-muted-foreground text-sm md:text-lg leading-relaxed text-center lg:text-start">
                Your feedback helps us create better experiences. Share your
                thoughts and help us improve.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - Form + Footer Note */}
          <div className="lg:w-1/2 space-y-6">
            <div className="bg-white p-6 md:p-8">
              <FeedbackForm />
            </div>

            <p className="text-sm text-muted-foreground max-w-md">
              Your privacy matters to us. All feedback is handled confidentially
              and used solely to improve our services.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
