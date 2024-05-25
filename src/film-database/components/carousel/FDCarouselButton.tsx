type Type_PropDrill = {
  caption: string;
  icon: JSX.Element;
  func: (delta: number) => void;
  funcIndex: number;
};

const FDCarouselButton = ({ caption, icon, func, funcIndex }: Type_PropDrill) => {
  return (
    <button className='fdMedia__carousel__wrapper__ul__navigation' aria-label={caption} onClick={() => func(funcIndex)}>
      <figure>
        <picture>
          {icon}
          <figcaption>{caption}</figcaption>
        </picture>
      </figure>
    </button>
  );
};

export default FDCarouselButton;
