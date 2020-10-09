import React, { Component } from "react";

import Select from 'react-select';

import ChannelControls from "./channelcontrols";
import FileBrowserModal from "../components/filebrowsermodal";
import Overlays from "./overlays";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {faLocationArrow} from "@fortawesome/free-solid-svg-icons";
import {faCrosshairs} from "@fortawesome/free-solid-svg-icons";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

import '../style/controls'

class Controls extends Component {

  constructor(props) {
    super();
  }

  render() {

    const {addArrowText, rgba} = this.props;
    const {deleteOverlay, deleteArrow} = this.props;
    const {activeStory, handleSelectStory} = this.props;
    const {showVisDataBrowser, openVisDataBrowser, onVisDataSelected} = this.props;
    const {visLabels, activeVisLabel, handleSelectVis} = this.props;
    const {stories, storyName, storyText, textEdit} = this.props;
    const {handleStoryInsert, handleStoryName, handleStoryText} = this.props;
    const {handleStoryRemove, handleStoryChange, overlays, arrows} = this.props;
    const {arrowClick, lassoClick, boxClick, drawType} = this.props;

    const storyLabels = new Map([...stories].map(([k,v])=>{
                                  return [k, {
                                    value: k, id: k,
                                    label: '#' + (k+1) + (v.name? ': ' + v.name : '')
                                  }]
                                }))

    let activeStoryLabel = storyLabels.get(activeStory)
    if (activeStoryLabel === undefined) {
      activeStoryLabel = {value: activeStory, id: activeStory,
                          label: '#' + (activeStory+1)}
    }
    let visData = ''
    if (activeVisLabel.id >= 0) {
      let visDataGeneric = (
      <div>
        <input value={activeVisLabel.data} onChange={(v)=>handleSelectVis(activeVisLabel, v.target.value)} style={{ width: "75%" }} id="visdatapath" name="visdatapath" type="text"/>
        <button type="button" onClick={openVisDataBrowser} className="ui button">Browse</button>
        <FileBrowserModal open={showVisDataBrowser} close={onVisDataSelected}
          title="Select a csv file" 
          onFileSelected={onVisDataSelected} 
          filter={["csv"]}
        />
      </div>
      )
      if ([0, 1].includes(activeVisLabel.id)) {
        visData = (
        <div>
          {visDataGeneric}
          <div className="font-white">
            X Axis:
            <input value={activeVisLabel.x} onChange={(v)=>handleSelectVis(activeVisLabel, null, v.target.value)} style={{ width: "25%", marginRight: "2em"}} id="visxaxis" name="visxaxis" type="text"/>
            Y Axis:
            <input value={activeVisLabel.y} onChange={(v)=>handleSelectVis(activeVisLabel, null, null, v.target.value)} style={{ width: "25%" }} id="visyaxis" name="visyaxis" type="text"/>
          </div>
        </div>
        ) 
      }
      else {
        visData = (
        <div>
          {visDataGeneric}
        </div>
        ) 
      }
    }
    if (textEdit || rgba) {
      return (
			<div className="ui form">
				<div className="row">
					<div className="col no-right-padding bg-trans">
						<div className="">
              <div className="row">
                <div className="col-5">
                  <div className="font-white">
                    Waypoints:
                  </div>
                  <div className="width-100">
                    <Select
                      onChange={handleSelectStory}
                      value={activeStoryLabel}
                      options={Array.from(storyLabels.values())}
                    />
                  </div>
                </div>
                <div className="pt-2 pl-0 col-7">
                  <button className="ui button compact" title="Previous waypoint" onClick={()=>{
                    handleStoryChange(Math.max(0, activeStory - 1))
                  }}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                  <button className="ui button compact" onClick={handleStoryInsert} title="Add waypoint">
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <button className="ui button compact" title="Next waypoint" onClick={()=>{
                    handleStoryChange(activeStory + 1)
                  }}>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                  <button className="ui button red compact" title="Delete waypoint" onClick={handleStoryRemove}>
                    X
                  </button>
                </div>
              </div>
						</div>
						<input className="width-100" type="text" placeholder="Waypoint Name" value={storyName} onChange={handleStoryName}></input>
            <textarea className="width-100 height-20vh" placeholder="Waypoint Description" value={storyText} onChange={handleStoryText}></textarea>
            <div className="font-white">
              Visualization:
            </div>
            <div className="width-100">
              <Select
                onChange={(v)=>handleSelectVis(v)}
                value={activeVisLabel}
                options={Array.from(visLabels.values())}
              />
              {visData}
            </div>
					</div>
					<div className="col-1 p-0">
						<div className="btn-group-vertical bg-trans">
							<span id="arrow-switch" className="nav-item arrow-switch">
							<a className="btn" onClick={arrowClick} title="Add arrow">
									<FontAwesomeIcon icon={faLocationArrow}
										color={(drawType == 'arrow')? 'blue': 'white'}
									/>
							</a>
							</span>
							<span id="draw-switch" className="nav-item draw-switch">
							<a className="btn" onClick={boxClick} title="Add rectangle">
									<FontAwesomeIcon icon={faCrosshairs}
										color={(drawType == 'box')? 'blue': 'white'}
									/>
							</a>
							</span>
						</div>
					</div>
				</div>
				<Overlays deleteOverlay={deleteOverlay}
				deleteArrow={deleteArrow} addArrowText={addArrowText}
				overlays={overlays} arrows={arrows}></Overlays>
			</div>
      )
    }

    const {handleSelect, handleChange} = this.props;
    const {activeChanLabel, chanLabel} = this.props;
    const {activeChannels} = this.props;

    return (
      <div className="bg-trans row">
        <div className="col">
        <Select
          isMulti={true}
          onChange={handleSelect}
          value={Array.from(activeChanLabel.values())}
          options={Array.from(chanLabel.values())}
        />
        <div>
          <ChannelControls className="ChannelControls"
            channels={ activeChannels }
            handleChange={ handleChange }
          />
        </div>
        </div>
      </div>
    );
  }
}

export default Controls;
