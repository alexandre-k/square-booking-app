import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { Customer } from "hooks/useCustomer";
import { TeamMember } from "types/Team";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Loading from "components/Loading";
import "./TeamMembers.css";
import TeamMemberAvatar from "components/Booking/TeamMemberAvatar";
import { sendRequest } from "utils/request";

interface TeamMembersProps {
  showOwner: boolean;
  selectedMemberId: string | null;
  setSelectedMemberId: Dispatch<SetStateAction<string | null>>;
  goNext: () => void;
}

const TeamMembers = (props: TeamMembersProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const getTeamMembers = async () => {
    setLoading(true);
    const teamMembers = await sendRequest("/staff/search", "POST");
    const members = teamMembers
      .filter((m: TeamMember) => !m.isOwner)
      .map((member: TeamMember) => ({
        ...member,
        avatarUrl: `https://ui-avatars.com/api/?name=${member.givenName}+${member.familyName}.jpg`,
      }));
    setMembers(members);
    setLoading(false);
  };
  useEffect(() => {
    if (members.length === 0) {
      getTeamMembers();
    }
  }, []);
  if (loading) return <Loading />;
  const listItem = members
    .filter((member) => !member.isOwner || props.showOwner)
    .map((member, index) => (
      <div id="membersContainer" key={member.id}>
        <ListItem>
          <ListItemButton
            className="memberButton"
            autoFocus={index === 0}
            selected={member.id === props.selectedMemberId}
            onClick={() => {
              props.setSelectedMemberId(member.id);
              props.goNext();
            }}
          >
            <TeamMemberAvatar member={member} />
          </ListItemButton>
        </ListItem>
      </div>
    ));
  return (
    <>
      <List>
        <Grid container spacing={1} justifyContent="center">
          {listItem}
        </Grid>
      </List>
    </>
  );
};

TeamMembers.defaultProps = {
  showOwner: false,
  selectedMemberId: null,
};

export default TeamMembers;
