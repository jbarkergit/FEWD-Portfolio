import ENewsletter from './customer/newsletter/ENewsletter';
import EServices from './customer/policies/EServices';
import ESupport from './customer/policies/ESupport';
import PaymentTypes from './additions/payment-types/PaymentTypes';
import Address from './additions/address/Address';
import SocialMedia from './additions/social-media/SocialMedia';
import CompanyLogos from '../../home/CompanyLogos';

const EFooter = (): JSX.Element => {
  return (
    <footer className='eFooter'>
      <section className='eFooter__partners'>
        <div className='eFooter__splitter'>
          <span className='eFooter__splitter__line' />
          <h2>Partners</h2>
          <span className='eFooter__splitter__line' />
        </div>
        <div className='eFooter__partners--positionShift'>
          <div className='infographic__information__logos'>
            <CompanyLogos />
            <CompanyLogos />
          </div>
        </div>
      </section>

      <section className='eFooter__customer'>
        <section className='eFooter__customer__marketing'>
          <div className='eFooter__splitter'>
            <span className='eFooter__splitter__line' />
            <h2>News & discounts</h2>
            <span className='eFooter__splitter__line' />
          </div>
          <ENewsletter />
        </section>
        <nav className='eFooter__customer__policies'>
          <div className='eFooter__splitter'>
            <span className='eFooter__splitter__line' />
            <h2>Customer Support</h2>
            <span className='eFooter__splitter__line' />
          </div>
          <div className='eFooter__customer__policies__wrapper'>
            <section className='eFooter__customer__policies__wrapper__support'>
              <ESupport />
            </section>
            <section className='eFooter__customer__policies__wrapper__support'>
              <EServices />
            </section>
          </div>
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
