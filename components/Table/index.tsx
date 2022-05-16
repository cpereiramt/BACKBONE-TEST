import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import { AddCircleOutlineRounded, EditRounded } from "@material-ui/icons"
import { useRouter } from "next/router"
import React from "react"
type Props = { contacts: Record<string, any>[] }
const ContactTable = (props: Props) => {
  const router = useRouter();
     const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { contacts } = props

   const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleNewContact = () => {
    router.push('/contact/add')
  }
  const handleUpdateRow = (id: number) => {
    router.push(`/contact/edit/${id}`)
  }
  return (
    <Container maxWidth="lg">
  <Paper>
      <TableContainer style={{ cursor: 'pointer', height:"90%" }}>
      <Table aria-label="Contact table">
          <TableHead>
            <TableRow>
              <TableCell align="center"><AddCircleOutlineRounded onClick={() => handleNewContact()} /></TableCell>
            </TableRow>
          <TableRow>
            <TableCell align="center">FirstName</TableCell>
            <TableCell align="center">LastName</TableCell>
            <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts &&
            contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((contact) => (
              <TableRow
                key={contact.id}
              >
                <TableCell align="center" component="th" scope="row">
                  {contact.firstName}
                </TableCell>
                <TableCell align="center">{contact.lastName}</TableCell>
                <TableCell align="center">{contact.email}</TableCell>
                <TableCell align="center">{contact.phone}</TableCell>
                 <TableCell align="center"><EditRounded onClick={() => handleUpdateRow(contact.id)} /></TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
     <TablePagination
          rowsPerPageOptions={[ 2, 5 , 6]}
          component="div"
          count={contacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Paper>
      </Container>
  )
}

export default ContactTable;
