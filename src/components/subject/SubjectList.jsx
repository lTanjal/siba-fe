import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import styled from "@mui/material/styles/styled";
import { useState } from "react";
import { checkForUserPrograms } from "../../hooks/checkForUserPrograms";
import SingleSubjectDialog from "./SingleSubjectDialog";

export default function SubjectList({
  shownSubject,
  getAllSubjects,
  paginateSubjects,
  userPrograms,
}) {
  const [open, setOpen] = useState(false);
  const [singleSubject, setSingleSubject] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("SubjectName");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedSubjects = paginateSubjects.sort((a, b) => {
    switch (orderBy) {
      case "icon":
        return order === "asc"
          ? checkForUserPrograms(a) === checkForUserPrograms(b)
            ? 0
            : checkForUserPrograms(a)
            ? -1
            : 1
          : checkForUserPrograms(a) === checkForUserPrograms(b)
          ? 0
          : checkForUserPrograms(a)
          ? 1
          : -1;
      case "name":
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      case "groupSize":
        return order === "asc"
          ? a.groupSize - b.groupSize
          : b.groupSize - a.groupSize;
      case "groupCount":
        return order === "asc"
          ? a.groupCount - b.groupCount
          : b.groupCount - a.groupCount;
      case "sessionLength":
        return order === "asc"
          ? a.sessionLength - b.sessionLength
          : b.sessionLength - a.sessionLength;
      case "programName":
        return order === "asc"
          ? a.programName.localeCompare(b.programName)
          : b.programName.localeCompare(a.programName);
      case "spaceTypeName":
        return order === "asc"
          ? a.spaceTypeName.localeCompare(b.spaceTypeName)
          : b.spaceTypeName.localeCompare(a.spaceTypeName);
      default:
        return 0;
    }
  });

  // STYLE
  const Box = styled(Table)(({ theme }) => ({
    overflow: "auto",
    borderCollapse: "collapse",
  }));
  return (
    <div>
      <SingleSubjectDialog
        open={open}
        setOpen={setOpen}
        singleSubject={singleSubject}
        setSingleSubject={setSingleSubject}
        getAllSubjects={getAllSubjects}
        userPrograms={userPrograms}
      />
      <Box>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "programId"}
                      direction={order}
                      onClick={() => handleRequestSort("icon")}
                    />
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "name"}
                      direction={order}
                      onClick={() => handleRequestSort("name")}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "groupSize"}
                      direction={order}
                      onClick={() => handleRequestSort("groupSize")}
                    >
                      Group Size
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "groupCount"}
                      direction={order}
                      onClick={() => handleRequestSort("groupCount")}
                    >
                      Group Count
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "sessionLength"}
                      direction={order}
                      onClick={() => handleRequestSort("sessionLength")}
                    >
                      Lesson Length
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "programName"}
                      direction={order}
                      onClick={() => handleRequestSort("programName")}
                    >
                      Program
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "spaceTypeName"}
                      direction={order}
                      onClick={() => handleRequestSort("spaceTypeName")}
                    >
                      Space Type
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedSubjects.map((value) => (
                  <TableRow key={value.id}>
                    <TableCell>
                      {checkForUserPrograms(value, userPrograms) ? (
                        <IconButton
                          onClick={() => {
                            setSingleSubject(value);
                            setOpen(true);
                          }}
                          aria-label="Open Info"
                        >
                          <BuildCircleIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => {
                            setSingleSubject(value);
                            setOpen(true);
                          }}
                          aria-label="Open Info"
                        >
                          <InfoIcon />
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell>{value.name}</TableCell>
                    <TableCell>{value.groupSize}</TableCell>
                    <TableCell>{value.groupCount}</TableCell>
                    <TableCell>{value.sessionLength}</TableCell>
                    <TableCell>{value.programName}</TableCell>
                    <TableCell>{value.spaceTypeName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
}
