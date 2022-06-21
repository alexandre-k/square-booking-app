import { Dispatch, SetStateAction } from "react";
// import { Customer } from "hooks/useCustomer";
import { TeamMember } from "types/Team";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import "./TeamMembers.css";
import TeamMemberAvatar from "components/Booking/TeamMemberAvatar";

interface TeamMembersProps {
  members: Array<TeamMember>;
  showOwner: boolean;
  selectedMemberId: string | null;
  setSelectedMemberId: Dispatch<SetStateAction<string | null>>;
  goNext: () => void;
}

const TeamMembers = (props: TeamMembersProps) => {
  const listItem = props.members
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
  members: [],
  showOwner: false,
  selectedMemberId: null,
};

export default TeamMembers;
