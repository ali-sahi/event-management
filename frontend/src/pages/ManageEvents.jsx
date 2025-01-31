import { Paper } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import API from "../config/apiClient";
import { useAuth } from "../providers/AuthProvider";
import { CheckAxiosError } from "../utils/checkAxiosError";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { Cancel, Delete, Edit, Save } from "@mui/icons-material";
import { useFetchEvents } from "../hooks/useFetchEvents";

const ManageEvents = () => {
  const { user } = useAuth();
  const { eventsList } = useFetchEvents();
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    const formattedRows = eventsList.map((event) => ({
      ...event,
      id: event._id,
    }));
    setRows(formattedRows);
  }, [eventsList]);

  const handleEditClick = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = async (id) => {
    try {
      console.log("asdasdasd", id);

      const res = await API.delete(`/event/delete_event/${user._id}`, { data: { eventId: id } });
      toast.success(res.data.message);
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      CheckAxiosError(error);
    }
  };

  const handleCancelClick = (id) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const processRowUpdate = async (newRow) => {
    try {
      const res = await API.post(`/event/change_status/${user._id}`, { eventId: newRow.id, status: newRow.status });
      toast.success(res.data.message);
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    } catch (error) {
      CheckAxiosError(error);
    }
  };

  const columns = [
    {
      field: "eventTitle",
      headerName: "Event Title",
      width: 150,
    },
    {
      field: "venueAdress",
      headerName: "Venue Adress",
      width: 200,
    },
    {
      field: "eventDate",
      headerName: "Event Date",
      width: 150,
      valueFormatter: (params) => dayjs(params.value).format("DD MMM, YYYY"),
    },
    {
      field: "eventTime",
      headerName: "Event Time",
      width: 150,
      valueFormatter: (params) => dayjs(params.value).format("h:mm A"),
    },
    {
      field: "status",
      headerName: "Status",
      editable: true,
      type: "singleSelect",
      valueOptions: ["pending", "approved", "rejected"],
      width: 150,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<Save />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              key={"1"}
              onClick={() => handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<Cancel />}
              label="Cancel"
              className="textPrimary"
              color="inherit"
              key={"2"}
              onClick={() => handleCancelClick(id)}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            key={"1"}
            color="inherit"
            onClick={() => handleEditClick(id)}
          />,
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            key={"2"}
            color="inherit"
            onClick={() => handleDeleteClick(id)}
          />,
        ];
      },
    },
  ];

  return (
    <Paper>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        processRowUpdate={processRowUpdate}
      />
    </Paper>
  );
};

export default ManageEvents;
