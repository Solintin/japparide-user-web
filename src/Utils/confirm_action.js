/* eslint-disable  */

const index = (dis, action, value) => {
   dis
    .$swal({
      title: "Are you sure?",
      text: "Confirm you want to continue this action",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    })
    .then((result) => {
      if (result.isConfirmed) {
        action(value);
      }
    });
};
export default index;
