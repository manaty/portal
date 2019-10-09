import React, { Component } from 'react';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/locale/locale_en.js';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_readonly';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_active_links';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_editors';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_limit';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_serialize';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_recurring';


class Scheduler extends Component {

  constructor (){
    super ();{
      this.state = {
        data : []
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.zoom !== nextProps.zoom;
  }

  componentDidMount() {

    window.scheduler.config.xml_date="%Y-%m-%d %H:%i";
    window.scheduler.config.prevent_cache = true;

    window.scheduler.config.details_on_create=true;
    window.scheduler.config.details_on_dblclick=true;
    window.scheduler.config.occurrence_timestamp_in_utc = true;
    window.scheduler.config.include_end_by = true;
    window.scheduler.config.repeat_precise = false;

    window.scheduler.attachEvent("onEventSave",function(id,ev,is_new){
      if (!ev.text) {
        alert("Text must not be empty");
        return false;
      }
      if (!ev.text.length<20) {
        alert("Text too small");
        return true;
      }

      return false;
    });

    window.scheduler.init('scheduler_here',new Date(2018,2,5),"week");

    window.scheduler.addEvent({
      id: '1',
      start_date: new Date(2018, 2, 5, 10),
      end_date: new Date(2018, 2, 5, 12),
      text:"event",
      rec_type: "week_1___1,2",
      event_length: 60*60*4

    })

    this.setState({
      data: window.scheduler._events,
    })

    console.log(window.scheduler._events);

  }
  handleForm=() => {
    const { data } = this.state;
    const valueScheduler = Object.keys(data).map((property,index) =>
      (`${index +1}. ${data[property].end_date} -- ${data[property].start_date} -- ${data[property].text} -- ${data[property].rec_type} -- ${data[property].event_length}\n`));
    alert(valueScheduler);
  };

  render() {
    return (
      <div className="scheduler-container">
        <div>
          <button className="square_btn_scheduler" onClick={this.handleForm}>Submit</button>
        </div>
        <div id="scheduler_here" className="dhx_cal_container" style=
            {{ width: '100%', height: '100%' }}>
          <div className="dhx_cal_navline">
            <div className="dhx_cal_prev_button">&nbsp;</div>
            <div className="dhx_cal_next_button">&nbsp;</div>
            <div className="dhx_cal_today_button"/>
            <div className="dhx_cal_date"></div>
            <div className="dhx_cal_tab" name="day_tab" style={{ right: '204px' }}></div>
            <div className="dhx_cal_tab" name="week_tab" style={{ right: '140px' }}></div>
            <div className="dhx_cal_tab" name="month_tab" style={{ right: '76px' }}></div>
          </div>

          <div className="dhx_cal_header">
          </div>
          <div className="dhx_cal_data">
          </div>
        </div>
      </div>
    );
  }
}
module.exports = Scheduler;