import { Link } from "react-router-dom";
import styled from "styled-components";


export const Loading = styled.div`
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Container = styled.div`
    max-width: 600px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0,0,0, 0.2);
    padding: 10px 4px;
    margin: 55px auto;
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
        width: 140px;
        border-radius: 20%;
    }

    h1{
        font-size: 30px;
        margin-bottom: 6px;
        color: #0D2636;
    }

    p{
        margin-bottom: 15px;
        font-size: 14px;
        color: #000;
        text-align: center;
        line-height: 1.4;
        max-width: 400px;
    }
`;

export const BackButton = styled(Link)`
    background: transparent;
    border: 0;
    color: #000;
    font-size: 20px;
    padding: 10px;
`;

export const IssuesList = styled.ul`
    margin-top: 10px;
    padding-top: 25px;
    border-top: 2px solid #eee;
    list-style: none;

    h2{
        margin: 0 0 12px 3px;
        background-color:rgb(150, 216, 103);
        color: #0d2636;
        border: 1px solid #0d2636;
        width: 74px;
        padding: 3px;
        border-radius: 6px;

    }

    li{
        display: flex;
        padding: 8px 10px;

        & + li{
            margin-top: 12px;
        }
    }

    img{
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #0d2636;
    }

    div{
        flex: 1;
        margin-left: 12px;

        p{
            margin-top: 10px;
            font-size: 12px;
            color: #000;
        }
    }

    strong{
        font-size: 15px;

        a{
            text-decoration: none;
            color: #222;
            transform: 0.3s;

            &:hover{
                color: #0071db
            }
        }

        span{
            background: #222;
            color: #fff;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            padding: 3px 5px;
            margin-left: 10px;
        }
    }
`;

export const Pagination = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    
    button{
        border: 0;
        background-color: #0071db;
        color: #fff;
        /* margin: 20px 20px 5px 20px; */
        margin: 40px auto 5px auto;
        padding: 4px 22px;
        border-radius: 4px;

        &:disabled{
            cursor: not-allowed;
            opacity: 0.5;
        }
    }

    span{
        padding: 4px 22px;
        margin: 40px auto 5px auto;
    }
`;

export const FilterList = styled.div`
    margin: 10px 0;

    button{
        outline: 0;
        border: 0;
        padding: 4px 22px;
        border-radius: 4px;
        margin: 0px 5px 7px 2px;

        &:nth-child(${props => props.active + 1}){
            background-color: #0071db;
            color: #fff;
        }
    }
`;
