import React from 'react';
import get from 'lodash/get';
import set from 'lodash/set';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

@observer
export class Field extends React.Component {
    static propTypes = {
        entity: PropTypes.object.isRequired,
        attr: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired,
        validationSchema: PropTypes.object.isRequired
    };

    render() {
        const {
            entity,
            attr,
            component,
            validationSchema,
            ...props
        } = this.props;
        return React.createElement(component, {
            value: get(entity, attr) || '',
            onChange: this.handleChange,
            ...props
        });
    }

    @action
    handleChange = event => {
        const { entity, attr, validationSchema } = this.props;
        set(entity, attr, event.target.value);

        validationSchema
            .validate(entity, {abortEarly: false})
            .then(valid => {
                console.log('Schema is valid:', valid);
            })
            .catch(err => {
                console.log('Schema is invalid:', err);
            });
    };
}
