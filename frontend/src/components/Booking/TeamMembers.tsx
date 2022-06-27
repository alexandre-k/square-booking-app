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
  onDone: (memberId: string) => void;
}

const TeamMembers = ({
  showOwner,
  selectedMemberId,
  onDone,
}: TeamMembersProps) => {
  const { isLoading, isError, data, error } = useQuery<
    Array<TeamMember>,
    AxiosError
  >("teamMembers", getTeamMembers);

  if (!data || isLoading) return <Loading />;
  if (isError)
    return (
      <>
        <div>Error:</div>
        <div>{error.message}</div>
      </>
    );
  const listItem = data
    .filter((member) => !member.isOwner || showOwner)
    .map((member, index) => (
      <div id="membersContainer" key={member.id}>
        <ListItem>
          <ListItemButton
            className="memberButton"
            autoFocus={index === 0}
            selected={member.id === selectedMemberId}
            onClick={() => {
              onDone(member.id);
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
