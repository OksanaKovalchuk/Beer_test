import React from 'react';
import { connect } from 'react-redux';

import { getSelectedBeer } from "../../actions";

class BeerDetail extends React.Component {
  componentDidMount() {
    this.props.getSelectedBeer(this.props.match.params.id);
  }

  renderIngredientList = (ingredientData) => {
    if (typeof ingredientData === 'string') {
      return(
        <li value="*">
          <span className="ui grey inverted header" key={ ingredientData } >{ ingredientData }</span>
          Take { ingredientData } yeast for this beer
        </li>
      )
    }
    return ingredientData.map((product) => {
      const {
        name,
        amount,
        attribute,
        add,
      } = product;

      return(
        <li value="*" key={ `${ add}.${ name }` }>
          <span className="header ui grey inverted" >{ name } on the { add } stage</span>
          Take { name } in amount of { amount.value } { amount.unit } {
            add ? `on the ${ add } of preparation` : ''
          } to gain better { attribute }
        </li>
      )
    })
  };

  renderIngredients(beerIngredients) {
    return Object.keys(beerIngredients).map((ingredient) => {
      return (
        <div className="item" key={ ingredient } >
          <div className="content">
            <div className="header">{ ingredient }</div>
            <div className="ui inverted segment">
              <ol className="ui relaxed divided list">
              { this.renderIngredientList(beerIngredients[ingredient]) }
              </ol>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    const beerList = this.props.beer;
    const beer = beerList && beerList[0];

    if (!beer) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    return (
      <div className="ui items">
        <div className="ui breadcrumb">
          <a className="section ui back-button" onClick={ () => window.history.back() } >Home</a>
        </div>
        <div className="item">
          <div className="image">
            <img
              src={ beer.image_url }
              alt={ beer.name }
              className="ui image"
            />
          </div>
          <div className="content">
            <div className="header">{ beer.name }</div>
            <div className="description">
              <p>
                { beer.description }
              </p>
            </div>
            <div className="extra">
              <div className="ui segment">
                <div className="ui relaxed divided list">
                  { this.renderIngredients(beer.ingredients) }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    beer: state.beerReducer.selectedBeer,
  };
};

export default connect(mapStateToProps, { getSelectedBeer })(BeerDetail);
