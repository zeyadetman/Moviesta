import React, { Component } from 'react';
import { Layout as AntLayout, Menu, Icon, Input, Select, Pagination } from 'antd';
import { connect } from 'react-redux';
import { searchKeywords, searchMoviesByKeywords, searchMovies } from '../../actions/searchAction';
import { pluck, map } from 'ramda';
import 'antd/dist/antd.css';
import Card from './Card';
import { fire } from '../../firebase/base';
import Cookies from 'universal-cookie';

const { Header, Content } = AntLayout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const InputGroup = Input.Group;
const Option = Select.Option;
const pageSize = 20;
const cookies = new Cookies();
class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: 'title',
      searchQuery: '',
      searchPagesCount: 0,
      keywordsIds: [],
      movies: []
    };

    this.handleSearchType = this.handleSearchType.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.fetchMovies = this.fetchMovies.bind(this);
  }

  async fetchMovies() {
    const { keywordsIds } = this.state;
    await this.props.searchMoviesByKeywords(keywordsIds);
    const { pageCount, results } = this.props;
    this.setState({ searchPagesCount: pageCount * pageSize, movies: results });
    console.log(keywordsIds, pageCount, results);
  }

  handleSearchType(searchType) {
    this.setState({ searchType });
  }

  async handleSearch(searchQuery) {
    await this.setState({ searchQuery });
    const { searchType } = this.state;

    if (searchType === 'title') {
      console.log('Title', searchQuery, '------------------------');
      await this.props.searchMovies(searchQuery);
      const { pageCount, results } = this.props;
      this.setState({ searchPagesCount: pageCount * 20, movies: results });
    }
    else if (searchType === 'keywords') {
      await this.props.searchKeywords(searchQuery);
      const { pageCount, results } = this.props;
      let keywordsIdsTemp = pluck('id', results);
      for (let page = 2; page <= pageCount; page++) {
        await this.props.searchKeywords(searchQuery, page);
        const pageResult = pluck('id', this.props.results);
        keywordsIdsTemp = [...keywordsIdsTemp, ...pageResult];
      }

      this.setState({ keywordsIds: keywordsIdsTemp.join('|') }, this.fetchMovies);
    }
  }

  async handlePageChange(pageNum) {
    const { searchType, searchQuery } = this.state;

    if (searchType === 'title') {
      await this.props.searchMovies(searchQuery, pageNum);
      const { results } = this.props;
      this.setState({ movies: results }, () => console.log(this.state.movies));
    }
    else if (searchType === 'keywords') {
      const { keywordsIds } = this.state;
      await this.props.searchMoviesByKeywords(keywordsIds, pageNum);
      const { results } = this.props;
      console.log(results);
    }
  }

  render() {
    return (
      <AntLayout className="layout">
        <Header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}>
          <div className="logo" />

          <InputGroup
            compact
            style={{
              width: '70%',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Select
              defaultValue={this.state.searchType}
              onChange={this.handleSearchType}
              style={{ width: 100 }}
            >
              <Option value="title">Title</Option>
              <Option value="keywords">Keywords</Option>
            </Select>
            <Search
              placeholder="Find Movies, TV Shows and more..."
              onSearch={this.handleSearch}
              style={{ width: 400 }}
              enterButton
            />
          </InputGroup>

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '34px' }}
          >
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="1">Home</Menu.Item>
              <Menu.Item key="2">Favorite List</Menu.Item>
              <Menu.Item key="3" onClick={() => { fire.auth().signOut(); cookies.remove('token') }}>Sign Out</Menu.Item>
            </SubMenu>
          </Menu>
        </Header>
        <Content style={{ padding: '25px 50px' }}>
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gridAutoRows: 'auto',
              gridGap: '1rem'
            }}>
              {
                this.state.movies
                  ? map(movie =>
                    <Card
                      key={movie.id}
                      id={movie.id}
                      poster_path={movie.poster_path}
                      title={movie.title}
                      overview={movie.overview}

                    />, this.state.movies
                  )
                  : null
              }
            </div>
            <Pagination
              style={{
                textAlign: 'right',
                margin: '10px 0'
              }}
              defaultCurrent={1}
              onChange={this.handlePageChange}
              size="small"
              pageSize={pageSize}
              total={this.state.searchPagesCount}
            />
          </div>
        </Content>
      </AntLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    pageCount: state.search.pageCount,
    results: state.search.results
  };
};

export default connect(
  mapStateToProps,
  {
    searchKeywords,
    searchMoviesByKeywords,
    searchMovies
  }
)(Layout);