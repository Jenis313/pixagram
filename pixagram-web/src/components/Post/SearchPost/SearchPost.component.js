import React, { Component } from 'react'
import Sidebar from '../../Common/Sidebar/Sidebar.component';
import './SearchPost.component.css'
import PostCard from '../../Home/Post_card/Post_card.controller';
import ProfilePic from '../../Common/ProfilePic/ProfilePic.controller';
import Loader from '../../Common/Loader/Loader.component';
import { httpClient } from '../../../utils/httpClient';
import { NavLink } from 'react-router-dom';
export default class SearchPost extends Component {
    constructor(){
        super();
        this.state = {
            isLoading : false,
             posts : [],
        }
    }
    componentDidMount(){

        // GET QUERY string REACT
        const params = new URLSearchParams(this.props.location.search);
        const query = params.get('q');
        // https://stackoverflow.com/questions/52652661/how-to-get-query-string-using-react
        // console.log('query---> ', query)
        this.setState({
            isLoading : true
        })
        httpClient.GET(`post/search?q=${query}`, false)
        .then((results) => {
            console.log(' data is ----> ',results.data)
            this.setState({
                posts : results.data
            })
        })
        .catch((err) => {
            console.log('error is ---> ', err);
        })
        .finally(() => {
            this.setState({
                isLoading : false
            })
        })

    }
//  render(){
//      return <div></div>
//  }
    render() {
        let posts; 
         if(this.state.isLoading){
            posts = <Loader />
         }else if(this.state.posts.length<1){
            posts = <h1>No results found</h1>
         }else{
             
           posts =  <>
                {
                    this.state.posts.map((post, index) => {
                        return <PostCard data = {post} key = {index} />
                    })
                }
            </>
         }  
        return (
            <div className='home-main'>
                <div className="container">
                    {/* <!-- left cont --> */}
                    <section className="main-left">
                        
                        <div className="posts-container">
                            {/*load post card */}
                            {posts}
                        </div>
                    </section> 
                    {/* <!-- Right Cont --> */}
                    <section className="main-right">
                    </section>
                </div>
            </div>
        )
    }
}
