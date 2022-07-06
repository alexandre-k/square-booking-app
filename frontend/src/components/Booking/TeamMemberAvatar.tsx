import { TeamMember } from "types/Team";
import UserAvatar from "components/User/UserAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import "./TeamMemberAvatar.css";

interface TeamMemberAvatarProps {
  member: TeamMember;
}

const TeamMemberAvatar = ({ member }: TeamMemberAvatarProps) => (
  <div className="avatarContainer">
    <UserAvatar
      letters={`${member.givenName}+${member.familyName}`}
    />
    <div className="memberButton">
      <Typography  mt={1} >
        {member.givenName}
      </Typography>

      <Typography style={{ margin: '1px' }} mt={1}>
      {member.familyName}
      </Typography>
    </div>
  </div>
);

export default TeamMemberAvatar;
