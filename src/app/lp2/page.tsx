import Header from '@/components/header';
import Footer from '@/components/footer';
import LargeVideo from '@/components/large-video';
import VerticalRectangularCard from '@/components/vertical-rectangular-card';
import BannerEmpreender from '@/components/banner-empreender';
import Testimonials from '@/components/testimonials';
import HorizontalVideoCardsSection from '@/components/horizontal-video-cards';
import Accordion from '@/components/accordion';
import TermsAndConditions from '@/components/modals/terms-and-conditions';
import LeadsFormBox from '@/components/leads-form-box';
import DrupalService from '@/services/drupal.service';
import React from 'react';
import BannerStepExplain from '@/components/banner-step-explain';
import BannerOrderExplain from '@/components/banner-order-explain';

export const revalidate = 60 // invalidate cache every minute (maintain it only during dev)

const LandingPage2 = async () => {

  const drupalService = new DrupalService('/api/node/20');
  const { sections } = await drupalService.fetchData();

  return (
    
      <div>
        {sections.map((section, index) => {
          switch (section.type) {
            case 'section_header':
              return <Header sectionData={section} key={index} />;
            case 'banner_lp2_part1':
              return <BannerStepExplain sectionData={section} key={index} />;
            case 'section_banner_lp2_part_2':
              return <BannerOrderExplain sectionData={section} key={index} />;
            case 'banner':
              return <LeadsFormBox sectionData={section} key={index} />;
            case 'secao_card_retangular_horizontal':
              return <HorizontalVideoCardsSection sectionData={section} key={index} />;
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
            case 'section_terms_and_conditions':
              return <TermsAndConditions sectionData={section} key={index} />;
          }
        })} 
      </div>
  );
};

export default LandingPage2;