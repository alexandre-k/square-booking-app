import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
// import { Customer } from "hooks/useCustomer";
import { TeamMember } from "types/Team";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Loading from "components/Loading";
import "./TeamMembers.css";
import TeamMemberAvatar from "components/Booking/TeamMemberAvatar";
import { getTeamMembers } from "api/team";

interface TeamMembersProps {
  showOwner: boolean;
  selectedMemberId: string | null;
  setSelectedMemberId: (selectedMemberId: string) => void;
  goNext: () => void;
}

const TeamMembers = (props: TeamMembersProps) => {
  const { isLoading, isError, data, error } = useQuery<
    Array<TeamMember>,
    AxiosError
  >("teamMembers", getTeamMembers);

  if (!data || isLoading) return <Loading />;
  const listItem = data
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
