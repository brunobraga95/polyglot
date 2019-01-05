import React from 'react';
import Button from '@material-ui/core/Button';
import AddWord from '../../components/AddWord';
import WordMatch from '../../components/WordMatch';

import { getSentencesList, updateRevealsUsage } from '../../db/firestore/firestore';

import { sentencesListAdapater, shuffle, increaseRevealsRate, decreaseRevealsRate } from './logic';

//TODO update this componenent name to sentenceType.js 
export class SentenceType extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentSentence: 0,
      addButtonDialogOpen: false,
      sentencesList: false,
      fetchedSentencesList: false
    }    
  }
    
  componentDidMount() {
    getSentencesList().then((querySnapshot) => {
      const sentencesList = [];
      // TODO move all this to logic file 
      querySnapshot.forEach((doc) => {
        sentencesList.push({ sentence: doc.id, translations: doc.data() })
      })
      this.setState({
        sentencesList: sentencesListAdapater(sentencesList),
        fetchedSentencesList: true
      })  
    });
  }

  onAddSentenceClick = () => {
    this.setState({ addButtonDialogOpen: !this.state.addButtonDialogOpen });
  }

  onMatch = (isMatch) => {
    if(isMatch) {
      //TODO move to separated function
      const sentencesList = this.state.sentencesList;
      const currentSentence = sentencesList[this.state.currentSentence];
      const revealsUsageRate = Math.max(currentSentence.revealsUsageRate - 1, 0);

      if (revealsUsageRate !== currentSentence.revealsUsageRate) {
        this.setState({ sentencesList: decreaseRevealsRate(sentencesList, this.state.currentSentence) })
        updateRevealsUsage(currentSentence.sentence, revealsUsageRate);  
      }
      
      if(this.state.currentSentence === this.state.sentencesList.length - 1) {
        this.setState({ currentSentence: 0, sentencesList: shuffle(this.state.sentencesList) })
        alert("shuffle again");
      } else this.setState({ currentSentence: this.state.currentSentence + 1 });
    }
  }

  onRevealTranslations = () => {
    const sentencesList = this.state.sentencesList;
    const currentSentence = sentencesList[this.state.currentSentence];
    const translationsArray = currentSentence.translations;
    const revealsUsageRate = currentSentence.revealsUsageRate;
    this.setState({ sentencesList: increaseRevealsRate(sentencesList, this.state.currentSentence) })
    updateRevealsUsage(currentSentence.sentence, revealsUsageRate + 2);
    // TODO handle when there are multiple translations
    // const translations = translationsArray.reduce((translation, acc) => `${translation}, ${acc}`, '');
    alert(translationsArray[0]);
  }

  render()  {
    const currentSentence = this.state.sentencesList[this.state.currentSentence];
    if(this.state.fetchedSentencesList) {
      return (
        <div className="word-type-wrapper">
          <WordMatch translations={currentSentence.translations} match={this.onMatch} sentence={currentSentence.sentence} />
          <AddWord open={this.state.addButtonDialogOpen} onCloseDialog={this.onAddSentenceClick} />   
          <div className="word-type-buttons-wrapper">
            <Button onClick={this.onRevealTranslations} variant="contained" color="primary">Reveal</Button>
            <Button onClick={this.onAddSentenceClick} variant="contained" color="primary">add new word</Button>
          </div>   
        </div>
      ) 
    } else return <div>loading</div>
  }
}
