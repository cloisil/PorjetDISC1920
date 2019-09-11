import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs, Icon, Left, Button } from 'native-base';
import {View, Text, StyleSheet, Image} from 'react-native';
import DATA from '../consts/data';

export default class Present extends Component {
  render() {
      let adress = this.props.adress;
    return (
      
        <Container style={styles.Tab} >
          <Header hasTabs />
          <Left style={styles.close}>
            <Button transparent  >
              <Icon name='arrow-back'  />
            </Button>
          </Left>
          <Tabs>
            <Tab heading="Infos">
              <View >           
                        
                              <View>
                                  <Image source={adress.logo} style={{width:200, height:100, resizeMode: 'contain'}}/>
                                  <Text >{adress.groupeparent}</Text>
                                  <Text >{adress.societe}</Text>
                                  <Text >{adress.typeBatiment}</Text>
                                  <Text >{adress.description}</Text>
                              </View>
                        
                        
                  </View>
              
            </Tab>
            <Tab heading="Coordonées Responsables">
              
                  <View>
                      
                              <View>
                                  <Text >{adress.prenom}</Text>
                                  <Text >{adress.nom}</Text>
                                  {/* <Text >{adress.}</Text> */}
                              </View>
                        
                  </View>
              
            </Tab>
            <Tab heading="Coordonées Entreprise">
              
              <View>
                    
                              <View>
                                  <Text >{adress.tel}</Text>
                                  <Text >{adress.ville}</Text>
                                  <Text >{adress.rue}</Text>
                                  <Text >{adress.societe}</Text>
                                  <Text >{adress.cp}</Text>
                              </View>
                        
                  </View>
              
            </Tab>
          </Tabs>
        </Container>
      
      
    );
  }
}

 const styles = StyleSheet.create ({
  Tab : {
    height:500, 
    width:500, 
  },
  close :{
    height:50,
    width:50,
  }
})