import React, {PureComponent} from 'react';
import Icon from "../../shared/Icon.jsx";

class UserPopupMissionRemove extends PureComponent {

    render() {
        const { removeMission, closePopupMissionRemove, showPopupMissionRemove } = this.props;
        if (showPopupMissionRemove) {
            return (
                <div className='popup_mission_remove'>
                    <div className="footer_mission_remove">
                        <div className="title_mission_remove">
                           <div className="title_mission_icon">
                               <Icon
                                    fill="#ff5d00"
                                    width={100}
                                    className="icon_svg"
                                />
                           </div>
                            <div  className="display_title"> Do you want to delete mission / work experiences? </div>
                        </div>
                        <div>
                            <button className="btn_mission_remove" onClick={removeMission}>Delete</button>
                            <button className="btn_mission_cancel" onClick={closePopupMissionRemove}>Cancel</button>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default UserPopupMissionRemove;
