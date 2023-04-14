import { Component } from 'react';
import { AppContainer } from './App.styled';
import { getImages } from './services/imageAPI';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import errorMessages from './services/constants';
import Loader from './Loader';

export class App extends Component {
  //встановлюємо початковий стан компонента, умови які будуть змінюватися від рендеру до рендеру
  state = {
    query: '',
    images: [],
    page: 1,
    isEmpty: false,
    showBtn: false,
    isLoading: false,
    isError: null,
    showModal: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    //виконуємо умову якщо запит не пустий і не дорівнює попередньому запиту, і не дорівнює сторінці попереднього запиту (якщо відбулася зміна сторінки) то виконуємо запит
    if (query !== prevState.query || page !== prevState.page) {
      try {
        this.setState({ isLoading: true });
        const { hits, totalHits } = await getImages(query, page);
        console.log(hits);
        if (!hits?.length) {
          this.setState({ isEmpty: true });
          return;
        }
        this.setState(prevState => ({
          images: prevState.images.concat(hits),
          showBtn: page < Math.ceil(totalHits / 12),
        }));
      } catch {
        this.setState({ isError: errorMessages.noImages });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }


  //функція яка встановлює стан query, page, images при виконанні запиту
  handleFormSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  //функція яка збільшує сторінку на 1 при кліку на кнопку
  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    //деструктуризуємо стан компонента
    const { images, isEmpty, query, showBtn, isError, isLoading } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} />
        {isLoading && <Loader />}
        {showBtn && <Button onClick={this.onLoadMore} />}
        {isEmpty && (
          <h2>
            There are no pictures with the name {query} in our database, try
            another request!
          </h2>
        )}
        {isError && <h2>{isError}</h2>}
      </AppContainer>
    );
  }
}
