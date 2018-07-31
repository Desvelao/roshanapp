import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const withModal = (Component) =>
  class Modal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: true
      };

      this.toggle = this.toggle.bind(this);
    }
    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }
    render() {
      return (
        <div>
          <Modal isOpen={this.state.modal} toggle={() => this.props.onClickClose()} className={this.props.className} external={externalCloseBtn}>
            <ModalHeader toggle={() => this.props.onClickClose()}>{this.props.title}</ModalHeader>
            <ModalBody>
              <Component data={this.props.data}/>
            </ModalBody>
          </Modal>
        </div>
      );
    }
  }

export default withModal;
