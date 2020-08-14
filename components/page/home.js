import React from 'react';
import {Text, View, Modal, StyleSheet} from 'react-native';
import Header from "./Header";
const token = "PPlaFk63u4E6";

const messages = ["Bon retour parmi nous, ", "Heureux de vous revoir, ",
"Alors, motivÃ© aujourd'hui ? ", "Wi-Bash n'Ã©tait pas complet sans vous, "];

export default class Home extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
           user : this.props.user,
           bievenue : true
        }
        this.message = messages[parseInt(Math.random()*messages.length)];
        setTimeout(()=> this.setState({bienvenue: false}), 2000);
    }
    importProjects ()
    {
        let data = new FormData();
        data.append("token", token);
        data.append("identifiant", this.state.user.identifiant);
        data.append("pass", this.state.user.pass);
        fetch('http://www.wi-bash.fr/application/ListeProjets.php', {
        method: 'POST',
        headers: {
        Accept: 'multipart/form-data',
        'Content-Type': "multipart/form-data"
        },
        body: data
        }).then((reponse)=> reponse.text()).then((json) => console.log(json)).catch(
            (error) => console.log(error))
    }
    render()
    {
        console.log(this.state.user)
        this.importProjects();
        return(
            <View style = {{flex:1}}>
                <Modal visible = {this.state.bienvenue} animationType = "slide"
                transparent= {true}>
                    <View style = {styles.modal}>
                        <Text style= {styles.message}>{this.message+this.state.user.pseudo}</Text>
                        </View>
                </Modal>

                <Header onPress = {()=>{}}/>
                <Text>Bievenue, {this.state.user.pseudo} !</Text>
                <Text> On c'est tous que Anthony COLVIL est l'homme le plus beau du monde</Text>
                
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
       modal:
       {
           backgroundColor: "rgb(156, 23, 84)",
           alignSelf: "center",
           marginTop: 100,
           paddingVertical: 30,
           paddingHorizontal: 5,
           borderRadius: 20
       },
       message:
       {
           color: "white",
           fontSize: 22,
           fontStyle: "italic",
           fontWeight: "bold"
       }
    }


)