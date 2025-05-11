import styled, {keyframes, css} from "styled-components";

export const Container = styled.div`
    max-width: 600px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0,0,0, 0.2);
    padding: 25px;
    margin: 40px auto;

    h1{
        font-size: 19px;
        display: flex;
        align-items: center;
        flex-direction: row;
    }

    svg{
        margin-right: 10px;
    }

    /* MEDIA QUERY */
    @media (max-width: 580px) {
        max-width: 90%;
        padding: 20px;
        margin: 40px auto;
    
    h1 {
      font-size: 16px;
    }
  }

`;

export const Form = styled.form`
    margin-top: 25px;
    display: flex;
    flex-direction: row;

    input {
        flex: 1;
        border: 2px solid ${props => (props.alertError ? '#900' : '#EEE')};
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 15px;
    }

    /* MEDIA QUERY */
    @media (max-width: 580px) {
        margin-top: 15px;
    input {
        padding: 8px 12px;
        font-size: 12px;
    }
  }
`;

//Criando animação do botão

const animated = keyframes`
  from{
    transform: rotate(0deg);
  }

  to{
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading,
}))`
  background: #0d2636;
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 2px 0 12px;
  display: flex;
  justify-content: center;
  align-items: center;

  /* Estilo normal */
  .plusIcons {
    font-size: 15px;
  }

  &[disabled]{
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${props => props.loading &&
    css`
      svg{
        animation: ${animated} 2s linear infinite;
      }
    `
  }

  /* Estilo para telas menores */
  @media (max-width: 580px) {
    margin-left: 6px;
    padding: 0 0px 0 10px;

    .plusIcons {
      font-size: 10px; /* diminui o ícone */
    }
  }
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 11px;

  li{
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
    & + li{
      border-top: 2px solid #eee;
    }

    a{
      color: #0d2636;
      text-decoration: none;
    }
  }
`;

export const DeleteButton = styled.button.attrs({
  type:'button'
})`
  background: transparent;
  color: #E81C24; 
  font-size: 17px;
  border: 0;
  padding: 3px 1px;
  outline: 0;
  border-radius: 4px;
`;
