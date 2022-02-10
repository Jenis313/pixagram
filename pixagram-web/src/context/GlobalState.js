//https://www.youtube.com/watch?v=XLJN4JfniH4
//https://stackblitz.com/edit/react-rzuyc3?file=MyContext.js
//https://www.youtube.com/watch?v=ch8kiuRJc7I&t=517s
import React, { Component } from 'react';
export const GlobalContext = React.createContext();
// Then create a provider Component
export class MyProvider extends Component {
    setCurrentProfile = picture => {
        // console.log('this came through and picture is -->', picture)
		this.setState({ currentProfilePic: picture });
	};

    state = {
        currentProfilePic: '',
        setCurrentProfile: this.setCurrentProfile,
    };
    render() {
        // console.log('context state -->', this.state);
        return (
        <GlobalContext.Provider value={{
            state: this.state,
            changeProfile: (newProfile) => this.setState({
            currentProfilePic : newProfile
            })
        }}>
            {this.props.children}
        </GlobalContext.Provider>
        )
    }
}
export default GlobalContext;