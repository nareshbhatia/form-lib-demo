import React from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

@observer
export class Field extends React.Component {
    static propTypes = {
        entity: PropTypes.object.isRequired,
        attr: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired
    };

    render() {
        const { entity, attr, component, ...props } = this.props;
        return React.createElement(component, {
            value: entity[attr] || '',
            onChange: this.handleChange,
            ...props
        });
    }

    @action
    handleChange = event => {
        const { entity, attr } = this.props;
        entity[attr] = event.target.value;
    };
}
