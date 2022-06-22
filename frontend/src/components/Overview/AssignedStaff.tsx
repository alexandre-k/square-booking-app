import IconButton from "@mui/material/IconButton";
import PeopleIcon from "@mui/icons-material/People";
import EditIcon from "@mui/icons-material/Edit";
import { AppointmentSegment } from "types/Booking";
import { TeamMember } from "types/Team";
import { anyMember } from "utils/staff";
import TeamMemberAvatar from "components/Booking/TeamMemberAvatar";
import Header from "components/Overview/Header";
import "./AssignedStaff.css";

interface AssignedStaffProps {
  appointment: AppointmentSegment;
  member: TeamMember;
  editStaff: (edit: true) => void;
}

const AssignedStaff = ({ appointment, member, editStaff }: AssignedStaffProps) => (
  <>
    <Header icon={<PeopleIcon />} title="Team member" />
    <div id="staffContainer">
      <TeamMemberAvatar
        member={appointment.anyTeamMember ? anyMember() : member}
      />
      <IconButton
        aria-label="edit"
        color="secondary"
        onClick={() => editStaff}
      >
        <EditIcon />
      </IconButton>
    </div>
  </>
);

export default AssignedStaff;
