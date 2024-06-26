import styled from 'styled-components';

export const SearchbarField = styled.div`
        top: 0;
        left: 0;
        position: sticky;
        z-index: 1100;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 64px;
        padding-right: 24px;
        padding-left: 24px;
        padding-top: 12px;
        padding-bottom: 12px;
        color: #fff;
        background-color: #3f51b5;
        box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
          0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);

          
` 

export const Header = styled.header`
  display: flex;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  padding: 9px 16px;
  border: none;
  border-radius: 4px;
  background-color: #2196F3;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1976D2;
  }

  &:disabled {
    background-color: #b0bec5;
    cursor: not-allowed;
  }
`;

export const ButtonLabel = styled.span`
  font-size: 16px;
  margin-left: 8px;
`

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
  font-size: 16px;
  flex-grow: 1;

  &:focus {
    outline: none;
    border-color: #2196F3;
    box-shadow: 0 0 0 2px #BBDEFB;
  }
`;