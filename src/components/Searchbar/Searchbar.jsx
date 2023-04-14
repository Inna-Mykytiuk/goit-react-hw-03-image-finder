import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import {
  SearchContainer,
  SearchForm,
  FormButton,
  FormInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  //встановлюємо початковий стан компонента, умови які будуть змінюватися від рендеру до рендеру
  state = { query: '' };

  //функція яка виконує запит на пошук картинок при введенні запиту
  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ query: value });
  };

  //функція яка виконує запит на пошук картинок при кліку на кнопку
  handleSubmit = e => {
    const { query } = this.state;
    e.preventDefault();
    this.props.onSubmit(query);
    e.currentTarget.reset();
  };
  render() {
    return (
      <SearchContainer>
        <SearchForm onSubmit={this.handleSubmit}>
          <FormButton type="submit">
            <ImSearch style={{ width: 25, height: 25 }} />
          </FormButton>

          <FormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchContainer>
    );
  }
}

export default Searchbar;
