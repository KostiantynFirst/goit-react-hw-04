import { DNA } from 'react-loader-spinner';
import { SpinerContainer } from './Loader.styled';

export default function Loader () {
  return (
    <SpinerContainer>
      <DNA color="#3f51b5" height={200} width={200} />
    </SpinerContainer>
  );
}