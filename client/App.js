import React from 'react'

import {
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  DatePickerAndroid
} from 'react-native'

import Note from './app/components/Note'
import ImagePicker from 'react-native-image-picker'
import RNFS from 'react-native-fs'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      noteArray: [],
      noteText: '',
      avatarSource: {},
      date: null,
      url: ''
    }

    this.addNote = this.addNote.bind(this)
    this.deleteNote = this.deleteNote.bind(this)
    this.changeText = this.changeText.bind(this)
    this.selectImage = this.selectImage.bind(this)
    this.storageFunc = this.storageFunc.bind(this)
    this.addDate = this.addDate.bind(this)
    this.updateText = this.updateText.bind(this)

  }

  componentWillMount () {
    const filePath = RNFS.DocumentDirectoryPath + '/todoList.json'
    if (RNFS.exists(filePath)) {
      RNFS.readFile(filePath)
        .then((data) => {
          this.setState({
            noteArray: data ? JSON.parse(data) : []
          })
        })
    } else {
      this.storageFunc([])
    }
  }

  storageFunc (data) {
    const filePath = RNFS.DocumentDirectoryPath + '/todoList.json'
    RNFS.writeFile(filePath, JSON.stringify(data))
    this.setState({
      noteArray: data
    })
  }

  async addDate (note) {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date()
      })
      let newDate;
      if (typeof year === 'undefined') {
         newDate = new Date()

      } else {
         newDate = year + '/' + month + '/' + day
      }
      let notes = this.state.noteArray
      notes.forEach((localnote) => {
        if (localnote.id === note.id) {
          localnote.date = newDate
        }
      })

      this.setState({noteArray: notes})

      this.storageFunc(notes)
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message)
    }
  }

  addNote () {
    if (this.state.noteText) {
      const d = new Date()
      let notes = this.state.noteArray

      notes.push({
        'id': Math.random() * 100,
        'date': this.state.date || d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate(),
        'note': this.state.noteText,
        'url': ''
      })
      this.storageFunc(notes)

      this.setState({
        noteArray: notes,
        noteText: '',
        avatarSource: {},
        date: null
      })
    }
  }

  selectImage (note) {
    let options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      }
      else {
        let filePath = RNFS.DocumentDirectoryPath + response.fileName
        console.log('response', response)
        RNFS.writeFile(filePath, response.data, 'base64')
          .then(() => {
            console.log('saved file', filePath)
          })
          .catch(err => {
            console.log('error save file', err)
          })

        let notes = this.state.noteArray
        notes.forEach((localNote) => {
          if (note.id === localNote.id) {
            localNote.url = response.uri
          }
        })

        this.setState({
          noteArray: notes
          // avatarSource: { uri: 'file://' + filePath }
        }, () => { console.log('avatar', this.state.avatarSource) })
        //this.state.url = this.state.avatarSource.uri
        this.storageFunc(this.state.noteArray)
      }
    })
  }

  deleteNote (key) {
    let notes = this.state.noteArray
    notes.splice(key, 1)
    this.setState({
      noteArray: notes
    })
    this.storageFunc(notes)
  }

  changeText (noteText) {
    console.log('hjdbjhbdjhv', noteText)
    this.setState({
        noteText: noteText
    })
    // this.storageFunc(this.state.noteArray)
  }

  updateText (newText, index) {
    this.state.noteArray[index].note = newText
    this.setState({
      noteArray: this.state.noteArray.concat([])
    }, () => {
      this.storageFunc(this.state.noteArray)
    })
  }

  render () {
    let notes = this.state.noteArray.map((note, index) => {
      return <Note
        storageFunc={this.storageFunc}
        key={index}
        keyVal={index}
        val={note}
        selectImage={this.selectImage}
        addDate={this.addDate}
        deleteMethod={() => this.deleteNote(index)}
        onChangeText={(newText) => this.updateText(newText, index)}
      />
    })
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>NOTER</Text>
        </View>
        <ScrollView style={styles.scrollContainer}>
          {notes}
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input}
                       onChangeText={this.changeText}
                       value={this.state.noteText}
                       underlineColorAndroid='transparent'/>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.buttonAdd}
                onPress={this.addNote}
                underlayColor='#dddddd'
                underlineColorAndroid='transparent'>
                <Text style={styles.btnText}>Add</Text>
              </TouchableOpacity>
            </View>

          </View>

        </View>

      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    justifyContent: 'center',
    backgroundColor: '#48afdb',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    right: 0,
    left: 0,
  },
  inputContainer: {
    minWidth: 400,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    flexDirection: 'column'
  },
  buttonAdd: {
    marginTop: 5,
    height: 36,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#48afdb',
    justifyContent: 'center',
    borderRadius: 4,
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 6,
  },
  input: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48afdb',
    borderRadius: 4,
    color: '#48BBEC'
  },
  btnContainer: {
    flexDirection: 'row'
  }
})
