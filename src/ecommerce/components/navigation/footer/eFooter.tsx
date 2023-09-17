import ENewsletter from './customer/newsletter/ENewsletter';
import EPartners from './partners/EPartners';
import EServices from './customer/policies/EServices';
import ESupport from './customer/policies/ESupport';
import PaymentTypes from './additions/payment-types/PaymentTypes';
import Address from './additions/address/Address';
import SocialMedia from './additions/social-media/SocialMedia';

const EFooter = (): JSX.Element => {
  return (
    <footer className='eFooter'>
      <section className='eFooter__partners'>
        <EPartners />
      </section>

      <section className='eFooter__customer'>
        <section className='eFooter__customer__marketing'>
          <ENewsletter />
        </section>
        <nav className='eFooter__customer__policies'>
          <section className='eFooter__customer__policies__support'>
            <ESupport />
          </section>
          <section className='eFooter__customer__policies__support'>
            <EServices />
          </section>
        </nav>
      </section>

      <section className='eFooter__additions'>
        <section className='eFooter__additions__paymentTypes'>
          <PaymentTypes />
        </section>
        <section className='eFooter__additions__address'>
          <Address />
        </section>
        <section className='eFooter__additions__socialMedia'>
          <SocialMedia />
        </section>
      </section>
    </footer>
  );
};

export default EFooter;
