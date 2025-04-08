export default interface ISectionAccordion {
  type: string;
  text?: string;
  accordionItem: Array<{
    title?: string;
    text?: string;
  }>;
}