import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList, Alert} from 'react-native';
import {styles} from './styles';
import {format} from 'date-fns';
import {Participant} from '../../components/Participant';



export function Home(){

  const [participants, setParticipants] = useState<string[]>([]);
  const [ participantName, setParticipantName] = useState('');
  

  function handleParticipantAdd () {
    if(participants.includes(participantName)){
       return Alert.alert('Participante Existe', 'Já existe um participante na lista com este nome');
    }
    setParticipants(prevState => [...prevState, participantName ]);
    setParticipantName('');
  }
  
  function handleParticpantRemove(name: string) {


    Alert.alert('Remover', `Remover o participante ${name}?`,[
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participants => participants !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }

    ]);
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>
      <Text style ={styles.eventDate}>
        {format(new Date(), 'EEEE, dd MMMM yyyy')}
      </Text>
      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder= "Nome do Participante"
          placeholderTextColor={"#6B6B6B"} 
          onChangeText={setParticipantName}
          value={participantName}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Participant 
            key =  {item}
            name= {item}
            onRemove={() => handleParticpantRemove(item)}
          />
        )}
          showsVerticalScrollIndicator= {false}
          ListEmptyComponent= {() => (
            <Text style={styles.listEmptyText}>
              Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
            </Text>
          )}
      />
      
    </View>

  )
}