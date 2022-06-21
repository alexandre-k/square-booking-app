import PeopleIcon from "@mui/icons-material/People";
import { AppointmentSegment } from "types/Booking";
import { TeamMember } from "types/Team";
import { anyMember } from "utils/staff";
import TeamMemberAvatar from "components/Booking/TeamMemberAvatar";
import Header from "components/Overview/Header";

interface AssignedStaffProps {
  appointment: AppointmentSegment;
  member: TeamMember;
}

const AssignedStaff = ({ appointment, member }: AssignedStaffProps) => (
  <>
    <Header icon={<PeopleIcon />} title="Team member" />
    <TeamMemberAvatar
      member={appointment.anyTeamMember ? anyMember() : member}
    />
  </>
);

export default AssignedStaff;
