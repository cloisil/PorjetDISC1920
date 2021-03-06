import React, {Component} from 'react';
import { Col, Grid, Container, Button, Icon, Text } from 'native-base';
import {Animated, Easing, View, TouchableOpacity, StyleSheet} from 'react-native';
import DATA from '../consts/data';

export default class Filtres extends Component {
    constructor(props){
        super(props);
        this.state = {
            societes:[],
            activites:[],
            drawerOpen : false
        }
        this.rotateValue = new Animated.Value(0);
        this.onSelectActivity = this.onSelectActivity.bind(this);
        this.onSelectGroup = this.onSelectGroup.bind(this);
    }

    onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }

    onSelectGroup(groupe){
        if (this.state.societes.includes(groupe)){
            let removeGroup = this.state.societes.filter(societe => societe !== groupe);
            this.setState({
                societes:removeGroup
            },() => {
                this.props.filterByGroup(this.state.societes);
          })
        } else {
          this.setState(state => {
            const societes = state.societes.concat(groupe);
            return {
              societes
            };
          },() => {
              this.props.filterByGroup(this.state.societes);
        }); 
          
        }
    }

    onSelectActivity(activite){
        if (this.state.activites.includes(activite)){
            let removeActivity = this.state.activites.filter(act => act !== activite);
            this.setState({
                activites:removeActivity
            },() => {
                this.props.filterByActivity(this.state.activites);
            })
            
        } else {
            this.setState(state => {
                const activites = state.activites.concat(activite);
                return {
                  activites
                };
              },() => {
                this.props.filterByActivity(this.state.activites);
            });
        }
    }

    reset(){
        this.setState({
            societes: [],
            activites: []
        });
        this.props.reset();
    }

    toggleDrawer(){
        if(this.state.drawerOpen){
            this.props.closeDrawer();
            Animated.timing(this.rotateValue, {
                toValue: 0,
                duration: 350,
                easing: Easing.linear
              }).start();
            this.setState({
                drawerOpen: false
            })
        } else {
            this.props.openDrawer();
            Animated.timing(this.rotateValue, {
                toValue: 1,
                duration: 350,
                easing: Easing.linear
              }).start();
            this.setState({
                drawerOpen: true
            })
        }
    }

    render(){
        const { icon, onPress, data } = this.props;

      let rotation = this.rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"] // degree of rotation
      });
      let transformStyle = { transform: [{ rotate: rotation }] };

        const filiales = DATA.map(adress => adress.groupeParent);
        const uniqueFilial = filiales.filter(this.onlyUnique);
        const activites = DATA.map(adress => adress.typeBatiment);
        const uniqueActivite = activites.filter(this.onlyUnique);
        return(
            <Container style={{flex:1, backgroundColor: "#F0F0F0"}}>
                    <Grid >
                    <Col style={{width:40}}>
                        <TouchableOpacity style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#FFFFFF"}} onPress={this.toggleDrawer.bind(this)}>
                            <Animated.View style={transformStyle}>
                                <Icon type="FontAwesome" name="angle-left" style={{color: '#E2001A'}}/>
                            </Animated.View>
                        </TouchableOpacity>
                    </Col>
                    <Col style={styles.main}>
                        <Text style={{textAlign:"center", paddingVertical : 20, fontSize: 24, marginTop : 40}}>Filtres</Text>
                        <Text>Groupe</Text>
                        <View style={styles.fragment}>
                            {
                                uniqueFilial.map((groupe, i) =>
                                    <Button
                                    small 
                                    rounded 
                                    key={i} 
                                    style={this.state.societes.includes(groupe) ? styles.tagsActif : styles.tags} 
                                    onPress={() => this.onSelectGroup(groupe)}>
                                        <Text>{groupe}</Text>
                                    </Button> 
                                    )
                            }
                        </View>
                        <Text>Activité</Text>
                        <View style={styles.fragment}>
                            {
                                uniqueActivite.map((activite, i) =>
                                    <Button 
                                    small 
                                    rounded
                                    key={i} 
                                    style={this.state.activites.includes(activite) ? styles.tagsActif : styles.tags} 
                                    onPress={() => this.onSelectActivity(activite)}>
                                        <Text>{activite}</Text>
                                    </Button>
                                )
                            }
                        </View>
                        {/* <Button block primary style={styles.valider}  onPress={this.toggleDrawer.bind(this)}><Text>Valider</Text></Button> */}
                        <Button block light style={styles.reinitialiser}  onPress={this.reset.bind(this)}><Text>Réinitialiser</Text></Button>
                      </Col></Grid>  
                
                
            </Container>
        )
    }
}

const styles=StyleSheet.create({
    main : {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
        paddingVertical : 10
    },

    fragment : {
        flexDirection : 'row', 
        flexWrap : "wrap",
        marginBottom : 10,
        marginTop : 10,
    },

    tags : {
        marginBottom : 5,
        marginTop : 5,
        marginLeft : 5,
        marginRight : 5,
        backgroundColor: "#DBA504"
    },
    tagsActif : {
        marginBottom : 5,
        marginTop : 5,
        marginLeft : 5,
        marginRight : 5,
        backgroundColor: "#E2001A"
    },

    valider : {
        marginBottom : 5,
        marginTop : 5,
        marginLeft : 5,
        marginRight : 5,
        backgroundColor: "#E2001A"
    },

    reinitialiser : {
        marginBottom : 5,
        marginTop : 5,
        marginLeft : 5,
        marginRight : 5,

    }


})