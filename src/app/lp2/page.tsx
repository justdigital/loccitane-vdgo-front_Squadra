import DrupalService from '@/services/drupal.service';
import { getPageAvailableSections } from '@/utils/pages.util';
import React from 'react';

export const revalidate = 60 // invalidate cache every minute (maintain it only during dev)

const LandingPage2 = async () => {

  const drupalService = new DrupalService('/api/node/20');
  const { sections } = await drupalService.fetchData();

  return (
    <div>
      {getPageAvailableSections(sections)}
    </div>
  );
};

export default LandingPage2;