import { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { supabase } from '@/lib/supabase';

interface FormData {
  email: string;
  sub_problem: string;
  note: string;
  consent_interview: boolean;
}

interface FormErrors {
  email?: string;
  sub_problem?: string;
}

interface ProblemModalProps {
  isOpen: boolean;
  selectedProblem?: string;
  onClose: () => void;
}

const PROBLEM_TYPES = {
  land_legal: 'Land & Legal',
  permits_approvals: 'Permits & Approvals',
  budget_financing: 'Budget & Financing',
  contractor_selection: 'Contractor Selection',
  construction_quality: 'Construction Quality',
  final_approvals: 'Final Approvals & Handover',
};

const subProblemOptions = [
  'Finding reliable information',
  'Understanding the process',
  'Cost and budget concerns',
  'Finding trustworthy professionals',
  'Time management',
  'Legal and compliance issues',
  'Quality and safety concerns',
  'Other'
];

const ProblemModal = ({ isOpen, selectedProblem, onClose }: ProblemModalProps) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    sub_problem: '',
    note: '',
    consent_interview: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setShowSuccessMessage(false);
      setFormData({
        email: '',
        sub_problem: '',
        note: '',
        consent_interview: false,
      });
      setErrors({});
      setSubmitError(null);
    }
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.sub_problem) {
      newErrors.sub_problem = 'Please select a specific issue';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        email: formData.email.trim(),
        challenge_id: selectedProblem || 'general',
        challenge_name: selectedProblem ? PROBLEM_TYPES[selectedProblem as keyof typeof PROBLEM_TYPES] : 'General Interest',
        sub_problem: formData.sub_problem,
        note: formData.note.trim() || null,
        consent_interview: formData.consent_interview,
      };

      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([submissionData]);

      if (dbError) {
        console.error('Error saving submission to database:', dbError);
      }

      const web3FormsPayload = {
        access_key: 'bc0256e5-2b39-4ce9-840b-b87eb29a99b5',
        email: formData.email.trim(),
        problem_type: submissionData.challenge_id,
        problem_name: submissionData.challenge_name,
        sub_problem: formData.sub_problem,
        note: formData.note.trim(),
        consent_interview: formData.consent_interview,
        redirect: false,
        botcheck: '',
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(web3FormsPayload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Submission failed');
      }

      setShowSuccessMessage(true);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Failed to submit your request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadClick = () => {
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-veeduway-accent focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {!showSuccessMessage ? (
          <div className="py-6">
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2 text-veeduway-text">
              Get Your Free Construction Guideline
            </h3>
            <p className="text-veeduway-muted text-sm md:text-base mb-6">
              Tell us a bit more so we can improve our resources for you
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="sub_problem" className="block text-sm font-medium text-veeduway-text mb-1">
                  What specific issue are you facing?*
                </label>
                <select
                  id="sub_problem"
                  value={formData.sub_problem}
                  onChange={(e) => setFormData({ ...formData, sub_problem: e.target.value })}
                  aria-invalid={!!errors.sub_problem}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-veeduway-accent focus:border-veeduway-accent outline-none transition ${
                    errors.sub_problem ? 'border-red-600' : 'border-veeduway-border'
                  }`}
                >
                  <option value="">Select an issue...</option>
                  {subProblemOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.sub_problem && (
                  <p className="text-red-600 text-sm mt-1">{errors.sub_problem}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-veeduway-text mb-1">
                  Email or WhatsApp*
                </label>
                <input
                  type="text"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com or WhatsApp number"
                  aria-invalid={!!errors.email}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-veeduway-accent focus:border-veeduway-accent outline-none transition ${
                    errors.email ? 'border-red-600' : 'border-veeduway-border'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="note" className="block text-sm font-medium text-veeduway-text mb-1">
                  Additional note (optional)
                </label>
                <input
                  type="text"
                  id="note"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="Any specific concerns? (one line)"
                  maxLength={200}
                  className="w-full px-4 py-3 border border-veeduway-border rounded-lg focus:ring-2 focus:ring-veeduway-accent focus:border-veeduway-accent outline-none transition"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent_interview"
                  checked={formData.consent_interview}
                  onChange={(e) => setFormData({ ...formData, consent_interview: e.target.checked })}
                  className="mt-1 w-4 h-4 text-veeduway-accent border-veeduway-border rounded focus:ring-2 focus:ring-veeduway-accent focus:ring-offset-0"
                />
                <label htmlFor="consent_interview" className="text-sm text-veeduway-text cursor-pointer">
                  I'm open to a quick interview to help VeeduWay understand homeowner challenges better
                </label>
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-veeduway-accent hover:bg-veeduway-accentHover text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-veeduway-accent focus:ring-offset-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Submitting...
                  </>
                ) : (
                  'Submit & Get Guideline'
                )}
              </button>

              <p className="text-xs text-veeduway-muted text-center mt-3">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="mb-4 flex justify-center">
              <CheckCircle2 className="text-green-600" size={64} />
            </div>
            <h3 className="text-2xl font-bold text-veeduway-text mb-2">
              Thanks! We've got your details.
            </h3>
            <p className="text-veeduway-muted mb-6">
              You can download your free guideline now. We'll also use your input to improve our micro-apps.
            </p>

            <a
              href="https://drive.google.com/uc?export=download&id=146el8SwLPpvjJvJYiEvlFk6kZLoaWtat"
              target="_blank"
              rel="noopener"
              onClick={handleDownloadClick}
              className="inline-block w-full bg-veeduway-accent hover:bg-veeduway-accentHover text-white font-semibold py-3 px-6 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-veeduway-accent focus:ring-offset-2"
            >
              Download the PDF
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProblemModal;
