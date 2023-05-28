import swal from "sweetalert";

const SimpleAlert = (icon, message) => {
  swal({
    icon,
    text: message,
    button: false,
    timer: 2000,
  });
};

const DeleteAlert = () => {
  return new Promise((resolve) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: false,
    }).then((deleted) => {
      if (deleted) {
        resolve(true);
      }
      resolve(false);
    });
  });
};

const UpdateAlert = () => {
  return new Promise((resolve) => {
    swal({
      title: "Are you sure?",
      text: " You want to Update this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: false,
    }).then((deleted) => {
      if (deleted) {
        resolve(true);
      }
      resolve(false);
    });
  });
};

const ItemPurchasedAlert = (payload) => {
  return new Promise((resolve) => {
    swal({
      title: "Are you sure?",
      text: ` You want to purchased this! Item Name : ${payload?.name} price : ${payload?.price}`,
      // icon: "warning",
      // buttons: ,
      buttons: ["Cancel", "Buy"],
      // dangerMode: true,
      closeOnClickOutside: false,
    }).then((deleted) => {
      if (deleted) {
        resolve(true);
      }
      resolve(false);
    });
  });
};

export { DeleteAlert, UpdateAlert, ItemPurchasedAlert };

export default SimpleAlert;
