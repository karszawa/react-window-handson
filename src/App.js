import React from "react";
import styled from "styled-components";
import { FixedSizeList } from "react-window";
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

const List = ({ items, moreItemsLoading, hasNextPage, loadMoreItems }) => {
  const Row = ({ index, style }) => {
    const itemLoading = index >= items.length;

    if (itemLoading) {
      return <RowContainer style={{ ...style, backgroundColor: "grey" }} />;
    } else {
      return (
        <RowContainer style={style}>
          <RowName>{items[index].name}</RowName>
          <RowImage src={items[index].url} />
        </RowContainer>
      );
    }
  };

  const itemCount = hasNextPage ? items.length + 1 : items.length;

  console.log(items.length);

  return (
    <InfiniteLoader
      isItemLoaded={index => index < items.length - 1}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          height={1000}
          width={100}
          itemCount={itemCount}
          itemSize={120}
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {Row}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
};

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

  render() {
    return (
      <List
        items={this.state.items}
        moreItemsLoading={this.state.moreItemsLoading}
        hasNextPage={true}
        loadMoreItems={this.loadMoreItems.bind(this)}
      />
    );
  }
}
