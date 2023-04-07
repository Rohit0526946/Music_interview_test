import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const data = [
  { key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' },
  { key: '6' }, { key: '7' }, { key: '8' }
];
// const numColumns = 3;

const App = () => {
  const [api, setApi] = useState([])
  useEffect(() => {

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://rss.applemarketingtools.com/api/v2/us/music/most-played/100/albums.json',
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        setApi(response.data.feed.results)
        console.log(JSON.stringify(response.data.feed.results));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])




  return (
    <View>
      <Text style={{fontSize:30,fontWeight:'bold',color:'#000',margin:10}}>Top 100 Albums</Text>

      <FlatList style={{ margin: 10, marginTop: 20 }}
        data={api}
        numColumns={2}
        renderItem={({ item }) => {
          return (

            <ImageBackground imageStyle={{ borderRadius: 20 }} style={styles.item} source={{ uri: item.artworkUrl100 }} >
              <View style={{ marginTop: '50%' }}>
                <Text numberOfLines={1} style={styles.itemText}>{item.artistName}</Text>
                <Text numberOfLines={1} style={styles.itemText}>{item.kind}</Text>
              </View>
            </ImageBackground>

          )
        }}
    

      />
      

    </View>
  );
}


const styles = StyleSheet.create({
  item: {
    resizeMode: 'contain',
    flex: 1,
    borderRadius: 20,
    margin: 5,
    height: 160,
    width: '100%'
  },
  itemText: {
    color: '#fff',
    fontSize: 17,
    marginHorizontal: 5
  },
});


export default App