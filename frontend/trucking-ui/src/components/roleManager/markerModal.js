import React, {Component} from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class MarkerModal extends Component {


    componentWillUpdate(nextProps, nextState, nextContext) {
        return this.props.open !== nextProps.open
    }

    state = {
        modal: this.props.open
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    render() {
        return (
            <div>
                <img src="/red-marker.png" alt="marker" onClick={this.toggle}/>

                {/*<Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>*/}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Marker</ModalHeader>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

}