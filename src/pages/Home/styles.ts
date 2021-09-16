import styled from "styled-components"

export const Container = styled.div`
  background-color: #2F80ED;
  width: 94.2vw;
  min-height: 100vh;

  margin-top: 108px;
  padding: 0 2em;
  
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;

  position: relative;

  h1 {
    font-family: Libre Baskerville;
    font-style: normal;
    font-weight: normal;
    font-size: 72px;
    line-height: 89px;
    text-align: center;
    align-self: center;

    color: #FFFFFF;
  }
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 594px 200px;
  column-gap: 15px;
  row-gap: 15px;
`