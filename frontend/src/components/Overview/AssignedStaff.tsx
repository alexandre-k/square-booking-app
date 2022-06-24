import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { TeamMember } from "types/Team";
import { anyMember } from "utils/staff";
import TeamMemberAvatar from "components/Booking/TeamMemberAvatar";
import Header from "components/Overview/Header";
import "./AssignedStaff.css";

interface AssignedStaffProps {
  anyTeamMember: boolean;
  member: TeamMember;
  disabled: boolean;
  editStaff: (member: TeamMember) => void;
}

const AssignedStaff = ({
  anyTeamMember,
  member,
  editStaff,
  disabled,
}: AssignedStaffProps) => (
  <>
    <div id="staffContainer">
      <TeamMemberAvatar
        member={anyTeamMember ? anyMember() : member}
      />
      <IconButton
        aria-label="edit"
        disabled={disabled}
        color="secondary"
        onClick={() => editStaff(member)}
      >
        <EditIcon />
      </IconButton>
    </div>
  </>
);

export default AssignedStaff;
