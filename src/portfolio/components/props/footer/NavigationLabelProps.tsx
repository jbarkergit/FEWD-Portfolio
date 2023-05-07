type NavigationLabelProps = {
  projectLink: string;
  tabIndex: number;
  ariaLabel: string;
  htmlFor: string;
  id: string;
};

const NavigationLabel = ({ tabIndex, ariaLabel, htmlFor, id }: NavigationLabelProps) => {
  return (
    <button type="button" role="tab" tab-index={tabIndex} aria-label={ariaLabel}>
      <span className="portNav__block__inline">
        <label htmlFor={htmlFor}>
          <input type="radio" name="demoSelector" id={id} />
        </label>
      </span>
    </button>
  );
};

export default NavigationLabel;
