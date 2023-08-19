import ContactFormDialog from './tabs/ContactFormDialog';

const Contact = () => {
  return (
    <aside className="contact">
      <hgroup className="contact__hgroup">
        <h2>Justin Barker</h2>
        <h3>React Developer</h3>
      </hgroup>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptas earum recusandae aspernatur maiores consequatur quis fugit et at? Repellat qui esse
        praesentium nisi suscipit odio aspernatur reprehenderit cum voluptate? Soluta excepturi asperiores facere, eaque eos quis autem exercitationem quas repellat
        officia temporibus incidunt architecto.
      </p>
      <div className="dialog__modal" role="dialog" aria-modal="true" data-show="false" aria-label="About Developer and Developer Contact information">
        <div className="dialog__modal__header">
          <span className="dialog__modal__header__col"></span>
          <span className="dialog__modal__header__col">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="#afafaf"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  d="m14.5 9.5l-5 5m0-5l5 5M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"
                ></path>
              </svg>
            </button>
          </span>
        </div>
        <ContactFormDialog />
      </div>
    </aside>
  );
};
export default Contact;
