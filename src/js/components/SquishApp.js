var React          = require("react");
var Notes          = require("./sections/Notes");
var Footer         = require("./sections/Footer");
var SingleNote     = require("./sections/SingleNote");
var AppStore       = require('../stores/AppStore');
var Calendar       = require('./sections/Calendar');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var ActionCreators = require('../actions/ActionCreators');
var NewNote = require("./sections/NewNote");



function getStateFromStore() {
     
    var route = AppStore.getRoute(); 
    var data = AppStore.getData();
	var activeNoteId = AppStore.getActiveNoteId();
    var user = AppStore.getUser();
    
    return {
        route: route,
        data: data,
        activeNoteId: activeNoteId,
        user: user
    };
}

var SquishApp = React.createClass({
	
    getInitialState: function() {
      return getStateFromStore();
    },  

    componentDidMount: function(){
        AppStore.addChangeListener(this._onChange);
        ActionCreators.fetchUserFromDB();

    },

    componentWillUnmount: function(){
        AppStore.removeChangeListener(this._onChange);
    },

    _onChange: function(){
        this.setState(getStateFromStore());
    },
    
	render: function() {
        if (this.state.route === "Notes") {
            return(
                <div className="container">
				    <Navbar user={this.state.user} />
				    <Notes data={this.state.data}/>
			     </div>
            );
        }
        
        else if (this.state.route ==="SingleNote"){
            return (
                <div className="container">
                    <Navbar user={this.state.user}/>
                    <SingleNote data={this.state.data} activeNoteId={this.state.activeNoteId} />
                 </div>
                );
            
        } else if (this.state.route ==="Calendar"){
            return (
                <div className="container">
                    <Navbar user={this.state.user}/>
                    <h1> My Squish Calendar </h1>
                    <Calendar />

    render: function() {
        var loginButton;
			if (this.state.user) {
				loginButton = <li><a href="/logout">Log out</a></li>;
			} else {
				loginButton = <li><a href="/google">Login</a></li>;
			}
        return (
            <div>
                <div className = 'container'>
                    <div className = 'row'>
                      <div className='col-md-12'>
                        <nav className="navbar navbar-default">
                          <div className="container-fluid">
                            <div className="navbar-header">
                              <Link to="SquishApp" className="navbar-brand" >Squish </Link>
                            </div>
                            <div>
                              <ul className="nav navbar-nav">
                                <li><Link to="calendar" >Calendar</Link></li>
                              </ul>
                              <ul className="nav navbar-nav navbar-right">  
                                <li><a >{this.props.user}</a></li>
                                <li><Link to="newnote" >Create</Link></li>
                                <li><a className="glyphicon glyphicon-tower" name="Points"></a></li>
                                <li><a className="glyphicon glyphicon-bell" name="Notifications" ></a></li>
                                {loginButton}
                              </ul>
                            </div>
                          </div>
                        </nav>
                      </div>
                    </div>
                  <RouteHandler data={this.state.data} />
                </div>
                <div className="container-fluid">
                    <Footer />
                </div>
            </div>
            );
    }  
});

var routes = (
    <Route name="SquishApp" path="/" handler={SquishApp}>
        <Route name="newnote" handler={NewNote} />       
        <Route name="calendar" handler={Calendar} />
        <Route name=":noteId" handler={SingleNote} />

        <DefaultRoute handler={Notes} />
    </Route>
    );


// Add Router.HistoryLocation to remove the urgy hash from the URL, bur then the dynamic urls dont work...
Router.run(routes , function(Handler){
    React.render(<Handler/>, document.body);
});

module.exports = SquishApp;