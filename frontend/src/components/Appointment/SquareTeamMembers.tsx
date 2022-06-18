import { Dispatch, SetStateAction } from "react";
// import { Customer } from "hooks/useSquareCustomer";
import { TeamMember } from "types/Team";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import "./SquareTeamMembers.css";

interface TeamMembersProps {
  members: Array<TeamMember>;
  showOwner: boolean;
  selectedMemberId: string | null;
  setSelectedMemberId: Dispatch<SetStateAction<string | null>>;
  goNext: () => void;
}

const LocationTeamMembers = (props: TeamMembersProps) => {
  const listItem = props.members
    .filter((member) => !member.isOwner || props.showOwner)
    .map((member) => (
      <Grid item xs={3} md={2} key={member.id}>
        <ListItem>
          <ListItemButton
            selected={member.id === props.selectedMemberId}
            onClick={() => {
              props.setSelectedMemberId(member.id);
              props.goNext();
            }}
          >
            <div className="memberButton">
              <ListItemAvatar>
                <Avatar sx={{ width: 56, height: 56 }} src={member.avatarUrl} />
              </ListItemAvatar>
              <ListItemText>
                <div className="memberButton">
                  <Typography mt={1}>{member.givenName}</Typography>
                  <Typography>{member.familyName}</Typography>
                </div>
              </ListItemText>
            </div>
          </ListItemButton>
        </ListItem>
      </Grid>
    ));
  return (
    <>
      <List>
        <Grid container spacing={1}>
          {listItem}
        </Grid>
      </List>
    </>
  );
};

LocationTeamMembers.defaultProps = {
  members: [],
  showOwner: false,
  selectedMemberId: null,
};

export default LocationTeamMembers;
