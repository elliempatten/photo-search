import React, { Component } from 'react';
import './App.css';
import backgroundSad from "./default-image.jpg";

class App extends Component {
  constructor(props){
    super(props);
    this.state = { searchTerms: ""};
    this.state = { queryString: ""}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeVisibility = this.changeVisibility.bind(this);
    this.state = {photos: ""};
    this.state = {visible: true};
  }
  handleChange(event){
    this.setState({searchTerms: event.target.value});
  }
  handleSubmit(event){
    event.preventDefault();
    var userInput = this.state.searchTerms;
    if (userInput.includes(" ")){
      userInput = userInput.replace(/ /g, "-");
    }
    let photoListElement = <PhotosList query = {userInput}/>
    this.setState({queryString: userInput, photos: photoListElement});
  }

  changeVisibility(event){
    // change visibility to hidden. This triggers a change in the height of the element, making it just the arrow that displays
    var visibility = this.state.visible ? false: true;
    this.setState({visible: visibility});
  }
  render(){


    return(
      // for background: set background to that image, and then change it when you render something else - work out how!
      <div className="holder">
        <div className={"all-buttons" + (this.state.visible ? " buttons-visible": " buttons-hidden")}>
          
        <form onSubmit={this.handleSubmit}>
        <input className="search-bar" value={this.state.searchTearms} onChange={this.handleChange} type="text" placeholder="Search for an image"></input>
        <button className="submit" type="submit">Submit</button>
        </form>
        <button className="hide-display-button" onClick={this.changeVisibility}>...</button>
        </div>
        <div className = "def-credit photo-credit">Photo by <a href="https://unsplash.com/@aridley88">Andrew Ridley</a> on <a href="http://unsplash.com">Unsplash</a></div>
      {this.state.photos}
      </div>
    )}}
  
    class PhotosList extends Component {
  constructor(props) {
    super(props);
    this.state = { photosList: [] };
    this.state = { imageurls: [] };
    this.updateComponent = this.updateComponent.bind(this);
  }

  updateComponent=()=> {
     var urlBase = "https://api.unsplash.com/search/photos?client_id=cb78d5b83a46759609c66673611dc3942a17f82c5deb0b610f7829e78dccabf4&page=2&query=";
     var userQuery = this.props.query;
     var fullQuery = urlBase + userQuery;
    fetch(
       fullQuery
    )
      .then(
        results => {
          results.json()
            .then(
              jsonResults => {
                this.setState({ photosList: jsonResults });
                var arrayofUrls = [];
                for (var picture of jsonResults.results) {
                  var jsonForPicture = {};
                  jsonForPicture["url"] = picture.urls.regular;
                  jsonForPicture["alt"] = picture.description;
                  arrayofUrls.push(jsonForPicture);
                  //arrayForPicture.push(picture.urls.regular);
                  //arrayForPicture.push(picture.description);

                }
                this.setState({ imageurls: arrayofUrls });
                document.getElementsByTagName("form")[0].reset();
              })})} 

  componentDidMount(){
    this.updateComponent();
  }
  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.updateComponent();
    }
  } 
  render() {
    if (this.state.imageurls.length==0){ //NEED TO DELAY THIS RENDERING
      document.getElementsByClassName("def-credit")[0].style.visibility= "hidden";
      return(
        <div className="no-results">
          <img className="background-default" src={backgroundSad} alt="Sad plate with fork and spoon."></img>
        <div className="no-results-warning">Your search returned no results.</div>
        <p className="photo-credit">Photo by <a href="https://unsplash.com/photos/fnztlIb52gU">Thought Catalog</a> on <a href="https://unsplash.com/">Unsplash</a></p>
        </div>
      )
    }

    else {
      document.body.style.background = "none";
      document.getElementsByClassName("def-credit")[0].style.visibility= "hidden";
    return (
      
    <ul>
        {this.state.imageurls.map(function (i, index) {
          return <li key={index}><img src={i.url} alt={i.alt}></img></li>
        })}
      </ul> 
    )
  }
}
  }

      
    
export default App;
