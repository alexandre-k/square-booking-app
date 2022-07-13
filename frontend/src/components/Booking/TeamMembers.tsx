import { AxiosError } from "axios";
import { useQuery } from "react-query";
// import { Customer } from "hooks/useCustomer";
import { TeamMember } from "types/Team";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Skeleton from "@mui/material/Skeleton";
import "./TeamMembers.css";
import TeamMemberAvatar from "components/Booking/TeamMemberAvatar";
import { getTeamMembers } from "api/team";

interface TeamMembersProps {
  showOwner: boolean;
  selectedMemberIds: Array<string>;
  onDone: (memberIds: Array<string>) => void;
}

const TeamMembers = ({
  showOwner,
  selectedMemberIds,
  onDone,
}: TeamMembersProps) => {
  const { isLoading, isError, data, error } = useQuery<
    Array<TeamMember>,
    AxiosError
  >("teamMembers", getTeamMembers);

  if (!data || isLoading) {
    return (
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {Array.from(Array(4).keys()).map((key) => (
          <Grid id="memberSkeletonContainer" item xs={6} md={6} key={key}>
            <Skeleton variant="text" width="150px" height="150px" />
          </Grid>
        ))}
      </Grid>
    );
  }
  if (isError)
    return (
      <>
        <div>Error:</div>
        <div>{error.message}</div>
      </>
    );
  const anyone = {
    id: "anyStaffMember",
    isOwner: false,
    status: "ACTIVE",
    givenName: "Anyone",
    familyName: "available",
    emailAddress: "",
    phoneNumber: "",
    createdAt: "",
    updatedAt: "",
    avatarUrl: "",
  } as TeamMember;
  const dataOrAnyone = [anyone, ...data];
  const listItem = dataOrAnyone
    .filter((member) => !member.isOwner || showOwner)
    .map((member, index) => (
      <Grid item xs={6} md={3} key={member.id}>
        <ListItem>
          <ListItemButton
            className="memberButton"
            autoFocus={index === 0}
            selected={
              selectedMemberIds.length > 0 && member.id === selectedMemberIds[0]
            }
            onClick={() => {
              if (member.id === "anyStaffMember") {
                onDone(data.map((d) => d.id));
              } else {
                onDone([member.id]);
              }
            }}
          >
            <TeamMemberAvatar member={member} />
          </ListItemButton>
        </ListItem>
      </Grid>
    ));
  return (
    <List>
      <Grid container spacing={1} justifyContent="start" alignItems="center">
        {listItem}
      </Grid>
    </List>
  );
};

TeamMembers.defaultProps = {
  showOwner: false,
  selectedMemberIds: [],
};

export default TeamMembers;
