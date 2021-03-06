import React from 'react';
import {
  ListView,
  StyleSheet,
  View,
} from 'react-native-macos';

// 3rd party libraries
import { inject, observer } from 'mobx-react/native';

// Elements
import NewsCell from './news-cell';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

@inject('selectedStore') @observer
export default class NewsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
      key: Math.random(),
    };
  }

  componentDidMount() {
    this.props.selectedStore.getNewsList();
  }

  render() {
    const { newsDataSource } = this.props.selectedStore;

    return (
      <View style={styles.container}>
        <ListView
          key={this.state.key}
          dataSource={newsDataSource}
          renderRow={news => <NewsCell news={news} />}
          enableEmptySections
        />
      </View>
    );
  }
}

NewsPage.propTypes = {
  selectedStore: React.PropTypes.shape({
    getNewsList: React.PropTypes.func,
    newsDataSource: React.PropTypes.array,
  }).isRequired,
};

NewsPage.defaultProps = {};
