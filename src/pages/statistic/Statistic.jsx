import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Statistic() {
  const columns = [
    { field: "STT", headerName: "STT", width: 90 },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      //   renderCell: (params) => {
      //     return (
      //       <div className="productListItem">
      //         <img className="productListImg" src={params.row.img} alt="" />
      //         {params.row.title}
      //       </div>
      //     );
      //   },
    },
    { field: "username", headerName: "Name", width: 120 },
    { field: "numPost", headerName: "Total posts", width: 120 },

    // {
    //   field: "profilePic",
    //   headerName: "Avatar",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link
    //           to={{ pathname: "/movie/" + params.row._id, movie: params.row }}
    //         >
    //           <button className="productListEdit">Edit</button>
    //         </Link>
    //         <DeleteIcon
    //           className="productListDelete"
    //           //  onClick={() => handleDelete(params.row._id)}
    //         />
    //       </>
    //     );
    //   },
    // },
  ];

  const post = [
    {
      id: 1,
      STT: "1",
      name: "1",
      email: "@gmail.com",
      username: "vhao",
      numPost: "2",
    },
    {
      id: 2,
      STT: "2",
      name: "1",
      email: "@gmail.com",
      username: "vhao",
      numPost: "2",
    },
  ];
  return (
    <>
      <DataGrid
        //  disableSelectionOnClick
        columns={[
          { field: "default", width: 150 },
          { field: "name", width: 150 },
          { field: "stars", width: 150 },
        ]}
        rows={[
          {
            id: 1,
            name: "MUI",
            stars: 28000,
            default: "Open source",
          },
          {
            id: 2,
            name: "DataGridPro",
            stars: 15000,
            default: "Enterprise",
          },
        ]}
        //rows={post}
        pageSize={8}
        checkboxSelection
        //  getRowId={(r) => r._id}
      />
    </>
  );
}
