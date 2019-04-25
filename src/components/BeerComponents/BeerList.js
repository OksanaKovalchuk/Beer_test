import React from 'react';
import { connect } from 'react-redux';

import BeerItem from './BeerItem';
import '../App.css';

import { getBeerList, deleteBeers } from '../../actions';

let isScrolling;

class BeerList extends React.Component {
  componentDidMount() {
    // Get first page
    if (!this.props.beers) {
      this.props.getBeerList();
    }

    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      const observableElem = document.getElementById('observable');
      const bounding = observableElem.getBoundingClientRect();
      const isInView = (
        bounding.top >= 0 &&
        bounding.bottom + observableElem.clientHeight <= (
          window.innerHeight || document.documentElement.clientHeight
        )
      );

      if (isInView) {
        const { displayedList } = this.props;

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

        const beerSelectedList = displayedList && displayedList
          .filter((item, index) => {
            return index < 5;
          })
          .map((item) => {
          return item.id;
        });

        this.props.deleteBeers(beerSelectedList);
      }
    }, 500);
  };

  componentDidUpdate(prevProps) {
    const { displayedList } = this.props;
    if (prevProps.displayedList !== displayedList && displayedList.length < 10) {
      let { page } = this.props;

      page++;

      this.props.getBeerList(page);
    }
  }

  deleteItemsFromList() {
    const { beerSelectedList } = this.props;

    this.props.deleteBeers(beerSelectedList);
  }

  renderDeleteButton() {
    const { beerSelectedList } = this.props;

    if (!!(beerSelectedList && beerSelectedList.length)) {
      return (
        <div className="ui red button" onClick={ this.deleteItemsFromList.bind(this) }>
          Delete selectedBeers from view
        </div>
      );
    }
  }

  renderObservableButton() {
    const { displayedList } = this.props;

    if (displayedList && displayedList.length === 10) {
      return (
        <div id="observable" >
          <h2>Load more</h2>
        </div>
      )
    }
  }

  renderList() {
    const { displayedList } = this.props;

    if (!displayedList) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    return displayedList.map((beerInfo, index) => {
      return (
        <BeerItem
          key={ beerInfo.id }
          beerInfo={ beerInfo }
          hiddenItem={ index >= 5 }
        />
      );
    })
  }

  render() {
    return (
      <div>
        <div className="ui breadcrumb">
          <div className="active section">Beer-List</div>
        </div>
        <div className="delete-button-wrapper">
          { this.renderDeleteButton() }
        </div>

        <div className="ui grid">
          { this.renderList() }
        </div>
        <div className="ui button primary" id="load-more">
          { this.renderObservableButton() }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    page,
    beerList,
    displayedList,
    beerSelectedList,
  } = state.beerReducer;

  return {
    page,
    displayedList,
    beerSelectedList,
    beers: beerList,
  };
};

export default connect(mapStateToProps, { getBeerList, deleteBeers })(BeerList);
