import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import axios from 'axios'

const Item = ({client}) => {
  
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.text}><Text style={styles.title}>Name:</Text> {client.nom} {client.prenom}</Text>
      <Text style={styles.text}><Text style={styles.title}>Address:</Text> {client.adresse}</Text>
      <Text style={styles.text}><Text style={styles.title}>Birthday:</Text> {client.dateNaissance}</Text>
      <Text style={styles.text}><Text style={styles.title}>email:</Text> {client.email}</Text>
    </View>
  )
}

const App = () => {

  const [clients, setClients] = useState([])
  const [id, setId] = useState('')
  const [showClear, setShowClear] = useState(false)

  const getClients = async () => {
    const result = await axios.get('https://nexio-order-service.herokuapp.com/api/clients');
    setClients(result.data)
  }

  const searchById = async () => {
    try{
      const result = await axios.get(`https://nexio-order-service.herokuapp.com/api/clients/${id}`);
      const array = []
      array.push(result.data)
      setClients(array)
    } catch (err) {
      setClients([])
    }
    setShowClear(true)
  }

  const clear = () => {
    setId('')
    setShowClear(false)
    getClients()
  }

  useEffect(() => {
    getClients();
  }, [])


  return (
    <View style={styles.main}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder='Search client by ID...'
          placeholderTextColor='grey'
          value={id}
          onChangeText={text => setId(text)}
        />
        <TouchableOpacity style={styles.btn} onPress={searchById}>
          <Text style={{color: '#000'}}>Search</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {clients?.map((item, index) => {
          return <Item key={index} client={item}/>
        })}
        {showClear && <TouchableOpacity style={styles.clear} onPress={clear}>
          <Text style={styles.clearTxt}>Clear</Text>
        </TouchableOpacity>}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white'
  },
  title: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 20,
    color: 'black'
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    borderColor: "transparent",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    elevation: 1.5,
  },
  text: {
    fontSize: 18,
    color: 'black'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: '70%',
    color: '#000'
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 5,
    width: '25%'
  },
  clear: {
    alignItems: "center",
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  clearTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  }
});

export default App;
