import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import { initialState } from './constants';
import { normalizeWords } from './logic';

// TODO rename to SentenceMatch
export class WordMatch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      translations: normalizeWords(props.translations)
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.sentence !== nextProps.sentence) {
      this.setState({ translations: normalizeWords(nextProps.translations) })
    }
  }

  handleOnChange = (event) => {
    const sentence = event.target.value;
    const normalizedWord = normalizeWords(sentence);
    const isMatch = this.state.translations.includes(normalizedWord)
    if(isMatch) {
      this.setState({ currentSentence: "", isMatch: true });
      this.props.match(normalizedWord);
    } else this.setState({ currentSentence: normalizedWord });
  }

  render() {
    return (
      <div>
        <div className="word"> {this.props.sentence}</div>
        <TextField 
          id="sentence-match-input"
          label="In German"
          value={this.state.currentSentence}
          onChange={this.handleOnChange}
          margin="normal"
        />
      </div>  
    );
  }
}

WordMatch.propTypes = {
  translations: PropTypes.array,
  sentence: PropTypes.string,
  match: PropTypes.func
};


