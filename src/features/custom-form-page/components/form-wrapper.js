import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export class FormWrapper extends React.Component {
    static propTypes = {
        entity: PropTypes.object.isRequired,
        render: PropTypes.func.isRequired
    };

    render() {
        const { entity, render } = this.props;
        return (
            <Fragment>
                {render({
                    entity
                })}
            </Fragment>
        );
    }
}
