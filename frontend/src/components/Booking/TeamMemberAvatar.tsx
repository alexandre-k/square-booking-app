import { TeamMember } from "types/Team";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import "./TeamMemberAvatar.css";

interface TeamMemberAvatarProps {
  member: TeamMember;
}

const TeamMemberAvatar = ({ member }: TeamMemberAvatarProps) => (
  <div id="avatarContainer">
    <Avatar
      sx={{ width: 56, height: 56 }}
      src={`https://ui-avatars.com/api/?name=${member.givenName}+${member.familyName}.jpg`}
    />
    <div id="memberButton">
      <Typography mt={1}>
        {member.givenName} {member.familyName}
      </Typography>
    </div>
  </div>
);

export default TeamMemberAvatar;
