import React, { Component } from 'react';
import { Card as AntCard, Icon, Rate, Modal } from 'antd';
import { connect } from 'react-redux';
import { movieMoreInfo } from 'actions/searchAction';
import { formatYear } from 'utils/index';
import PropTypes from 'prop-types';
import { pluck } from 'ramda';

const { Meta } = AntCard;
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      movie: {}
    };

    this.handleViewModal = this.handleViewModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  async handleViewModal(movieId) {
    const { movieMoreInfo } = this.props;
    await movieMoreInfo(movieId);
    this.setState({ isModal: true, movie: this.props.movie });
  }

  handleClose() {
    this.setState({ isModal: false });
  }

  render() {
    const { poster_path, id, title, isMovieFav } = this.props;
    const { genres, release_date, homepage, overview, vote_average, popularity, runtime } = this.state.movie;
    return (
      <div>
        <AntCard
          cover={<img alt="example" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />}
          actions={[
            <Rate count={1} key={id} defaultValue={isMovieFav ? 1 : 0} onChange={() => this.props.addMovieFav(id)} />,
            <Icon type="info-circle" onClick={() => this.handleViewModal(id)} key={id} />
          ]}
        >
          <Meta
            title={title}
            description={null}
          />
        </AntCard>
        <Modal
          title={title}
          visible={this.state.isModal}
          onOk={this.handleClose}
          onCancel={this.handleClose}
        >
          <div style={{
            display: 'flex',
            flexWrap: 'wrap'
          }}>
            <img
              style={{
                maxWidth: '360px',
                width: '100%',
                maxHeight: '400px'
              }}
              alt="example"
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            />
            <div
              style={{
                marginLeft: '15px',
                maxWidth: '500px',
                minWidth: '200px'
              }}
              className="movie__meta"
            >
              <h1 style={{ marginBottom: 0 }}>
                <a href={homepage} rel="noopener" style={{ fontSize: '2em' }}>{title}</a>
                <span style={{ marginLeft: '10px', fontSize: '1em' }}>{formatYear(release_date) || 'Date Not Found'}</span>
              </h1>

              <p style={{
                fontSize: '1.5em',
                fontWeight: 600
              }}>{genres ? pluck('name', genres).join(' / ') : 'No Genres Found'}</p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                fontSize: '1.2em',
                margin: '10px 5px'
              }}>
                <p title="Runtime"><Icon type="clock-circle" theme="twoTone" twoToneColor="#52c41a" /> {runtime}</p>
                <p title="Popularity"><Icon type="line-chart" /> {popularity}</p>
                <p title="Vote Average"><Icon type="notification" theme="twoTone" twoToneColor="#fc3" /> {vote_average}</p>
              </div>
              <label>
                <span style={{
                  fontSize: '1.5em',
                  fontWeight: 500
                }}>Overview</span>
                <p style={{ textAlign: 'justify' }}>{overview}</p>
              </label>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

Card.propTypes = {
  results: PropTypes.array,
  id: PropTypes.any,
  isMovieFav: PropTypes.bool,
  movieMoreInfo: PropTypes.func,
  addMovieFav: PropTypes.func,
  movie: PropTypes.object,
  title: PropTypes.string,
  poster_path: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    movie: state.search.movie,
  };
};

export default connect(
  mapStateToProps,
  { movieMoreInfo }
)(Card);