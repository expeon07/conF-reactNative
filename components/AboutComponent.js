import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';


const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

function History() {
    return(
        <Card title="Our History">
            <Text>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</Text>
            <Text>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Text>
        </Card>
    )
}

function RenderLeaders(props) {
    const leaders = props.leaders;

    const renderLeaderItem = ({item, index}) => {
        return(
            <ListItem key={index}
                title={item.name}
                subtitle={item.description}
                subtitleNumberOfLines={15}
                hideChevron={true}
                leftAvatar={{ source:  { uri: baseUrl + item.image }}} />
        );
    }

    return(
        <Card title="Corporate Leadership">
            <FlatList data={leaders}
                renderItem={renderLeaderItem}
                keyExtractor={leader => leader.id.toString() } />
        </Card>
    )
}

class About extends Component {

    static navigationOptions = {
        title: 'About Us'
    };

    render() {
        return(
            <ScrollView> 
                <History />
                <RenderLeaders leaders={this.props.leaders.leaders} />
            </ScrollView>    
        );
    }
}

export default connect(mapStateToProps)(About);