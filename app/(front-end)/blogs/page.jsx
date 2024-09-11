import CommunityTrainings from '@/components/frontend/CommunityTrainings';
import { getData } from '@/lib/getData';
import React from 'react';

export default async function page() {
  const trainings = await getData('trainings');
  return (
    <CommunityTrainings
      trainings={trainings.slice(0, 3)}
      title="Read All Our Trainings"
    />
  );
}
