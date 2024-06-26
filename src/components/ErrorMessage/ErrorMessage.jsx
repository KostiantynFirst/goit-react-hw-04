import { ErrorContainer } from "./ErrorMessage.styled";

const ErrorMessage = ({ message }) => {
  return (
    <ErrorContainer>
      {message}
    </ErrorContainer>
  );
};

export default ErrorMessage;