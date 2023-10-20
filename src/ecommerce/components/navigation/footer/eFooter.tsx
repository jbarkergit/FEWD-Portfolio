import ENewsletter from './newsletter/ENewsletter';
import EServices from './policies/EServices';
import ESupport from './policies/ESupport';
import PaymentTypes from './additions/payment-types/PaymentTypes';
import Address from './additions/address/Address';
import SocialMedia from './additions/social-media/SocialMedia';

const FooterSplitter = (sectionHeading: string) => {
  return (
    <div className='eFooter__splitter'>
      <span className='eFooter__splitter--line' />
      <h2>{sectionHeading}</h2>
      <span className='eFooter__splitter--line' />
    </div>
  );
};

const EFooter = (): JSX.Element => {
  return (
    <footer className='eFooter'>
      <section className='eFooter__newsletter'>
        {FooterSplitter('News & discounts')}
        <ENewsletter />
      </section>

      <section className='eFooter__customerSupport'>
        {FooterSplitter('Customer Support')}
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
