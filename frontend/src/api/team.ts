import { sendRequest } from "utils/request";
import { TeamMember } from "types/Team";

export const getTeamMembers = async () => {
    const teamMembers = await sendRequest("/staff/search", "POST");
    return teamMembers
      .filter((m: TeamMember) => !m.isOwner)
      .map((member: TeamMember) => ({
        ...member,
        avatarUrl: `https://ui-avatars.com/api/?name=${member.givenName}+${member.familyName}.jpg`,
      }));
  };
