/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../css/Cards.css';
/* eslint-enable no-unused-vars */

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
        };
    }
    /**
     * Updates component state when new props are received from parent.
     * @param {Object} props
     */
    componentWillReceiveProps(props) {
        this.setState({ items: props.items });
    }

    render() {
        // Create HTML elements from items. Note that no more that 100 items
        // should be displayed at a time.
        const cards = this.state.items.map((item, index) => {
            let style;
            if (item.imageUrl) {
                style = { backgroundImage: `url(${item.imageUrl})` };
            }
            const title = (<h4
                key={index + 100}
                className='card-title'>
                {item.name}
            </h4>);
            return (
                <div className='card' key={index}>
                    <div
                        className='card-body'
                        key={index + 200}
                        style={style}>
                        {item.link ? <Link to={item.link}>{title}</Link> : title}
                        <p className='card-desc'>
                            {item.description}
                        </p>
                    </div>
                </div>
            );
        });

        return (
            <div className='container-fluid cards'>
                {cards}
            </div>
        );
    }
}

export default Cards;
