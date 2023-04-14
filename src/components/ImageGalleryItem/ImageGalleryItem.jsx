import { Component } from 'react';
import Modal from 'components/Modal';
import { ItemContainer, ImageGallery } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  //встановлюємо початковий стан компонента, умови які будуть змінюватися від рендеру до рендеру
  state = { showModal: false };

  //функція яка виконує відкриття модального вікна при кліку на картинку
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  render() {
    const { showModal } = this.state;
    const { id, webformatURL, tags, largeImageURL } = this.props;
    return (
      <>
        <ItemContainer key={id} onClick={this.toggleModal}>
          <ImageGallery src={webformatURL} alt={tags} />
        </ItemContainer>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
