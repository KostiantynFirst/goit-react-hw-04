import styled from 'styled-components';

export const Btn = styled.button`
    margin: 0 auto;
    padding: 9px 16px;
    border-radius: 4px;
    background-color: #2196F3;
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
    text-align: center;
    display: inline-block;
    color: #fff;
    border: 0;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-family: inherit;
    font-size: 18px;
    line-height: 24px;
    font-style: normal;
    font-weight: 500;
    width: 180px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

      &:hover,
      &:focus {
    background-color: #303f9f;
    }
`