import Header from '@/components/header';
import LeadsFormHeader from '@/components/leads-form-header';
import { fetchDrupalData } from '@/services/fetch-drupal-data';
import React from 'react';

const LandingPage1 = () => {

  fetchDrupalData();

  return (
    <div>
      <Header />
      <LeadsFormHeader />
    </div>
  );
};

export default LandingPage1;