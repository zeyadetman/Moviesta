import React, { Component } from 'react';
import { Card as AntCard, Icon, Rate, Modal } from 'antd';
import { connect } from 'react-redux';
import { movieMoreInfo } from '../../actions/searchAction';
import { formatYear } from '../../utils/index';
import { pluck } from 'ramda';
import './card.css';

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
    const { poster_path, id, title } = this.props;
    const { genres, release_date, homepage, overview, vote_average, popularity, runtime } = this.state.movie;
    return (
      <div>
        <AntCard
          cover={<img alt="example" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />}
          actions={[
            <Rate count={1} key={id} />,
            <Icon type="edit" key={id} />,
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
            marginBottom: '15px',
            flexWrap: 'wrap'
          }}>
            <img
              style={{
                maxWidth: '360px',
                width: '100%'
              }}
              alt="example"
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            />
            <div
              style={{
                marginLeft: '15px'
              }}
              className="movie__meta"
            >
              <h1 style={{ fontSize: '2.5em' }}><a href={homepage} rel="noopener">{title}</a></h1>
              <p>{formatYear(release_date) || 'Date Not Found'}</p>
              <p>{genres ? pluck('name', genres).join(' / ') : 'No Genres Found'}</p>
              <p><Icon type="clock-circle" theme="twoTone" twoToneColor="#52c41a" /> {runtime}</p>
              <p><Icon type="line-chart" /> {popularity}</p>
              <p><Icon type="notification" theme="twoTone" twoToneColor="#fc3" /> {vote_average}</p>
            </div>
          </div>
          <p>{overview}</p>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movie: state.search.movie,
  };
};

export default connect(
  mapStateToProps,
  { movieMoreInfo }
)(Card);