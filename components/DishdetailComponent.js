import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, Button } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
})

function RenderDish(props) {
    const dish = props.dish;

    if (dish != null) {
        return(
            <Card featuredTitle={dish.name}
                image={{ uri: baseUrl + dish.image }} >
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                    <Icon style={{ flex: 1 }} 
                        raised 
                        reverse 
                        name={ props.favorite ? 'heart' : 'heart-o' }
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()} />
                    <Icon raised 
                        reverse 
                        name='pencil'
                        type='font-awesome'
                        color='#512DA8'
                        onPress={() => props.toggleModal() } />
                </View>
            </Card>
        );
    }
    else {
        return(<View></View>)
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        );
    }

    return(
        <Card title="Comments">
            <FlatList data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()} />
        </Card>
    );
}

// class component
class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            author: '',
            comment: '',
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Dish Details'
    };
    
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    handleComment() {
        console.log(JSON.stringify(this.state));
        this.props.postComment(this.props.dishId, this.state.rating, this.state.author, this.state.comment)
        this.toggleModal();
    }

    resetForm() {
        this.state = {
            rating: 0,
            author: '',
            comment: ''
        }
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId', '')

        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    toggleModal={() => this.toggleModal()} />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => {this.toggleModal(); this.resetForm()}}
                    onRequestClose={() => {this.toggleModal(); this.resetForm()}} >
                    <View>
                        <Rating type='star'
                            ratingCount={5}
                            imageSize={24}
                            showRating
                            onFinishRating={value => this.setState({ rating: value })} />
                    </View>
                    <View>
                        <Input placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }} 
                            onChangeText={value => this.setState({ author: value })} />
                    </View>
                    <View>
                        <Input placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            onChangeText={value => this.setState({ comment: value })} />
                    </View>
                    <Button title="Submit"
                        color="#512DA8"
                        onPress={() => this.handleComment()} />
                    <Button onPress={() => {this.toggleModal(); this.resetForm()}}
                        color='grey'
                        title='Cancel'/>
                </Modal>
            </ScrollView>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);