
import DrupalService from '@/services/drupal.service';
import { getPageAvailableSections } from '@/utils/pages.util';
import React from 'react';
import Custom500 from './error';

export const revalidate = 60 // invalidate cache every minute (maintain it only during dev)

const LandingPage1 = async ({searchParams}: { searchParams: { [key: string]: string } }) => {
  
  const drupalService = new DrupalService('/api/node/17');
  const { sections } = await drupalService.fetchData();
  const footerSection = sections.find((s) => s.type === 'section_footer');

  if (!(await searchParams)?.teste && process.env.NEXT_ENV === 'homologation') {
    return <Custom500 footerSectionData={footerSection} />;
  }

  return (
    <div>
      {getPageAvailableSections(sections)}
    </div>
  );
};

export default LandingPage1;