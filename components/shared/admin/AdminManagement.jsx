// import { useState } from "react";
// import toast from "react-hot-toast";
// import ConfirmationModal from "./ConfirmationModal";
// import { deleteAdmin } from "@/actions/admin.action";

// const AdminManagement = ({ adminId }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [adminContentInfo, setAdminContentInfo] = useState(null);

//   const handleDeleteAdmin = async () => {
//     console.log("Starting admin deletion process...");
//     const result = await deleteAdmin({ userId: adminId });
//     console.log(result)
//     console.log("Delete result:", result);

//     if (result.hasContent) {
//       console.log("Admin has content, showing confirmation modal.");
//       setAdminContentInfo(result.contentInfo);
//       setShowModal(true);
//     } else if (result.status === "success") {
//       toast.success(result.message);
//       // Update UI or redirect
//     } else {
//       toast.error(result.message);
//     }
//   };

//   const confirmDelete = async () => {
//     setShowModal(false);
//     const result = await deleteAdmin({ userId: adminId }, true);
    
//     if (result.status === "success") {
//       toast.success(result.message);
//       // Update UI or redirect
//     } else {
//       toast.error(result.message);
//     }
//   };

//   return (
//     <>
//       <button onClick={handleDeleteAdmin}>Delete Admin</button>
//       {showModal && (
//         <ConfirmationModal
//           title="Confirm Admin Deletion"
//           content={`This admin has ${adminContentInfo.blogsCreated} blogs and ${adminContentInfo.productsCreated} products created. Are you sure you want to delete?`}
//           onConfirm={confirmDelete}
//           onCancel={() => setShowModal(false)}
//         />
//       )}
//     </>
//   );
// };

// export default AdminManagement;
