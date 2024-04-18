type useCreatePictureType = {
  svg?: JSX.Element;
  src?: string;
  alt: string;
};

const useCreatePicture = ({ svg, src, alt }: useCreatePictureType) => {
  return (
    <figure>
      <picture>
        {svg ? svg : <img src={src} alt={alt} />}
        <figcaption>{alt}</figcaption>
      </picture>
    </figure>
  );
};

export default useCreatePicture;
