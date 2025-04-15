import ISectionBanner from "@/interfaces/section-banner";
import DrupalService from "./drupal.service";

export const getBannerSection = async (): Promise<ISectionBanner> => {
  const drupalService = new DrupalService('/api/node/17');
  const sections = await drupalService.fetchData();

  return sections.find(section => section?.type === 'banner') as ISectionBanner;
}