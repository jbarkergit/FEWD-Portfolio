type useCreatePictureType = {
  svg?: JSX.Element;
  src?: string;
  alt: string;
  figcaption: string;
};

const useCreatePicture = ({ svg, src, alt, figcaption }: useCreatePictureType) => {
  return (
    <figure>
      <picture>
        {svg ? svg : <img src={src} alt={alt} />}
        <figcaption>{figcaption}</figcaption>
      </picture>
    </figure>
  );
};

export default useCreatePicture;
