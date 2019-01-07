import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { getSentencesList } from '../../db/firestore/firestore'
import { parseTranslationsArrayToString } from "../../helpers";
import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles'

const GenerateListItem = (sentence, translations) => (
  <ListItem>
    <ListItemText
      primary={sentence}
      secondary={parseTranslationsArrayToString(translations)}
    />
  </ListItem>  
)

class SentencesListDialog extends React.PureComponent {
  state = {
    sentecesList: [],
    fetchedSentencesList: false
  }
  componentDidMount() {
    getSentencesList().then((querySnapshot) => {
      let sentencesList = [];

      querySnapshot.forEach((doc) => {
        const translations = doc.data()[this.props.language];
        
        if (translations) {
          sentencesList.push({ 
            sentence: doc.id,
            translations: translations
          })
        }
      })
      this.setState({
        sentencesList,
        fetchedSentencesList: true
      });
    })
  }

  render() {
    if(!this.state.fetchedSentencesList) {
      return null;
    }
    console.log(this.state.sentencesList)
    return (
      <List className={this.props.classes.root}>
        {this.state.sentencesList.map(({ sentence, translations }) =>
          GenerateListItem(sentence, translations))}
      </List>  
    )
  }
}

SentencesListDialog.defaultProps = {
  language: 'german'
}

SentencesListDialog.propTypes = {
  classes: PropTypes.object,
  language: PropTypes.string
}

export default withStyles(styles)(SentencesListDialog);
