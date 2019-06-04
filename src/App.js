import React, { memo } from "react";
import memorize from "memorize-one";
import styled from "styled-components";
import { FixedSizeList, areEqual } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

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

const Row = memo(({ data, index, style }) => {
  const item = data[index];

  return (
    <RowContainer style={style}>
      <RowName>{item.name}</RowName>
      <RowImage src={item.url} />
    </RowContainer>
  );
});

const ENDPOINT = "https://api.thecatapi.com/v1/images/search";
const LIMIT = 10;

export default class App extends React.Component {
  state = {
    items: [],
    moreItemsLoading: false,
    page: 0
  };

  async loadMoreItems(startIndex, stopIndex) {
    console.log("Loading...");

    this.setState({ moreItemsLoading: true });

    const response = await fetch(
      `${ENDPOINT}?limit=${LIMIT}&page=${startIndex / LIMIT}`
    );
    const data = await response.json();
    const items = data.map(e => ({ name: `cat-${e.id}`, url: e.url }));

    this.setState({
      moreItemsLoading: false,
      page: this.state.page + 1,
      items: this.state.items.concat(items)
    });
  }

  componentDidMount() {
    this.loadMoreItems(0);
  }

  render() {
    return (
      <FixedSizeList
        height={1000}
        width={100}
        itemCount={this.state.items.length}
        itemData={this.state.items}
        itemSize={100}
      >
        {Row}
      </FixedSizeList>
    );
  }
}
