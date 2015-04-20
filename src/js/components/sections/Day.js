var React = require('react');
var moment = require("moment");
var Calendar = require('./Calendar');


var Day = React.createClass({

  getDefaultProps: function() {
    return {
      classes: ''
    };
  },

  _onClick: function() {
    if (this.props.onClick)
      this.props.onClick(this.props.day.day);
  },

  render: function() {
    var deadline = ["Tue Apr 28 2015 00:00:00 GMT+0100 (BST)"];
//    var deadlineMomentFormat = moment(deadline).format("dddd, MMMM Do YYYY");
//    console.log("deadline in moment format: ", deadlineMomentFormat);
    var data = this.props.data;
    //console.log("data in day component: " + data);
    var unformattedToday = this.props.day.day._d;
    var today = moment(unformattedToday).format("dddd, MMMM Do YYYY");

    var todayIsDeadlineDay = false;
    var deadlineDates = this.props.deadlineDates;
    deadlineDates.forEach(function(deadline){
      if (deadline == today){
        todayIsDeadlineDay = true;
      }
    });

    if (todayIsDeadlineDay === true) {
        return (
            <div onClick={this._onClick} className={this.props.day.classes}>
                <span className='deadline'>{this.props.day.day.date()}</span>
            </div>
        );
    } else if (todayIsDeadlineDay === false)  {
        return (
          <div onClick={this._onClick} className={this.props.day.classes}>
            <span className='day-number'>{this.props.day.day.date()}</span>
          </div>
        );
    }
        

    }
});


module.exports = Day;