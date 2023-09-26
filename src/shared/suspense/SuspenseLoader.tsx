import { useParams } from 'react-router-dom';

const SuspenseLoader = () => {
  const { paramId } = useParams() as { paramId: string };

  switch (paramId) {
    case '':
    case '':
    case '':
    default:
      '';
  }
};

export default SuspenseLoader;
