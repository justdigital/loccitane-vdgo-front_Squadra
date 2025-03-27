import Header from '@/components/header';
// import HorizontalVideoCardsSection from '@/components/horizontal-video-cards';
import LeadsFormBox from '@/components/leads-form-box';
import DrupalService from '@/services/drupal.service';
import React from 'react';

export const revalidate = 60 // invalidate cache every minute (maintain it only during dev)

const LandingPage1 = async () => {

  const drupalService = new DrupalService('/api/node/17');
  const { sections } = await drupalService.fetchData();

  return (
    <div>
      {/* <Header /> */}
      {sections.map((section, index) => {
        switch (section.type) {
          case 'banner':
            return <LeadsFormBox sectionData={section} key={index} />;
          case 'section_header':
            return <Header sectionData={section} key={index} />;
        }
      })}
      {/* <HorizontalVideoCardsSection />  */}
    </div>
  );
};

export default LandingPage1;