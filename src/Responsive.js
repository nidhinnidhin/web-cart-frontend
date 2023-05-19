import {css} from "styled-components";

export const mobile = (props) => {
    return css`
        @media only screen and (max-width: 900px){
            ${props}

        }
    `;
};
export const tab = (props) => {
    return css`
        @media (min-width: 600px) and (max-width: 1200px){
            ${props}
        }
    `;
};