import React, {useState, useEffect} from "react";

import { View,Text,StyleSheet, TouchableOpacity, TextInput, ActivityIndicator,Keyboard } from "react-native";
import Select2 from 'react-select2-native';
import api from "./src/services/api";

export default function App(){
const [moedas,setMoedas] = useState([])
const [Loading, setLoading] = useState(true)
const [moedaSelecionada, setMoedaSelecionada] = useState(null)
const [moedaBValor, setMoedaBValor] = useState(0)
const [valorMoeda, setValorMoeda] = useState(null)
const [valorConvertido, setValorConvertido] = useState(0)





useEffect(() =>{
  async function LoadMoedas() {
    const response = await api.get('all');

    let arrayMoedas =[]
    Object.keys(response.data).map((key) =>{

      arrayMoedas.push ({
        id: key,
        name: key,
       
      })
    })

    setMoedas(arrayMoedas),
    setLoading(false)
  }

  LoadMoedas();
},[])


        async function converter(){
          if(moedaSelecionada === null || moedaBValor === 0){
            alert ('Preencha todos os campos')
            return;
          }

            //Vai devolver quanto é 1 USD(exemplo) convertido em R$
          const response = await api.get(`all/${moedaSelecionada}-BRL`)

          let resultado = (response.data[moedaSelecionada].ask * parseFloat(moedaBValor));
          setValorConvertido(`R$ ${resultado.toFixed(2)}`)

          setValorMoeda(moedaBValor)

          Keyboard.dismiss()
      
        }



if (Loading){

  return(
  <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
  <ActivityIndicator color='#121212' size={45}/>
</View>

  )

  

}else{

  return(
    <View style={styles.container}>
      
      <View style={styles.areaConversor}>

        <Text style={{fontSize:15, marginStart:10, marginTop:10}}>Selecione sua Moeda</Text>
        <Select2
          isSelectSingle
          style={{marginStart:5, width:310, borderRadius:5}}
          colorTheme="red"
          popupTitle="Selecione a moeda"
          title="Selecione uma moeda"
          value={moedas}
          data={moedas}
          showSearchBox={false}
          onSelect={(text) => setMoedaSelecionada(text)}

         
        />

        <Text style={{fontSize:15, marginStart:10, marginTop:5}}>Digite um valor para converter em (R$)</Text>

        <TextInput
        keyboardType="numeric"
        style={styles.textInput}
        placeholder="EX: 150"
        onChangeText={(valor) => setMoedaBValor(valor)}
        >
          
        </TextInput>

        <View style={styles.AreaBtnConverter}>

        <TouchableOpacity style={styles.btnConverter} onPress={converter}>
          <Text style={{fontSize:18, color:'#FFF', fontWeight:'bold'}}>Converter</Text>
        </TouchableOpacity>

        </View>

      </View>


      {valorConvertido !== 0 && (

          <View style={styles.resultadoConversao}>

          <Text style={styles.textoResultado}>
            {valorMoeda} {moedaSelecionada}
          </Text>

          <Text style={styles.textoResultado}>
            corresponde a:
          </Text>
          <Text style={styles.textoResultado}>
            {valorConvertido}
          </Text>
          </View>

      )}
   

    </View>
  )

}

  
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#101215',
    alignItems:'center',
    
  },

  areaConversor:{
    width:'85%',
    height:200,
     backgroundColor:'#FFF',
     marginTop:70,
    borderRadius:6,
    justifyContent:'space-around'
  },

  btnConverter:{
  
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'red',
    height:50,
    marginBottom:-5,
    borderBottomLeftRadius:6,
    borderBottomRightRadius:6

  },

  AreaBtnConverter:{
    
  },

  textInput:{
    
    paddingStart:5,
    marginStart:10
  },

  resultadoConversao:{
    backgroundColor:'#FFF',
    width:'85%',
    height:200,
    marginTop:80,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:7
  },

  textoResultado:{
    fontSize:18,
    margin:10,
    fontWeight:'bold'
  }

})