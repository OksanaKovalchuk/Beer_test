import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { toggleSelectBeer } from '../../actions';

class BeerItem extends React.Component {
  handleContextClick(e, id) {
    e.preventDefault();

    this.props.toggleSelectBeer(id);
  }

  renderDeleteButton() {
    if (this.props.isBeerSelected) {
      return (
        <div className="ui checked checkbox red positioned">
          <i className="low check circle red icon" />
        </div>
      )
    }
  }

  render() {
    const { beerInfo, hiddenItem } = this.props;

    return (
      <div className={ `ui three wide column ${ hiddenItem ? 'hidden' : '' }` } >
        <div 
          className="ui fluid card"
          onContextMenu={ (e) => this.handleContextClick(e, beerInfo.id) }
        >
          <div className="image">
           <Link to={ `/beer/${ beerInfo.id }` }>
             <img src={ beerInfo.image_url } className="beer-image" />
             { this.renderDeleteButton() }
           </Link>
          </div>
          <div className="content">
            <Link to={ `/beer/${ beerInfo.id }` }>
              { this.renderDeleteButton() }
              <p className="header">{ beerInfo.name }</p>
            </Link>
            <p className="content">{ beerInfo.description }</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const isBeerSelected = !!(state.beerReducer.beerSelectedList && state.beerReducer.beerSelectedList.length && state.beerReducer.beerSelectedList.filter((item) =>  {
    return item === props.beerInfo.id;
  }).length);

  return {
    isBeerSelected: isBeerSelected,
  };
};

export default connect(mapStateToProps, { toggleSelectBeer })(BeerItem);
