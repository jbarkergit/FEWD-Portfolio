import { useRef } from 'react';

const Developer = (): JSX.Element => {
  return (
    <div className="developer">
      <div className="developer__icon"></div>
      <div className="developer__nameLoc">
        <h1>Justin Barker</h1>
        <h2>Remote, Front End Developer</h2>
      </div>
    </div>
  );
};

const PortHeader = (): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null!);

  const AboutDialog = () => {
    return (
      <section className="aboutDialog">
        <dialog ref={dialogRef} data-activity="disabled">
          <form method="dialog">hello, world</form>
        </dialog>
      </section>
    );
  };

  const AboutDeveloper = (): JSX.Element => {
    const dialog: HTMLDialogElement = dialogRef?.current;
    return (
      <div className="aboutDeveloper">
        <button
          onClick={() => {
            dialog?.show();
            dialog?.getAttribute('data-activity') === 'disabled'
              ? dialog?.setAttribute('data-activity', 'active')
              : dialog?.setAttribute('data-activity', 'disabled');
          }}
        >{`() => {About()}`}</button>
      </div>
    );
  };
  return (
    <header className="portHeader">
      <Developer />
      <AboutDeveloper />
      <AboutDialog />
    </header>
  );
};

export default PortHeader;
