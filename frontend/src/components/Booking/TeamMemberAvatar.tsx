import { Dispatch, SetStateAction } from "react";
import { TeamMember } from "types/Team";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import "./TeamMembers.css";

interface TeamMemberAvatarProps {
  member: TeamMember;
  selectedMemberId: string | null;
  setSelectedMemberId: Dispatch<SetStateAction<string | null>>;
}

const TeamMemberAvatar = ({ member }: TeamMemberAvatarProps) => (
    <>
    <ListItemAvatar>
        <Avatar sx={{ width: 56, height: 56 }} src={`https://ui-avatars.com/api/?name=${member.givenName}+${member.familyName}.jpg`} />
    </ListItemAvatar>
    <ListItemText>
        <div className="memberButton">
            <Typography mt={1}>{member.givenName} {member.familyName}</Typography>
        </div>
    </ListItemText>
    </>
);

export default TeamMemberAvatar;
