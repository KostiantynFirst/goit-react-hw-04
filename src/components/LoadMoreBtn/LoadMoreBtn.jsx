import { Btn } from "./LoadMoreBtn.styled";

const LoadMoreBtn = ({ onClick, isLoading }) => {
    return (
        <Btn type="button" onClick={onClick}>
          {isLoading ? 'Loading...' : 'Load more'}
        </Btn>
    );
}

export default LoadMoreBtn;