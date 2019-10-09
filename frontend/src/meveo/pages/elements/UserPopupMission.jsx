import React, {Component} from 'react';
import {editMissionUser} from '../../actions/UserProfileAction';
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import DatePicker from "react-bootstrap-date-picker";
import {EditorState, Editor, RichUtils, ContentState, convertFromHTML} from 'draft-js'

import {stateToHTML,} from "draft-js-export-html";

const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = this.props.className;
        return (
            <span className={className} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
        );
    }
}

const BLOCK_TYPES = [{class: 'editText', label: '', style: 'unordered-list-item'},];

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                    className={type.class}
                />
            )}
        </div>
    );
};

var INLINE_STYLES = [{class: 'bold', label: '', style: 'BOLD'},];
const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                    className={type.class}
                />
            )}
        </div>
    );
};

class Mission extends React.Component {

    delete(mission) {
        this.props.delete(missions);
    }

    render() {
        return (
            <ul>
                {this.props.mission.map((el, index) => (
                    <li key={index} className="li_mission">
                        <span className="names_mission">{el.missionTitle}</span>
                        <span className="names_mission">
                            {moment(el.fromDate, "DD/MM/YYYY").format("MM/YYYY").toString()}&nbsp;
                            {el.fromDate && el.toDate ? '-' : ''}&nbsp;
                            {moment(el.fromDate, "DD/MM/YYYY").format("MM/YYYY").toString()}
                        </span>
                        <span className="names_mission">{el.missionDescription}</span>
                        <span onClick={this.delete.bind(this, el)} className="empty_mission"></span>
                        <p/>
                    </li>
                ))}
            </ul>
        )
    }
}

class UserPopupMission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            isLoading: false,
            error: null,
            editMode: false,
            username: "",
            form: {
                missionDescription: "",
                fromDate: "",
                toDate: "",
                missionTitle: "",
            },
            educations: [],
            courses: [],
            mission: {},
            deleted: false,
            formError: {
                status: false,
                message: ""
            }
        };

        this.mandatoryFieldsList = [];
        //Editor
        if (props.mission && props.mission.missionDescription) {
            this.state = {
                editorState: EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        convertFromHTML(props.mission.missionDescription)
                    )
                ),
            }
        } else {
            this.state = {editorState: EditorState.createEmpty()};
        }

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({editorState});
        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.onTab = (e) => this._onTab(e);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    }

    componentDidMount() {
        this.setDataFormData();
    }

    validateMandatoryFields() {
        var mandatories = [];
        var formValues = this.state.form;
        this.mandatoryFieldsList.map(function (field) {
            if (formValues[field] != null) {
                if (formValues[field].trim().length == 0) {
                    mandatories.push(field);
                }
            } else {
                mandatories.push(field);
            }
        });
        var state = this.state;
        state['mandatoryFields'] = mandatories.slice();
        this.setState(state);

        if (mandatories.length > 0) {
            return false;
        } else {
            return true;
        }
    }

    convertDate(date) {
        if (date != null && date != 0) {
            var date_ = date.substr(0, 10).replace(/\//g, "-");
            var dateArray = date_.split("-");
            date = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0] + ' ' + date.substr(11);
            return date;
        }
    }

    addOrEdit_mission_user(event) {
        event ? event.preventDefault() : null;
        const {userInfo} = this.props;
        var userMission = {
            "username": userInfo.username,
            "mission": {
                missionDescription: stateToHTML(this.state.editorState.getCurrentContent()),
                fromDate: this.state.fromDate,
                toDate: this.state.toDate,
                missionTitle: this.state.missionTitle,
                id: 0

            },
        };
        editMissionUser(userMission);
    }

    setDataFormData() {
        const {mission} = this.props;
        if (mission != null) {
            var state = this.state;
            state['fromDate'] = mission.fromDate != null ? this.convertDate(mission.fromDate) : null;
            state['toDate'] = mission.toDate != null ? this.convertDate(mission.toDate) : null;
            state['missionTitle'] = mission.missionTitle || "";
            state['missionDescription'] = mission.missionDescription || "";
            state['oldMissionTitle'] = mission.missionTitle || "";
            this.setState(state);
        }
    }

    changeContent(name, e) {
        var state = this.state;
        state[name] = e.target.value;
        this.setState(state);
    }

    closePopupMission() {
        setTimeout(() => {
            if (this.props.showPopupMission === true && this.props.showPopupMissionEdit === false) {
                this.props.closePopupMission();
            }
            if (this.props.showPopupMission === false && this.props.showPopupMissionEdit === true) {
                this.props.closePopupMissionEdit();
            }
        }, 100);
    }

    changeDate(name, value) {
        if (value != null && name != null) {
            var dateValue = value.substr(0, 10);
        } else {
            var dateValue = null;
        }

        var state = this.state;
        state[name] = dateValue;
        this.setState(state);
    }

    _handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    //Editor
    _onTab(e) {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    renderPopupMission() {
        const {editorState} = this.state;

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }
        return (
            <div className='popup_courses'>
                <div className="close_courses" onClick={this.closePopupMission.bind(this)}></div>
                <form method="get" onSubmit={this.addOrEdit_mission_user.bind(this)}>
                    <div
                        className="header_courses">{this.props.edit == true ? 'Edit mission or work experience' : 'Add new mission or work experience'} </div>

                    <div>
                        <h3 className="name_new_mission">Add new mission / work experience </h3>
                        <div>
                            <table>
                                <tbody>
                                <tr>
                                    <td className="modal-body">
                                        <div className="col-xs-8">
                                            <label
                                                className="label_mission1_profile"><span> Mission name / Job title : </span></label>
                                        </div>
                                        <div className="col-xs-4">
                                            <input
                                                className="mission_profile"
                                                value={this.state.missionTitle}
                                                onChange={this.changeContent.bind(this, "missionTitle")}
                                                type="text"/>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                                <tbody>
                                <tr>
                                    <td className="modal-body">
                                        <div className="col-xs-2">
                                            <label className="label_mission2_profile"><span> From: </span></label>
                                        </div>
                                        <div className="col-xs-4">
                                                     <span className="ip_fromDate">
                                                        <DatePicker className="input_fromDate"
                                                                    dateFormat="DD/MM/YYYY"
                                                                    value={this.state.fromDate}
                                                                    onChange={this.changeDate.bind(this, "fromDate")}/>
                                                     </span>
                                        </div>
                                        <div className="col-xs-2">
                                            <label className="label_mission3_profile"><span> To : </span></label>
                                        </div>
                                        <div className="col-xs-4">
                                                  <span className="ip_toDate">
                                                <DatePicker className="input_toDate"
                                                            dateFormat="DD/MM/YYYY"
                                                            value={this.state.toDate}
                                                            onChange={this.changeDate.bind(this, "toDate")}/>
                                                </span>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                                <tbody>
                                <tr>
                                    <td>
                                        <label className="label_mission4_profile"><span> Mission/Job description : </span></label><br/>
                                    </td>
                                </tr>
                                </tbody>
                                <tbody>
                                <tr>
                                    <td colSpan={2}>
                                        <div className="RichEditor-root">
                                            <BlockStyleControls
                                                editorState={editorState}
                                                onToggle={this.toggleBlockType}
                                            />
                                            <InlineStyleControls
                                                editorState={editorState}
                                                onToggle={this.toggleInlineStyle}
                                            />
                                            <div className={className} onClick={this.focus}>
                                                <Editor
                                                    blockStyleFn={getBlockStyle}
                                                    customStyleMap={styleMap}
                                                    editorState={editorState ? editorState : ''}
                                                    handleKeyCommand={this.handleKeyCommand}
                                                    onChange={this.onChange}
                                                    onTab={this.onTab}
                                                    placeholder=""
                                                    ref="editor"
                                                    spellCheck={true}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="footer_missions">
                        <button
                            className="btn_course" type="submit" onClick={this.closePopupMission.bind(this)}>SAVE
                        </button>
                    </div>
                </form>

            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderPopupMission()}
            </div>
        );
    }
}

export default UserPopupMission;
