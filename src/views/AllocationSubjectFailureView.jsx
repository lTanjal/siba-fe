import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ajaxRequestErrorHandler } from "../ajax/ajaxRequestErrorHandler";
import dao from "../ajax/dao";
import Logger from "../logger/logger";
import "../styles/AllocationFailure.css";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import AlertBox from "../components/common/AlertBox";

import { GetMissingEquipment } from "../components/resultFailureReasons/GetMissingEquipment";

export const getNameForId = (array, id) => {
  if(array && array.length > 0) { 
    const foundItems = array.filter((element) => element.id == id)
    if (foundItems.length===1) {
      return foundItems[0].name; 
      Logger.debug("Found space type name: " +foundItems[0].name);
    } else {
      if(foundItems.length===0) {
        Logger.error("No item found for id: " +id);
        //console.dir(array);
      } else {
        Logger.error("More than one match found for id:" +foundItems);
        return "More than one match for id";
      }
    }
  } else {
    return "Name N/A";
  }
};

export default function AllocationSubjectFailureView() {
  const { allocId } = useParams();

  const [unAllocableSubjects, setUnAllocableSubjects] = useState([]);
  const [unAllocSubjectRooms, setUnAllocSubjectRooms] = useState([]);

  
  const [currSubjId, setCurrSubjId] = useState();
  const [unAllocSubject, setUnAllocSubject] = useState({});
  const [spaceNamesArray, setSpaceNameArray] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "Whoops!",
    severity: "error",
  });

  const getUnAlloc = async function (id) {
    const { httpStatus, data } = await dao.getUnAllocableSubjects(id);
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        "getUnAlloc",
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      Logger.debug("getUnAlloc: successfully fetched");
      setUnAllocableSubjects(data);
    }
  };

  const getUnAllocRooms = async function (id) {
    const { httpStatus, data } = await dao.getSubjectRooms(id);
    if (httpStatus !== 200) {
      ajaxRequestErrorHandler(
        httpStatus,
        "getUnAllocRooms",
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      Logger.debug("getUnAllocRooms: Subject's unalloc rooms successfully fetched");
      setUnAllocSubjectRooms(data);
      setCurrSubjId(id);
    }

    const response2 = await dao.fetchSubjectById(id);
    if (response2.httpStatus !== 200) {
      ajaxRequestErrorHandler(
        response2.httpStatus,
        "getUnAllocRooms",
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      Logger.debug("getUnAllocRooms: Subject successfully fetched");
      console.dir(response2.data);
      setUnAllocSubject(response2.data[0]);
    }

    const response3 = await dao.fetchSpacetypeForSelect();
    if (response3.httpStatus !== 200) {
      ajaxRequestErrorHandler(
        response3.httpStatus,
        "getUnAllocRooms",
        setAlertOptions,
        setAlertOpen,
      );
    } else {
      Logger.debug("getUnAllocRooms: Spacenames successfully fetched");
      setSpaceNameArray(response3.data);
    }

  };

  const handleClickOpen = (id) => () => {
    setOpen(true);
    getUnAllocRooms(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    getUnAlloc(allocId);
  }, [allocId]);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />

      <Typography sx={{ color: "#F6E9E9", margin: 2 }}>
        Unallocated lessons (Click each to see reasons for failing to allocate)
      </Typography>

      <div style={{ width: "70%", backgroundColor: "#ff1744", margin: "auto" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>The name of the lesson</TableCell>
                <TableCell>Number of people</TableCell>
                <TableCell>Space requirement (m&#178;)</TableCell>
                <TableCell>Space type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody id="setcursor">
              {unAllocableSubjects.map((row) => (
                <TableRow
                  key={row.name}
                  onClick={handleClickOpen(row.subjectId)}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.groupSize}</TableCell>
                  <TableCell>{row.area}</TableCell>
                  <TableCell>{row.spaceType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Dialog open={open} onClose={handleClose} scroll="body" maxWidth="70%">
        <DialogTitle>Suitability of the space - for lesson: {unAllocSubject.name}</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Space name</TableCell>
                  <TableCell>Equipment</TableCell>
                  <TableCell>Space size (Required: {unAllocSubject.area})</TableCell>
                  <TableCell>Number of people (Required: {unAllocSubject.groupSize})</TableCell>
                  <TableCell>Space type (Required: {getNameForId(spaceNamesArray,unAllocSubject.spaceTypeId)})</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {unAllocSubjectRooms.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>

                    <GetMissingEquipment
                      subjId={currSubjId}
                      roomId={row.id}
                      item={row.missingItems}
                    />
                    <Tooltip disableFocusListener title={`${row.area} (Required: ${unAllocSubject.area})`}>
                      {row.areaOk === 0 ? (
                        <TableCell>
                          <CloseIcon color="error" />
                        </TableCell>
                      ) : (
                        <TableCell>
                          <CheckIcon color="success" />
                        </TableCell>
                      )}
                    </Tooltip>
                    <Tooltip disableFocusListener title={`${row.personLimit} (required: ${unAllocSubject.groupSize})`}>
                      {row.personLimitOk === 0 ? (
                        <TableCell>
                          <CloseIcon color="error" />
                        </TableCell>
                      ) : (
                        <TableCell>
                          <CheckIcon color="success" />
                        </TableCell>
                      )}
                    </Tooltip>
                    <Tooltip disableFocusListener title={`${row.spaceType} (required: ${getNameForId(spaceNamesArray,unAllocSubject.spaceTypeId)})`}>
                      {row.spaceTypeOk === 0 ? (
                        <TableCell>
                          <CloseIcon color="error" />
                        </TableCell>
                      ) : (
                        <TableCell>
                          <CheckIcon color="success" />
                        </TableCell>
                      )}
                    </Tooltip>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: "#ff6d00",
              cursor: "pointer",
            }}
          >
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
