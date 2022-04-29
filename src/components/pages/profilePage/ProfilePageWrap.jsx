import classes from "./ProfilePage.module.css"

const ProfilePageWrap = (props) =>{
    return <div className = {classes.wrapBox}>{props.children}</div>;
}

export default ProfilePageWrap;