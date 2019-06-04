import React from "react";
import styled from "styled-components";
import { FixedSizeList } from "react-window";

const RowContainer = styled.div`
  position: relative;
  width: 100px;
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

const Row = ({ index, style }) => (
  <RowContainer style={style}>
    <RowName>{items[index].name}</RowName>
    <RowImage src={items[index].url} />
  </RowContainer>
);

const items = new Array(100).fill(0).map((_, j) => ({
  name: `photo-${j}`,
  url: `https://picsum.photos/id/${j}/200/300`
}));

export default function App() {
  return (
    <div className="App">
      <FixedSizeList
        height={1000}
        width={100}
        itemSize={120}
        itemCount={items.length}
      >
        {Row}
      </FixedSizeList>
    </div>
  );
}

/*

* Create
*

*/
