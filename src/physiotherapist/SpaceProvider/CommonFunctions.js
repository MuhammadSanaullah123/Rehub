import moment from "moment";
import { useSelector } from "react-redux";

// const userData = useSelector((state) => state.user);
export const SendDataTimeLocationfilter = (allSpaces, temptime, date, location) => {
  let dataempty = [...allSpaces];
  dataempty = dataempty
    ?.filter((item) => item.name.includes(location) && item)
    .map((item2) => {
      return {
        ...item2,
        pickDate: item2?.pickDate
          .filter((item2) => item2?.dateofAvailibilty === moment(date).format("DD/MM/YYYY"))
          .map((item3) => {
            return {
              ...item3,
              timeslots: item3.timeslots.filter(
                (item) => item?.timevalue?.split(" ")?.join("") === temptime?.split(" ")?.join(""),
              ),
            };
          })
          ?.filter((item) => item?.pickDate?.length !== 0),
      };
    });

  const datachnagefilter = dataempty?.filter((item) => item?.pickDate?.length !== 0);
  // let daatacost = dataempty?.filter((item) => item?.pickDate !== 0);

  return datachnagefilter;
};

export const SendLocationAndDateFilter = (
  allSpaces,

  date,
  location,
) => {
  let dataempty = [...allSpaces];
  dataempty = dataempty
    ?.filter((item) => item.name.includes(location) && item)
    .map((item2) => {
      return {
        ...item2,
        pickDate: item2?.pickDate.filter((item2) => item2?.dateofAvailibilty === moment(date)?.format("DD/MM/YYYY")),
      };
    });

  return dataempty;
};

export const SendDateAndTimeFilter = (allSpaces, temptime, date) => {
  let dataempty = [...allSpaces];
  dataempty = dataempty?.map((item) => {
    return {
      ...item,
      pickDate: item?.pickDate
        .filter((item2) => item2?.dateofAvailibilty === moment(date)?.format("DD/MM/YYYY"))
        .map((item3) => {
          return {
            ...item3,
            timeslots: item3.timeslots.filter(
              (item4) => item4?.timevalue?.split(" ")?.join("") === temptime?.split(" ")?.join(""),
            ),
          };
        }),
    };
  });

  return dataempty;
};

export const SendLocationAndTimeFilter = (allSpaces, location, temptime) => {
  let dataempty = [...allSpaces];
  dataempty = dataempty
    ?.filter((item) => item.name.includes(location) && item)
    .map((item2) => {
      return {
        ...item2,
        pickDate: item2?.pickDate.map((item3) => {
          return {
            ...item3,
            timeslots: item3.timeslots.filter(
              (item) => item?.timevalue?.split(" ")?.join("") === temptime?.split(" ")?.join(""),
            ),
          };
        }),
      };
    });

  return dataempty;
};

export const SendDateFilter = (allSpaces, date) => {
  let dataempty = [...allSpaces];
  dataempty = dataempty?.map((item) => {
    return {
      ...item,
      pickDate: item?.pickDate.filter((item2) => item2?.dateofAvailibilty === moment(date)?.format("DD/MM/YYYY")),
    };
  });

  return dataempty;
};

export const SendTimeFilter = (allSpaces, temptime) => {
  let dataempty = [...allSpaces];
  dataempty = dataempty?.map((item) => {
    return {
      ...item,
      pickDate: item?.pickDate.map((item3) => {
        return {
          ...item3,
          timeslots: item3.timeslots.filter(
            (item) => item?.timevalue?.split(" ")?.join("") === temptime?.split(" ")?.join(""),
          ),
        };
      }),
    };
  });

  return dataempty;
};

export const SendLocationFilter = (allSpaces, location) => {
  let dataempty = [...allSpaces];
  dataempty = dataempty?.filter((item) => item.name.includes(location) && item);

  return dataempty;
};

// export const myFunction = (e) => {
//   var yesterday = moment().subtract(1, "day").format("YYYY-MM-DD");
//   var SpecialToDate = e;

//   var tommorrw = moment().add(1, "day").format("YYYY-MM-DD");
//   if (moment(SpecialToDate, "YYYY-MM-DD", true).isAfter(yesterday)) {
//     if (moment(SpecialToDate, "YYYY-MM-DD", true).isBefore(tommorrw)) {
//       return "Upcoming";
//     } else {

//       return "Upcoming";
//     }
//   } else {
//     return "Previous";
//   }
// };

// export const filterforAddStatusInlistbooking = (datachange) => {
//   let datamodified;
//   datamodified = datachange
//     ?.filter((itemfil) => itemfil?.pickDate.length !== 0)
//     ?.map((item) => {
//       return {
//         ...item,
//         pickDate: item?.pickDate
//           ?.filter((item2) => item2?.timeslots.length !== 0)
//           ?.map((item3) => {
//             return {
//               ...item3,
//               timeslots: item3?.timeslots
//                 ?.filter((item4) => item4?.isBooked)
//                 .map((item5) => {
//                   return {
//                     ...item5,
//                     status: myFunction(
//                       moment(item3?.dateofAvailibilty).format("YYYY-DD-MM")
//                     ),
//                   };
//                 }),
//             };
//           }),
//       };
//     });
//   return datamodified;
// };

export const checkcurrentuserbookingUpComming = (datachange, currentUserId) => {
  const canges = datachange.map((item2) => {
    return {
      ...item2,
      pickDate: item2?.pickDate?.map((item4) => {
        return {
          ...item4,
          timeslots: item4?.timeslots?.filter(
            (item5) => (item5?.status === "Upcoming" || item5?.status === "Upcoming") && item5?.userName === `${currentUserId}`,
          ),
        };
      }),
    };
  });
  return canges;
};

export const checkcurrentuserbookingPrevious = (datachange, currentUserId) => {
  const canges = datachange.map((item2) => {
    return {
      ...item2,
      pickDate: item2?.pickDate?.map((item4) => {
        return {
          ...item4,
          timeslots: item4?.timeslots?.filter(
            (item5) => item5?.status === "Previous" && item5?.userName === `${currentUserId}`,
          ),
        };
      }),
    };
  });
  return canges;
};

export const removeEmptyPickDate = (testArray) => {
  const checkemptytimeloty = testArray?.map((item2) => {
    return {
      ...item2,
      pickDate: item2?.pickDate?.filter((item4) => item4?.timeslots?.length !== 0),
    };
  });

  const checkpickdaateEmpty = checkemptytimeloty?.filter((item) => item?.pickDate?.length !== 0);

  return checkpickdaateEmpty;
};
