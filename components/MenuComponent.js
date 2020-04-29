import React, { Component } from 'react';
import { View, Flatlist } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

function Menu(props) {

    const renderMenuItem = ({item, index}) => {
        return(
            <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                onPress={() => props.onPress(item.id)}
                leftAvatar={{ source: require('./images/uthappizza.png')}}
                />
        );
    }

    return(
        <FlatList
            data={props.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
            />
    );
}

export default Menu;