
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider, Mutation  } from 'react-apollo';
import DatePicker from 'react-native-datepicker'

import gql from 'graphql-tag';

const addReservation = gql`
  mutation addReservation($name: String!, $hotelName: String!, $arrivalDate: String!, $departureDate: String!) {
    createReservation(data: { name: $name, hotelName: $hotelName, arrivalDate: $arrivalDate, departureDate: $departureDate }) {
        name
        hotelName
        arrivalDate
        departureDate
    }
  }
`;

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'
  }),
  cache: new InMemoryCache()
});

export default class ReservationScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            hotelName: '',
            arrivalDate: '',
            departureDate: ''
        }
    }

    static navigationOptions =
    {
        title: 'Create Reservation',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center', width: '90%', fontWeight: "bold"},
    };

    render() {
        return (
            <ApolloProvider client={client}>
                <View style={styles.container}>
                <Mutation mutation={addReservation}>
                    {(addReservationMutation, { data }) => (
                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => this.setState({ name: text })}
                            value={this.state.name}
                            placeholder="Name"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={text => this.setState({ hotelName: text })}
                            value={this.state.hotelName}
                            placeholder="Hotel Name"
                        />
                        <DatePicker
                            style={styles.input}
                            date={this.state.arrivalDate}
                            mode="date"
                            placeholder="Arrival Date"
                            format="MM/DD/YYYY"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            }}
                            onDateChange={(date) => {this.setState({arrivalDate: date})}}
                        />
                        <DatePicker
                            style={styles.input}
                            date={this.state.departureDate}
                            mode="date"
                            placeholder="Departure Date"
                            format="MM/DD/YYYY"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            }}
                            onDateChange={(date) => {this.setState({departureDate: date})}}
                        />
                        <Button
                            onPress={() => {
                                addReservationMutation({
                                variables: {
                                    name: this.state.name,
                                    hotelName: this.state.hotelName,
                                    arrivalDate: this.state.arrivalDate,
                                    departureDate: this.state.departureDate
                                }
                                })
                                .then(res => res)
                                .catch(err => <Text>{err}</Text>);
                                this.setState({ name: '', hotelName: '', arrivalDate: '', departureDate: '' });
                            }}
                            title="Add Reservation"
                        />
                    </View>
                    )}
                </Mutation>
                </View>
            </ApolloProvider>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        //Instead of do 100% of height and width is doing flex: 1,
        flex: 1,
    },
    input: {
        width: "100%",
        height: 50,
        fontSize: 20
    }
})
