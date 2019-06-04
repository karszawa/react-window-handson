import React from "react";
import styled from "styled-components";

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const RowContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

const RowName = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 2px 8px;
  background-color: black;
  color: white;
  box-sizing: border-box;
`;

const RowImage = styled.img`
  width: 100%;
  height: 100%;
`;

const Row = ({ name, url }) => (
  <RowContainer>
    <RowName>{name}</RowName>
    <RowImage src={url} />
  </RowContainer>
);

export default function App() {
  const rows = new Array(1000)
    .fill(0)
    .map((_, j) => (
      <Row
        key={j}
        name={`photo-${j}`}
        url={`https://picsum.photos/id/${j}/200/300`}
      />
    ));

  return (
    <div className="App">
      <Container>{rows}</Container>
    </div>
  );
}

/*

* Create
*

*/
