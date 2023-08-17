import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import ContactFormDialog from './tabs/ContactFormDialog';
import AboutDeveloperDialog from './tabs/AboutDeveloperDialog';

type DeveloperDialogType = {
  showDialog: boolean | null;
  setShowDialog: Dispatch<SetStateAction<boolean | null>>;
  dialogTab: string | null;
  setDialogTab: Dispatch<SetStateAction<string | null>>;
};

const DeveloperDialog = ({ showDialog, setShowDialog, dialogTab, setDialogTab }: DeveloperDialogType) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
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
      <div
        role="dialog"
        aria-modal="true"
        className="dialog__modal"
        data-show="false"
        aria-label="About Developer and Developer Contact information"
        ref={dialogRef}
      >
        <div className="dialog__modal__header">
          <span className="dialog__modal__header__col">{dialogTab}</span>
          <span className="dialog__modal__header__col">
            <button ref={closeDialogButtonRef}>
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
        {dialogTab === 'contact' ? <ContactFormDialog /> : <AboutDeveloperDialog />}
      </div>
    </aside>
  );
};

export default DeveloperDialog;
