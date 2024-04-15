let therapist;

export function onSubmit(data, state) {
  data.preventDefault();

  for (const i of data.target) {
    if (i.type !== "submit") {
      switch (i.name) {
        case "avatar":
          therapist = {
            avatar: i.value,
          };
          break;
        case "name":
          therapist = {
            ...therapist,
            name: i.value,
          };
          break;
        case "lastname":
          therapist = {
            ...therapist,
            lastname: i.value,
          };
          break;
        case "email":
          therapist = {
            ...therapist,
            email: i.value,
          };
          break;
        case "therapist":
          therapist = {
            ...therapist,
            type_therapist: i.value,
          };
          break;
        case "specility":
          therapist = {
            ...therapist,
            speciality: i.value,
          };
          break;
        case "session":
          therapist = {
            ...therapist,
            total_sessions: i.value,
          };
          break;
        default:
          return "";
      }
    }
  }

  state(therapist);
}
