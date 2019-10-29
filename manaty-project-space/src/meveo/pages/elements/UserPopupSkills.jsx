import React, {Component} from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import { render } from 'react-dom';
import {Modal, Panel, PanelGroup} from 'react-bootstrap';
import {userDetail, editProfileUser,editSkillsUser} from '../../actions/UserProfileAction';

import StarRatingComponent from 'react-star-rating-component';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

const SortableItem = SortableElement(({ value, index, sortIndex,onRemove}) =>
    <div className="li_skill" >
        <li className="li_skill_profile"><span className="names_skill">{value.name}</span>
            {/*<span onClick={() => onRemove(value)} className="empty_skill"></span>*/}
            <span><button onClick={() => onRemove(value)} className="empty_skills"><i ></i></button></span>
            {sortIndex == 0 ? (
                <span className="move_up"></span>
            ) : (
                ""
            )}
            {sortIndex != 0 ? (
                <span><span onClick={() => this.props.moveSkills(sortIndex, sortIndex - 1)} className="move_up"></span></span>
            ) : (
                ""
            )}
            {sortIndex != null ? (
                <span><span onClick={() => this.props.moveSkills(sortIndex, sortIndex + 1)} className="move_down"></span></span>
            ) : (
                ""
            )}
            {sortIndex == null? (
                <span className="move_down"></span>
            ) : (
                ""
            )}
            <div className="star">
                <StarRatingComponent
                    starCount={5}
                    value={value ? value.ratio :0 }
                    starColor={"#ffff00"}
                    emptyStarColor={"#c0c0c0"}
                    name="rate"
                />
            </div>
        </li>
        {sortIndex == 4 ?
            <div>
                <div className="top5_skill">Top 5 skills</div>

            </div>
            : ""}
    </div>
);

const SortableList = SortableContainer(({ skills,onRemove }) => {
    return (
        <ul>
            {skills.map((value,index,i) => (
                <SortableItem value={value}
                              key={`item-${index}`}
                              index={index}
                              sortIndex={index}
                              onRemove={onRemove}/>
            ))}
        </ul>
    );
});

class UserPopupSkills extends Component {

    constructor() {
        super();
        this.state = {
            ratio: 1,
            showPopup: false,
            isLoading: false,
            error: null,
            editMode: false,
            form:{
                username: "",
                email: "",
                firstName: "",
                lastName: "",
                bio:"",
                manatyProjects:"",
                availability:""
            },
            skills: [
                { name: "", ratio:null},
            ],
            deleted: false,
            formError: {
                status: false,
                message: ""
            }
        }

        this.mandatoryFieldsList = [];
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    componentDidMount(){
    	this.setDataFormData();
    }

    changeContent(name, e) {
        var state = this.state;
        state['form'][name] = e.target.value;
        this.setState(state);
    }
    validateMandatoryFields(){
        var mandatories = [];
        var formValues = this.state.form;
        this.mandatoryFieldsList.map(function (field) {
            if (formValues[field] != null) {
                if (formValues[field].trim().length == 0) {
                    mandatories.push(field);
                }
            }else{
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

    edit_skills_user(event) {
        event ? event.preventDefault() : null;
        const {userInfo} = this.props;
        var userData = {
            "username": userInfo.username,
            "skills": this.state.skills,
        };
        editSkillsUser(userData);
    }

    setDataFormData() {
        const {userInfo} = this.props;
        if (userInfo != null) {
            var state = this.state;
            state['form']['email'] = userInfo.email || "";
            state['form']['username'] = userInfo.username || "";
            state['form']['lastName'] = userInfo.lastName || "";
            state['form']['firstName'] = userInfo.firstName || "";
            state['skills'] = userInfo.skills || "";
            this.setState(state);
        }
    }

    delete(skills) {
        this.setState(prevState => ({
            skills: prevState.skills.filter(value => value.name != skills.name)
        }));
    }

    onChange(event) {
        this.setState({ term: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({
            term: "",
            ratio: 0,
            skills: [
                ...this.state.skills,
                { name: this.state.term, ratio: this.state.ratio }
            ]
        });
    }
    onStarClick(nextValue, prevValue, name) {
        this.setState({ ratio: nextValue });
    }

    moveSkills(fromIndex, toIndex) {
        let skills = this.state.skills;
        let movedCard = skills.splice(fromIndex, 1)[0];
        skills.splice(toIndex, 0, movedCard);
        this.setState({
            skills: skills
        });
    }

    closePopupSkills() {
        setTimeout(() => {
            this.props.closePopupSkills();
        }, 100);
    }

    //drag
    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items,
        });
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState({
            skills: arrayMove(this.state.skills, oldIndex, newIndex),
        });
    };

    renderPopupSkills() {
        const { ratio } = this.state;
        return (
            <div className='popup_skill'>
                <div className="close_skill" onClick={this.props.closePopupSkills}></div>
                <form method="get" onSubmit={this.edit_skills_user.bind(this)}>
                    <div className="header_skill" >EDIT SKILLS</div>
                    <div className="modal-body">
                        <div className="col-xs-6 left_skill">
                            {/*left_skill right_skill*/}
                            <h3 className="name_skill">Organize skills</h3>

                                <div class="longText" id="hidingScrollBar">
                                    <div class="hideScrollBar">
                                        <SortableList skills={this.state.skills}
                                                      onSortEnd={this.onSortEnd}
                                                      onRemove={(skills) => this.delete(skills)}
                                                      moveSkills={this.moveSkills.bind(this)}
                                        />
                                    </div>
                                </div>
                            </div>

                        <div className="col-xs-6 right_skill">
                            <h3 className="name_new_skill">Add new skill</h3>
                                <div id="hidingScrollBar">
                                    {/*todo list*/}
                                    <form onSubmit={this.onSubmit.bind(this)} >
                                        <div className="wen_skill"></div>
                                        <div className="border_input"><input  className="ip_skill"  placeholder="Skill..." value={this.state.term} onChange={this.onChange.bind(this)} /></div>
                                        {/*star rating*/}
                                        <span className="proficiency">Proficiency:
                                        </span>
                                        <span className="stars_skill">
                                            <StarRatingComponent
                                                name="rate"
                                                starCount={5}
                                                value={ratio ? ratio : 0}
                                                starColor={"#ffff00"}
                                                emptyStarColor={"#c0c0c0"}
                                                onStarClick={this.onStarClick.bind(this)}
                                            />
                                            </span>
                                        {/*star rating*/}
                                        <button  className="add_skill" disabled={!this.state.term || !this.state.ratio}>ADD</button>
                                    </form>
                                    {/*todo list*/}
                                </div>
                            </div>
                    </div>

                    <div className="footer_skill">
                        <button className="btn_skill" type="submit" onClick={this.closePopupSkills.bind(this)}>SAVE</button>
                    </div>
                </form>
            </div>
        );
    }

    render() {
        return (
			<div>
				{this.renderPopupSkills()}
			</div>

        );
    }
}
export default UserPopupSkills;
