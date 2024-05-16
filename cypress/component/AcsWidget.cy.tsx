import { BrowserRouter } from 'react-router-dom';
import AcsWidget from '../../src/components/widgets/acs-widget';

describe('<AcsWidget />', () => {
  it('should render the AcsWidget component', () => {
    cy.mount(
      <BrowserRouter>
        <AcsWidget />
      </BrowserRouter>
    );
    cy.get('p').should(
      'contain',
      'Fully hosted software as a service for protecting cloud-native applications and Kubernetes.'
    );
  });
});
