import { Suspense } from 'react';
import CenteredLayout from '@/app/components/centered-layout/CenteredLayout';
import CardContainer from '@/app/components/card-container/CardContainer';
import MediaCrawlerForm from '@/app/ui/media-crawler-form/MediaCrawlerForm';

export default function HomePage() {
  return (
    <CenteredLayout>
      <CardContainer>
        <Suspense>
          <MediaCrawlerForm />
        </Suspense>
      </CardContainer>
    </CenteredLayout>
  );
}