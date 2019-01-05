import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@material-ui/core/TextField';

import { adaptToFirestore, isInputValid } from './logic';
import { updateVocabulary } from '../../db/firestore/firestore';

export class AddWord extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sentence: "",
      translation: ""
    }
  }

  handleNewSentenceOnChange = (event) => {
    const newSentence = event.target.value;
    this.setState({ sentence: newSentence });
  }

  handleTranslationOnChange = (event) => {
    const newSentenceTranslation = event.target.value;
    this.setState({ translation: newSentenceTranslation });
  }

  onAddSentenceClick = () => {
    const validInputs = isInputValid(this.state.sentence) && isInputValid(this.state.translation);
    if(validInputs) {
      // TODO handle error when writing to firestore
      updateVocabulary(adaptToFirestore(this.state.sentence, [this.state.translation]))
      this.props.onCloseDialog()
    } else {
      alert("Inputs are not valid, most likely they are empty");
    }
  }

  render() {
    return (
      <Dialog aria-labelledby="simple-dialog-title" open={this.props.open}>
        <DialogTitle id="add-sentence-dialog-title">Add New Sentence</DialogTitle>
        <div className="add-sentence-wrapper">
          <TextField 
            id="add-sentence-input"
            label="New sentence (English)"
            margin="normal"
            onChange={this.handleNewSentenceOnChange}
            value={this.state.sentence}
          />
          <TextField 
            id="add-sentence-translation"
            label="Translation (German)"
            margin="normal"
            onChange={this.handleTranslationOnChange}
            value={this.state.translation}
          />
          <div className="add-sentence-button-wrapper">
            <Button onClick={this.onAddSentenceClick} variant="contained" color="primary">add sentence</Button>
            <Button onClick={this.props.onCloseDialog} variant="contained" color="primary">cancel</Button>
          </div>
        </div>
      </Dialog>
    );
  } 
}

AddWord.prototypes = {
  open: PropTypes.bool,
  onCloseDialog: PropTypes.func
}
