/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import axios from'axios';
export default class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      data :[]
    }
  }
  componentDidMount(){
    //axios.post('https://jsonplaceholder.typicode.com/posts',{username :'Ozberk',pass:'1234'})
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((res =>{
        this.setState({data: res.data})
        console.log(res)
      }))
      .catch((err =>{
        console.log(err);
      }))
  }

  //bu şekilde kodu daha düzgün hale getirmiş oluyoruz.
  _renderItem = ({item}) => {
    return <View style={{padding:5 , backgroundColor:'#ddd',marginBottom:5}}><Text>{item.title}</Text><Text>{item.body}</Text></View>
  }

  render(){
    const {data} = this.state;
    return(
      <SafeAreaView>
        <FlatList 
        data={data}
        keyExtractor = {(item)=> item.id.toString()}
        renderItem={(this._renderItem)}></FlatList>
    </SafeAreaView>
    )
  }
}