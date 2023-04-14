import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContainer } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  //монтуємо слухача клавіатури
  componentDidMount() {
    window.addEventListener('keydown', this.handelClick);
  }

  //видаляємо слухача клавіатури
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handelClick);
  }

  //функція яка закриває модальне вікно при кліку на кнопку Esc
  handelClick = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  //функція яка закриває модальне вікно при кліку на бекдроп
  handleClickOnBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleClickOnBackdrop}>
        <ModalContainer>{this.props.children}</ModalContainer>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
