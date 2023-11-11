import { Button, Modal, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getUserAPI } from '../../../apis/userApi';
import { Query, QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import AddUser from './AddUser';
import { ButtonSign } from '../../../components/Button/ButtonCustom';

function createData(id, name, email, password, phone, birthday, avatar, gender, role) {
    return { id, name, email, password, phone, birthday, avatar, gender, role };
}




export default function UserManager() {
    const queryClient = useQueryClient();
    const [openAddUser,setOpenAddUser] = useState(false)
    
    
    
    const { data: dataUser = [], isLoading, error } = useQuery({
        queryKey: ["userList"],
        queryFn: getUserAPI,
    });
    
    console.log(dataUser)
    
    const handleOpenAddUser = () => {
        setOpenAddUser(true)
    }


    const handleCloseAddUser = () => {
        setOpenAddUser(false)
        queryClient.invalidateQueries('userList')
    }


    return (
        <div>
            <div style={{textAlign: 'right'}}>
                
            <ButtonSign onClick={handleOpenAddUser}>
                Thêm 
            </ButtonSign>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell >Họ và tên</TableCell>
                            <TableCell >Email</TableCell>
                            {/* <TableCell >Mật khẩu</TableCell> */}
                            {/* <TableCell >Số di động</TableCell> */}
                            <TableCell>Ngày sinh</TableCell>
                            {/* <TableCell >Hình đại diện</TableCell> */}
                            {/* <TableCell >Giới tính</TableCell> */}
                            <TableCell >Quyền</TableCell>
                            <TableCell >Chỉnh sửa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataUser.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell >{row.name}</TableCell>
                                <TableCell >{row.email}</TableCell>
                                {/* <TableCell >{row.password}</TableCell> */}
                                {/* <TableCell >{row.phone}</TableCell> */}
                                <TableCell >{row.birthday}</TableCell>
                                {/* <TableCell >{row.avatar}</TableCell> */}
                                {/* <TableCell >{row.gender}</TableCell> */}
                                <TableCell >{row.role}</TableCell>
                                <TableCell >
                                    <Button >handleOpenAddUser</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            {/* handle */}

            {/* Modal Add user  */}

            <Modal
                open={openAddUser}
                onClose={handleCloseAddUser}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <div>
                    <AddUser handleCloseAddUser={handleCloseAddUser} />
                </div>
            </Modal>

            {/* Modal Edit user  */}
            {/* <Modal
                open={openSignUp}
                onClose={handleCloseSignUp}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <div>
                    <SignUp
                        handleCloseSignUp={handleCloseSignUp}
                        handleOpenSignIn={handleOpenSignIn}
                    />
                </div>
            </Modal> */}
        </div>
    )
}
