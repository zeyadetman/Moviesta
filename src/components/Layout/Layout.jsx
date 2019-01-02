import React, { Component } from 'react';
import { Layout as AntLayout, Menu, Icon, Input, Select, Pagination, Spin } from 'antd';
import { connect } from 'react-redux';
import {
  searchKeywords,
  searchMoviesByKeywords,
  searchMovies,
  movieMoreInfo
} from 'actions/searchAction';
import PropTypes from 'prop-types';
import { pluck, map, includes, without } from 'ramda';
import Card from './Card';
import { fire, firestore } from 'firebase/base';
import Cookies from 'universal-cookie';
import cinemaLogo from 'assets/circle.png';
import 'antd/dist/antd.css';
import './card.css';

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
      movies: [],
      favs: [],
      mode: 'home',
      favsInfo: [],
      loading: false
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.fetchMovies = this.fetchMovies.bind(this);
    this.addMovieFav = this.addMovieFav.bind(this);
    this.fetchFavsInfo = this.fetchFavsInfo.bind(this);
  }

  componentDidMount() {
    if (fire.auth().currentUser.uid) {
      const ref = firestore.collection('users').doc(fire.auth().currentUser.uid);
      ref.get().then(doc => {
        if (doc.exists) {
          this.setState({ favs: doc.data().favorites });
        }
      });
    }
  }

  async fetchMovies() {
    const { keywordsIds } = this.state;
    await this.props.searchMoviesByKeywords(keywordsIds);
    const { pageCount, results } = this.props;
    this.setState({ searchPagesCount: pageCount * pageSize, movies: results });
  }

  async handleSearch(searchQuery) {
    await this.setState({ searchQuery, mode: 'home', loading: true });
    const { searchType } = this.state;

    if (searchType === 'title') {
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

    this.setState({ loading: false });
  }

  async handlePageChange(pageNum) {
    const { searchType, searchQuery, keywordsIds } = this.state;
    if (searchType === 'title') {
      await this.props.searchMovies(searchQuery, pageNum);
    }
    else if (searchType === 'keywords') {
      await this.props.searchMoviesByKeywords(keywordsIds, pageNum);
    }

    this.setState({ movies: this.props.results });
  }

  async addMovieFav(id) {
    if (this.state.favs && includes(id, this.state.favs)) {
      await this.setState({ favs: without([id], this.state.favs) });
    }
    else {
      await this.state.favs ? this.setState({ favs: [...this.state.favs, id] })
        : this.setState({ favs: [id] });
    }

    firestore.collection('users').doc(fire.auth().currentUser.uid).set({ favorites: this.state.favs });
  }

  async fetchFavsInfo(favs) {
    this.setState({ loading: true });
    const saving = [];
    for (const fav of favs) {
      const mr = await this.props.movieMoreInfo(fav);
      const banks = mr.payload;
      saving.push(banks);
    }

    this.setState({ ...this.state, loading: false, mode: 'favorite', favsInfo: saving, searchPagesCount: 0 });
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
              width: '95%',
              maxWidth: '500px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Select
              defaultValue={this.state.searchType}
              onChange={(searchType) => this.setState({ searchType })}
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
              <Menu.Item key="1" onClick={() => this.handleSearch(this.state.searchQuery)}>Home</Menu.Item>
              <Menu.Item key="2" onClick={() => this.fetchFavsInfo(this.state.favs)}>Favorite List</Menu.Item>
              <Menu.Item key="3" onClick={() => { fire.auth().signOut(); cookies.remove('token'); }}>Sign Out</Menu.Item>
            </SubMenu>
          </Menu>
        </Header>
        <Content style={{ padding: '25px 50px' }}>
          <div style={{
            textAlign: 'center',
            margin: '0 auto',
            marginBottom: '25px',
            width: '50%',
            minWidth: '250px'
          }}>
            <h1 style={{
              fontSize: '3em',
              marginBottom: 0,
              fontWeight: 900,
            }}>
              M
              <span style={{ verticalAlign: 'text-bottom' }}>
                <img style={{ animation: 'spin 6s linear infinite' }} src={cinemaLogo} width="30" alt="cinema logo" />
              </span>
              VIESTA
            </h1>
            <h2 style={{
              color: '#545454',
              fontWeight: 700
            }}>The King of Movies</h2>
          </div>
          <div>
            <Spin tip="Waiting..." spinning={this.state.loading}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gridAutoRows: 'auto',
                gridGap: '1rem'
              }}>
                {
                  this.state.movies
                    ? map(movie => {
                      return (
                        <Card
                          key={movie.id}
                          id={movie.id}
                          poster_path={movie.poster_path}
                          title={movie.title}
                          overview={movie.overview}
                          addMovieFav={this.addMovieFav}
                          isMovieFav={this.state.favs ? includes(movie.id, this.state.favs) : false}
                        />);
                    }, this.state.mode === 'favorite'
                        ? this.state.favsInfo
                        : this.state.movies)
                    : null
                }
              </div>
              <Pagination
                style={{
                  textAlign: 'right',
                  margin: '15px 0'
                }}
                defaultCurrent={1}
                onChange={this.handlePageChange}
                pageSize={pageSize}
                total={this.state.searchPagesCount}
              />
            </Spin>
          </div>
        </Content>
      </AntLayout >
    );
  }
}

Layout.propTypes = {
  searchMoviesByKeywords: PropTypes.func,
  searchKeywords: PropTypes.func,
  movieMoreInfo: PropTypes.func,
  searchMovies: PropTypes.func,
  movie: PropTypes.object,
  poster_path: PropTypes.string,
  id: PropTypes.any,
  results: PropTypes.any,
};

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
    searchMovies,
    movieMoreInfo
  }
)(Layout);