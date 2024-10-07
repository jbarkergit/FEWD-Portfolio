type Type_PropDrill = {
  caption: string;
  icon: JSX.Element;
  func: (delta: number) => void;
  funcDelta: number;
};

const FDCarouselButton = ({ caption, icon, func, funcDelta }: Type_PropDrill) => {
  return (
    <button className='fdMedia__carousel__wrapper__navigation--button' aria-label={caption} onClick={() => func(funcDelta)}>
      <picture>{icon}</picture>
    </button>
  );
};

export default FDCarouselButton;
