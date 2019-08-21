
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import CreateButton from '../Components/CreateButton';

const reservationQuery = gql`
  query {
    reservations {
        id
        name
        hotelName
        arrivalDate
    }
  }
`;

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'
  }),
  cache: new InMemoryCache()
});

class ReservationsScreen extends Component {
    constructor (props) {
        super(props);
    }

    static navigationOptions =
    {
        title: 'Reservations',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center', width: '90%', fontWeight: "bold"},
        headerRight: <CreateButton></CreateButton>
    };

    _renderItem({item}) {

        //Return the UI
        //It will return the text green or red depending if that player won a super bowl or not.
        return (
            <TouchableOpacity style={styles.itemContainer}>
                <View style={styles.row}>
                    <Text style={styles.itemText}>Name:</Text>
                    <Text style={styles.itemText}>{item.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.itemText}>Hotel:</Text>
                    <Text style={styles.itemText}>{item.hotelName}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.itemText}>Arrival Date:</Text>
                    <Text style={styles.itemText}>{item.arrivalDate}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    render() {
        return (
        <ApolloProvider client={client}>
            <View style={styles.container}>
            <Query query={reservationQuery}>
                    {/* The props.children of the Query will be a callback with a response, and error parameter. */}
                    {(response, error) => {
                        if(error) {
                            console.log('Response Error-------', error);
                            return <Text style={styles.errorText}>{error}</Text>
                        }
                        //If the response is done, then will return the FlatList
                        if(response) {
                            console.log('response-data-------------', response);
                            //Return the FlatList if there is not an error.
                            return <FlatList 
                                        ItemSeparatorComponent={({highlighted}) =>{ return null}}
                                        data={response.data.reservations}
                                        renderItem={(item) => this._renderItem(item)}
                                    />;
                        } 
                    }}
                </Query>
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
    headerText: {
        fontSize: 30,
        marginTop: 30,
    },
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        textAlign: 'left',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#555555',
        padding: 20
    },
    row: {
        flexDirection: 'row',
    },
    itemText: {
        flex: 1,
        fontSize: 20,
        fontWeight: '500',
        fontFamily: Platform.select({
            ios: 'Chalkboard SE',
            android: 'sans-serif-condensed'
        }),
        color: '#555555'
    },
    separator: {
        height: 0.2,
        backgroundColor: '#555555'
    },
    errorText: {
        fontSize: 20,
        fontWeight: '500',
        fontFamily: Platform.select({
            ios: 'Chalkboard SE',
            android: 'sans-serif-condensed'
        }),
        color: 'red'
    },
    wonSuperBowlText: {
        color: 'green',
    },
    openDrawerText: {
        fontSize: 17,
        textAlign: 'center',
        color: '#33FF58',
    },
    headerRightAction: {
        marginRight: 20
    }
})

export default ReservationsScreen;