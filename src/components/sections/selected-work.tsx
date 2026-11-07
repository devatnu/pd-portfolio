import { Section } from "@/components/ui/section";
import { Work } from "@/components/work/work";

export function SelectedWork() {
  return (
    <Section id="work" number="03" title="Selected work" kicker={<>Selected work, <em className="whitespace-nowrap">2019-2026</em></>}>
      <Work />
    </Section>
  );
}
