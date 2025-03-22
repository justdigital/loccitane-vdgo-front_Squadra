import Header from '@/components/header';
import LeadsFormBox from '@/components/leads-form-box';
import FetchDrupalData from '@/services/fetch-drupal-data';
import React from 'react';

const LandingPage1 = async () => {

  // const drupalService = new FetchDrupalData('/api/node/17');
  // const sections = drupalService.fetchData();

  // console.log('sections22', sections);

  return (
    <div>
      <Header />
      <LeadsFormBox />
    </div>
  );
};

export default LandingPage1;