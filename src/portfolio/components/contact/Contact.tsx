import SkillButtons from './sections/SkillButtons';
import ContactForm from './sections/ContactForm';

const Contact = () => {
  return (
    <aside className="contact">
      <section className="contact__section">
        <hgroup className="contact__section__information">
          <h2>Justin Barker</h2>
          <h3>React Developer</h3>
        </hgroup>
      </section>
      <SkillButtons />
      <ContactForm />
    </aside>
  );
};
export default Contact;
