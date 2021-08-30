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
  FlatList,
  RefreshControl
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
      data :[],
      loading : true,
      isRefresh : false
    }
  }
  // telefon listesi api için aşağıdaki kodu çalıştırmıştım
  old_componentDidMount(){
    //axios.post('https://jsonplaceholder.typicode.com/posts',{username :'Ozberk',pass:'1234'})
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((res =>{
        this.setState({data: res.data,loading: false})
        console.log(res)
      }))
      .catch((err =>{
        console.log(err);
      }))
  }
  componentDidMount(){
    this.fetchUser();
  }

  fetchUser (page = 2){
    const url = 'https://api.stackexchange.com/2.2/users?page='+page+'&order=desc&short=reputation&site=stackoverflow'
    axios.get(url)
      .then((res) =>{
        this.setState({data : res.data.items})
        console.log(res.data)
      })
      .catch((err =>{
        console.log(err);
      }))
  }

  //Render ITEM telefon listesine göre hazırlanmıştı
  //bu şekilde kodu daha düzgün hale getirmiş oluyoruz.
  old_renderItem = ({item}) => {
    return <View style={{padding:5 , backgroundColor:'#ddd',marginBottom:5, flex:1, marginLeft:2 , marginRight:2}}><Text style={{fontWeight:'bold',color:'blue'}}>{item.name}</Text><Text>{item.username}</Text><Text>{item.email}</Text><Text>{item.phone}</Text></View>
  }
  _renderItem = ({item}) => {
    return <View style={{padding:5 , backgroundColor:'#ddd',marginBottom:5, flex:1, marginLeft:2 , marginRight:2}}><Text style={{fontWeight:'bold',color:'blue'}}>{item.display_name}</Text><Text>{item.username}</Text></View>
  }
  //Telefon rehberş uygulaması için oluşturulmuş render kodum::
  old_render(){
    const {data} = this.state;
    return(
      <SafeAreaView>
        <FlatList 
        data={data}
        numColumns={2}
        keyExtractor = {(item)=> item.id.toString()}
        renderItem={(this._renderItem)}
        ListEmptyComponent={()=><View><Text>VERI BULUNAMADI</Text></View>}
        ListHeaderComponent={()=> <View style={{backgroundColor:'red',padding:10}}><Text style={{textAlign:'center'}}>PUBLIC PHONELIST</Text></View>}
        ListFooterComponent={()=> <View style={{marginTop:180,backgroundColor:'red',padding:10}}><Text style={{textAlign:'center'}}>CREATED BY OZ</Text></View>}>
        </FlatList>
    </SafeAreaView>
    )
  }
  render(){
    const {data,loading,isRefresh} = this.state;
    return(
      <SafeAreaView>
        {(!loading) ? <View><Text>YUKLENIYOR</Text></View> : <FlatList 
        data={data}
        numColumns={1}
        refreshControl={
          <RefreshControl  refreshing={isRefresh}
          onRefresh={this.onRefresh}
          >
          </RefreshControl>
        }
        //keyExtractor = {(item)=> item.id.toString()}
        renderItem={(this._renderItem)}
        //ListEmptyComponent={()=><View><Text>VERI BULUNAMADI</Text></View>}
        ListHeaderComponent={()=> <View style={{backgroundColor:'red',padding:10}}><Text style={{textAlign:'center'}}>PUBLIC PHONEBOOK</Text></View>}
        ListFooterComponent={()=> <View style={{marginTop:180,backgroundColor:'red',padding:10}}><Text style={{textAlign:'center'}}>CREATED BY OZ</Text></View>}>
        </FlatList>}
    </SafeAreaView>
    )
  }
}