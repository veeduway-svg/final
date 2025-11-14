import { FileCheck, ClipboardCheck, Calculator, Users, ShieldCheck, BadgeCheck, ArrowRight } from 'lucide-react';
import { useProblemModal } from '@/contexts/ProblemModalProvider';

interface Challenge {
  id: string;
  icon: React.ElementType;
  color: string;
  text: string;
  name: string;
}

const ChallengeCards = () => {
  const { open } = useProblemModal();

  const challenges: Challenge[] = [
    {
      id: 'land_legal',
      icon: FileCheck,
      color: '#0074D9',
      text: 'Confused about land verification and legal checks?',
      name: 'Land & Legal'
    },
    {
      id: 'permits_approvals',
      icon: ClipboardCheck,
      color: '#EA580C',
      text: 'Struggling with permits and government approvals?',
      name: 'Permits & Approvals'
    },
    {
      id: 'budget_financing',
      icon: Calculator,
      color: '#16A34A',
      text: 'Worried about budget planning and cost overruns?',
      name: 'Budget & Financing'
    },
    {
      id: 'contractor_selection',
      icon: Users,
      color: '#9333EA',
      text: "Don't know which contractors and professionals to trust?",
      name: 'Contractor Selection'
    },
    {
      id: 'construction_quality',
      icon: ShieldCheck,
      color: '#DC2626',
      text: 'Concerned about construction quality and safety?',
      name: 'Construction Quality'
    },
    {
      id: 'final_approvals',
      icon: BadgeCheck,
      color: '#0891B2',
      text: 'Need help with occupancy certificate and handover?',
      name: 'Final Approvals & Handover'
    }
  ];

  const handleCardClick = (challenge: Challenge) => {
    open({ problem: challenge.id });
  };

  return (
    <section id="problems" className="bg-gradient-to-b from-[#EAF3FF] to-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wide text-veeduway-muted mb-4">
            Find What You Need
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-veeduway-text">
            What construction challenge are you facing?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {challenges.map((challenge) => {
            const IconComponent = challenge.icon;
            return (
              <div
                key={challenge.id}
                onClick={() => handleCardClick(challenge)}
                className="bg-veeduway-card rounded-full shadow-md hover:shadow-lg p-6 md:p-8 flex items-center justify-between gap-4 hover:scale-[1.02] transition-all cursor-pointer border border-veeduway-border"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${challenge.color}15` }}
                  >
                    <IconComponent
                      size={24}
                      style={{ color: challenge.color }}
                    />
                  </div>
                  <span className="text-base md:text-lg font-semibold text-veeduway-text">
                    {challenge.text}
                  </span>
                </div>
                <ArrowRight className="text-veeduway-muted flex-shrink-0" size={20} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ChallengeCards;
