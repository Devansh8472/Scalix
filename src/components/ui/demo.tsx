import CaseStudiesDetailed, {
  type DetailedCaseStudyItem,
} from "./case-studies";

const demoStudies: DetailedCaseStudyItem[] = [
  {
    id: "demo-1",
    title: "Design System Rollout",
    stat: "40% faster delivery",
    desc: "Teams shipped features faster after implementing a reusable UI system.",
    quote:
      "With a structured component library, our team cut repeated work and moved from fragmented delivery to a reliable release cadence.",
    name: "Aarav Mehta",
    role: "Frontend Engineer",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    iconKey: "monitor",
    metrics: [
      {
        value: "40%",
        label: "Faster Delivery",
        sub: "Feature shipping speed",
      },
      {
        value: "95%",
        label: "Developer Satisfaction",
        sub: "Based on internal survey",
      },
    ],
  },
  {
    id: "demo-2",
    title: "Unified Dashboard Operations",
    stat: "3.5x efficiency gain",
    desc: "Operations workflows became more consistent and measurable.",
    quote:
      "Our ops team reduced context switching and improved daily reporting clarity through a single dashboard framework.",
    name: "Sophia Patel",
    role: "Operations Manager",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    iconKey: "layoutDashboard",
    metrics: [
      {
        value: "3.5x",
        label: "Efficiency Gain",
        sub: "Across workflows",
      },
      {
        value: "70%",
        label: "Reduced Errors",
        sub: "In daily reporting",
      },
    ],
  },
  {
    id: "demo-3",
    title: "Team Collaboration Uplift",
    stat: "2x faster onboarding",
    desc: "Cross-functional collaboration improved with clear shared components.",
    quote:
      "Communication became transparent, onboarding became smoother, and teams worked from one consistent interface model.",
    name: "David Liu",
    role: "Team Lead",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
    iconKey: "users",
    metrics: [
      {
        value: "2x",
        label: "Faster Onboarding",
        sub: "For new hires",
      },
      {
        value: "88%",
        label: "Collaboration Boost",
        sub: "Teamwide adoption",
      },
    ],
  },
];

export default function DemoOne() {
  return <CaseStudiesDetailed studies={demoStudies} />;
}
