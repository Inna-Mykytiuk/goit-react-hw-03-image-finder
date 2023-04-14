import PacmanLoader from 'react-spinners/PacmanLoader';
import { LoaderContainer } from './Loader.styled';

const Loader = () => (
  <LoaderContainer>
    <PacmanLoader color="#f7f507" size="150px" />
  </LoaderContainer>
);

export default Loader;
