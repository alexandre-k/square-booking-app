import { TeamMember } from "types/Team";
import UserAvatar from "components/User/UserAvatar";
import Typography from "@mui/material/Typography";
import "./TeamMemberAvatar.css";
import { getInitials } from "utils/staff";

interface TeamMemberAvatarProps {
  member: TeamMember;
}

const TeamMemberAvatar = ({ member }: TeamMemberAvatarProps) => (
  <div className="avatarContainer">
    <UserAvatar
      letters={getInitials(member)}
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
