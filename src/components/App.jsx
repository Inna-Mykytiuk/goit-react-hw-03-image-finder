import { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppStyled } from "./App.styled"
import { Searchbar } from "./Searchbar/Searchbar";
import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery"
import { fetchImages } from "../utils/service";
import { Dna } from 'react-loader-spinner'
import {Modal} from "./Modal/Modal"

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    totalHits: 0,
    showModal: false,
    activeImage: null,
   
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
window.scrollTo({behavior: 'smooth', top:0})
      fetchImages(query).then(data => {
        const results = data.hits.map(image => ({ tags: image.tags, id: image.id, smallImage: image.webformatURL, largeImage: image.largeImageURL }));
        if (!data.totalHits) {
          console.log(data.totalHits, data.hits);
        toast.error('There are no images for your request');
      }
        return this.setState({
          page: 1,
          images: results,
          totalHits: data.totalHits
        });
    }
    ).catch(error => console.error(error)).finally(()=> this.setState (({isLoading})=> ({isLoading:!isLoading})));
    }
    
  if (prevState.page !== page && page !== 1) {
        this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
        fetchImages(query, page).then(data => {
          const results = data.hits.map(image => ({ tags: image.tags, id: image.id, smallImage: image.webformatURL, largeImage: image.largeImageURL }));
          
          return this.setState(({
            images
          }) => { return {images: [...images, ...results]} });
      }
      ).catch(error => console.error(error)).finally(()=> this.setState (({isLoading})=> ({isLoading:!isLoading})));
      }

  }
  
  submitHandler = (query) => {
    this.setState({
      query
    })
  }

  onLoadMoreButton = () => {
    this.setState(({ page }) => ({
      page: page+1
    }))
    
}

  
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onImageClick = (event) => {
    const largeUrl = event.target.dataset.large;
    const targetAlt = event.target.alt;
    this.setState(({ showModal }) => ({ showModal: !showModal, activeImage: {largeUrl, targetAlt}}))
  };

  render() {
    return (
      <AppStyled>
        <Searchbar onSubmit={this.submitHandler}></Searchbar>
        {this.state.isLoading && <Dna wrapperStyle={{ margin: '0 auto' }} />}
        <ImageGallery images={this.state.images} openModal={this.onImageClick} ></ImageGallery>
      {this.state.totalHits > this.state.images.length && <Button onLoadMoreButton={this.onLoadMoreButton} />}
      {this.state.showModal && <Modal image={this.state.activeImage} onClose={this.toggleModal}></Modal>}
      <ToastContainer></ToastContainer>
      </AppStyled>
    );
  }
};


