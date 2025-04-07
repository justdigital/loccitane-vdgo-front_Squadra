import Header from '@/components/header';
import Footer from '@/components/footer';
import LargeVideo from '@/components/large-video';
import VerticalRectangularCard from '@/components/vertical-rectangular-card';
import BannerEmpreender from '@/components/banner-empreender';
import Testimonials from '@/components/testimonials';
import Accordion from '@/components/accordion';
import LeadsFormBox from '@/components/leads-form-box';
import DrupalService from '@/services/drupal.service';
import React from 'react';

export const revalidate = 60 // invalidate cache every minute (maintain it only during dev)

const LandingPage1 = async () => {

  const drupalService = new DrupalService('/api/node/17');
  const { sections } = await drupalService.fetchData();

  return (
    <div>
      {sections.map((section, index) => {
        switch (section.type) {
          case 'section_header':
            return <Header sectionData={section} key={index} />;
          case 'banner':
            return <LeadsFormBox sectionData={section} key={index} />;
          case 'section_footer':
            return <Footer sectionData={section} key={index} />;
          case 'video':
            return <LargeVideo sectionData={section} key={index} />;
          case 'vertical_rectangular_card_sectio':
            return <VerticalRectangularCard sectionData={section} key={index} />;
          case 'newsletter':
            return <BannerEmpreender sectionData={section} key={index} />;
          case 'comentarios':
            return <Testimonials sectionData={section} key={index} />;
          case 'accordion':
            return <Accordion sectionData={section} key={index} />;
        }
      })}
      
    </div>
  );
};

export default LandingPage1;