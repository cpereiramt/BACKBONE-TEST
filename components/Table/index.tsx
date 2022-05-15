import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import React from "react"
type Props = { contacts: Record<string, any>[] }
const ContactTable = (props: Props) => {
     const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { contacts } = props

   const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
  <Paper>
    <TableContainer>
      <Table aria-label="Contact table">
        <TableHead>
          <TableRow>
            <TableCell>FirstName</TableCell>
            <TableCell align="right">LastName</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts &&
            contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((contact) => (
              <TableRow
                key={contact._id}
              >
                <TableCell component="th" scope="row">
                  {contact.firstName}
                </TableCell>
                <TableCell align="right">{contact.lastName}</TableCell>
                <TableCell align="right">{contact.email}</TableCell>
                <TableCell align="right">{contact.phone}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
     <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={contacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Paper>
  )
}

export default ContactTable;
