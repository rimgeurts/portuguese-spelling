export default function searchUserEmailInGroupArray(groups, search) {
  // data array to store the filtered groups
  const data = [];

  // loop through each group
  for (const group of groups.data) {
    const { members } = group;

    // create a new members array to store the filtered members
    const filteredMembers = [];

    // loop through each member in the group
    for (const member of members) {
      // check if the email matches the wildcard search
      if (member.email.includes(search)) {
        // add the member to the filtered members array
        filteredMembers.push(member);
      }
    }
    data.push({ ...group, members: filteredMembers });
  }

  return { data };
};