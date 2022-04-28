import classes from "./ProfilePage.module.css";
import ProfilePageWrap from "./ProfilePageWrap";
import ProfileIcon from "../../navbar/profileIcon/ProfileIcon";
import Button from "../../button/Button";


const ProfilePage = (props) =>{
    const onMyTasksClickHandler = () =>{
        console.log("My Tasks clicked");
    }
    const onLogOutClickHandler = ()=>{
        console.log("Log out clicked");
    }
    return (props.trigger) ? ( 
    <ProfilePageWrap>
        <ProfileIcon imageSrc = {props.imageSrc}/>
        <div className = {classes.username}>{props.username}</div>
        <div className = {classes.email}>{props.email}</div>
        <Button innerText = "My Tasks" onClick = {onMyTasksClickHandler} />
        <Button innerText = "Log Out" onClick = {onLogOutClickHandler} />
    </ProfilePageWrap>
    ):"";
}

export default ProfilePage;