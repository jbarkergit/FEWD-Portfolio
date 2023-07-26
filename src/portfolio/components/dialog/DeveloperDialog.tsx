import { useEffect, useRef } from 'react';
import { useDialogContext } from '../../context/DialogContext';

const AboutDialog = () => {
  return (
    <section className="dialog__about">
      <h2 style={{ display: 'none' }}>About the Developer</h2>
      xyz
    </section>
  );
};

const ContactDialog = () => {
  return (
    <section className="dialog__contact">
      <h2 style={{ display: 'none' }}>Contact the Developer</h2>
      <form method="dialog">
        <div>
          <label placeholder="First name">First name</label>
          <label placeholder="Last Name">Last name</label>
        </div>
        <label placeholder="Email address">Email address</label>
        <input placeholder="Type your message..." />
      </form>
    </section>
  );
};

const DeveloperDialog = () => {
  //@ts-ignore
  const { showDialog, setShowDialog } = useDialogContext();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const closeDialogButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function setDialogFalse() {
      setShowDialog(false);
    }
    closeDialogButtonRef.current?.addEventListener('pointerup', setDialogFalse);
    return () => closeDialogButtonRef.current?.addEventListener('pointerup', setDialogFalse);
  }, []);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.setAttribute('data-show', showDialog ? 'true' : 'false');
    }
  }, [showDialog]);

  return (
    <aside className="dialog">
      <dialog
        role="dialog"
        aria-modal="true"
        className="dialog__modal"
        data-show="false"
        aria-label="About Developer and Developer Contact information"
        ref={dialogRef}
      >
        <AboutDialog />
        <ContactDialog />
        <button ref={closeDialogButtonRef}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="#888888"
              strokeLinecap="round"
              strokeWidth="1.5"
              d="m14.5 9.5l-5 5m0-5l5 5M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"
            ></path>
          </svg>
        </button>
      </dialog>
    </aside>
  );
};

export default DeveloperDialog;
