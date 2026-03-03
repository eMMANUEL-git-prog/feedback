import { FeedbackForm } from "@/components/feedback-form"
import { MessageSquare } from "lucide-react"

export default function FeedbackPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col items-center gap-8">
          {/* Header */}
          <div className="text-center space-y-4 max-w-xl">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-2">
              <MessageSquare className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-secondary tracking-tight text-balance">
              We'd Love to Hear From You
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Your feedback helps us create better experiences. Share your thoughts and help us improve.
            </p>
          </div>

          {/* Feedback Form */}
          <FeedbackForm />

          {/* Footer note */}
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Your privacy matters to us. All feedback is handled confidentially and used solely to improve our services.
          </p>
        </div>
      </div>
    </main>
  )
}
