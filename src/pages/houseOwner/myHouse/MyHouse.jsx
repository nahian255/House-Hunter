import { useEffect, useState } from "react";
import { useAuth } from "../../../provider/AuthProvider";
import { Table } from '@mantine/core';

const MyHouse = () => {
    const { user } = useAuth()
    const email = user && user.length > 0 ? user[0].email : null;
    const [data, setData] = useState('')
    console.log(data);

    useEffect(() => {
        // Assuming user.email is available in your component's state or props
        if (email) {
            fetch(`https://househunter-wj8g.onrender.com/onwer/house?email=${email}`)
                .then(response => response.json())
                .then(data => {
                    // Update state with the received booking data
                    setData(data);
                })
                .catch(error => {
                    console.error('Error retrieving booking data:', error);
                });
        }
    }, [email]);

    return (
        <div className="p-10 flex flex-col gap-2 items-center justify-center">
            <h1 className="text-4xl text-[#1f3e72] font-bold pb-4">My House</h1>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>House Name</Table.Th>
                        <Table.Th>Adress</Table.Th>
                        <Table.Th>Price</Table.Th>
                        <Table.Th>Bedrooms</Table.Th>
                        <Table.Th>Bathrooms</Table.Th>
                        <Table.Th>Cancle</Table.Th>
                        <Table.Th>Update</Table.Th>
                    </Table.Tr>

                </Table.Thead>
                <Table.Tbody>
                    {/* {
                        data?.map((item) => (
                            // console.log(item)
                            <>
                                <Table.Tr >
                                    <Table.Td>{item?.name}</Table.Td>
                                    <Table.Td>{item?.address}</Table.Td>
                                    <Table.Td>{item?.price}</Table.Td>
                                    <Table.Td>{item?.bed}</Table.Td>
                                    <Table.Td>{item?.bath}</Table.Td>
                                    <Table.Td> <button className="bg-red-400 p-1 rounded-lg"> Cancle</button> </Table.Td>
                                </Table.Tr>
                            </>
                        ))
                    } */}

                </Table.Tbody>
            </Table>


        </div>
    );
};

export default MyHouse;