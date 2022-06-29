import { TeamMember } from "types/Team";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import "./TeamMemberAvatar.css";

interface TeamMemberAvatarProps {
  member: TeamMember;
}

const TeamMemberAvatar = ({ member }: TeamMemberAvatarProps) => (
  <div className="avatarContainer">
    <Avatar
      sx={{ width: 56, height: 56 }}
      src={`https://ui-avatars.com/api/?name=${member.givenName}+${member.familyName}.jpg`}
    />
    <div className="memberButton">
      <Typography  mt={1}>
        {member.givenName}
      </Typography>

      <Typography style={{ margin: '1px' }} mt={1}>
      {member.familyName}
      </Typography>
    </div>
  </div>
);

export default TeamMemberAvatar;
