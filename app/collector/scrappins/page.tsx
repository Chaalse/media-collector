import CenteredLayout from '@/app/components/centered-layout/CenteredLayout';
import CardContainer from '@/app/components/card-container/CardContainer';

export default function CollectionsPage() {
  return (
    <CenteredLayout>
      <CardContainer>
        <p style={{ textAlign: 'center', fontSize: '1.25rem', fontWeight: 600 }}>
          COLLECTIONS PAGE
        </p>
      </CardContainer>
    </CenteredLayout>
  );
}
