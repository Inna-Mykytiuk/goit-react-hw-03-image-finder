import { Component } from 'react';

import { GlobalStyle } from './GlobalStyle';
import { Notification } from './Notification/Notification';
import { Section } from './Section/Section';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  render() {
    return (
      <Container>
        <GlobalStyle />
        <Section title="Please leave feedback"></Section>

        <Section title="Statistics">
          <Notification message="There is no feedback" />
        </Section>
      </Container>
    );
  }
}
