import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput
} from 'react-native'

export default class Note extends Component {
  constructor (props) {
    super(props)
    console.log('!!!!', props)
  }

  render () {
    return (
      <View key={this.props.keyVal} style={styles.note}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.buttonAddImg}
            onPress={() => {this.props.selectImage(this.props.val)}}
            underlayColor='#dddddd'
            underlineColorAndroid='transparent'>
            <Text style={styles.btnText}>Upload Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonAddDate}
            onPress={()=>{this.props.addDate(this.props.val)}}
            underlayColor='#dddddd'
            underlineColorAndroid='transparent'>
            <Text style={styles.btnText}>Upload Date</Text>
          </TouchableOpacity>
        </View>

        <TextInput style={styles.noteText}
                   onChangeText={this.props.onChangeText}>
          <Text>{this.props.val.note}</Text>
        </TextInput>

        <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
          <Text style={styles.noteDeleteText}>X</Text>
        </TouchableOpacity>

        <View style={styles.btnPhotoContainer}>
          {this.props.val.url ? <Image
            style={styles.image}
            source={{uri: this.props.val.url}}
          /> : null
          }

          <View>
            {this.props.val.date === null ? <Text style={styles.addDateText}>Date...</Text> :
              <Text style={styles.addDateText}>{this.props.val.date}</Text>}
          </View>

        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  note: {
    position: 'relative',
    padding: 10,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
    borderLeftWidth: 10,
    borderLeftColor: '#2980b9',
  },
  noteText: {
    paddingLeft: 33,
    fontSize: 25,
    color: 'red'
  },
  noteDelete: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#2980b9',
    padding: 10,
    top: 10,
    bottom: 10,
    right: 10,
  },
  noteDeleteText: {
    color: 'white'
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 15,
    left: 15,
    top: 10
  },
  btnPhotoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingLeft: 15,
    left: 15,
    top: 10
  },
  uploadAvatar: {
    width: 50,
    height: 40,
    backgroundColor: 'white'
  },
  image: {
    width: 50,
    height: 40,
    backgroundColor: 'white'
  },
  addDateText: {
    padding: 5,
    color: 'black',
  },
  buttonAddImg: {
    marginTop: 5,
    marginLeft: 2,
    marginRight: 2,
    height: 20,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#48afdb',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonAddDate: {
    marginTop: 5,
    height: 20,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#48afdb',
    justifyContent: 'center',
    borderRadius: 10,
  },
})
