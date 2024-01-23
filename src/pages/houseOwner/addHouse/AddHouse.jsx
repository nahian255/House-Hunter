import { useState } from "react";
import { Input } from '@mantine/core';
import { useAuth } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const AddHouse = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const email = user && user.length > 0 ? user[0].email : null;
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [bed, setBed] = useState('');
    const [bath, setBath] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    console.log(email);

    const handelSubmit = async () => {
        if (!user) {
            return alert('Please login First')
        }

        if (name && address && bed && bath && image && price && description) {

            const fromData = {
                name,
                email,
                address,
                bed,
                bath,
                image,
                price,
                description
            };
            try {
                const response = await fetch('http://localhost:3000/onwer/added-house', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(fromData),
                });
                if (response.ok) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "House Added Succesfull",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/owner/my-house')
                } else {
                    console.error('Failed to submit form data:', response.statusText);
                }
            } catch (error) {
                console.error('Error submitting form data:', error.message);
            }
        } else {
            alert('Form submit failed. Please check the form for errors.');

        }

    }

    return (
        <div className="p-10 flex flex-col gap-2 items-center justify-center">
            <h1 className="text-4xl text-[#1f3e72] font-bold pb-4">Add House</h1>
            {/* Input fields for the form */}
            <div className=' w-full lg:w-1/2'>
                <div className=' w-full'>
                    <label className='text-start text-xl text-[#1f3e72] font-sans'> Name :</label>
                    <Input
                        size="md"
                        radius="md"
                        placeholder="Enter House name"
                        value={name}
                        className='w-full'
                        onChange={(e) => { setName(e.target.value) }}
                        required
                    />
                </div>
                <div className=' w-full'>
                    <label className='text-start text-xl text-[#1f3e72] font-sans'> Address :</label>
                    <Input
                        size="md"
                        radius="md"
                        placeholder="Enter House Address"
                        value={address}
                        className='w-full'
                        onChange={(e) => { setAddress(e.target.value) }}
                        required
                    />
                </div>
                <div className=' w-full'>
                    <label className='text-start text-xl text-[#1f3e72] font-sans'> Bedrooms :</label>
                    <Input
                        size="md"
                        radius="md"
                        placeholder="Enter Bedrooms Qun"
                        value={bed}
                        className='w-full'
                        onChange={(e) => { setBed(e.target.value) }}
                        required
                    />
                </div>
                <div className=' w-full'>
                    <label className='text-start text-xl text-[#1f3e72] font-sans'> Bathrooms :</label>
                    <Input
                        size="md"
                        radius="md"
                        placeholder="Enter Bathrooms Qun"
                        value={bath}
                        className='w-full'
                        onChange={(e) => { setBath(e.target.value) }}
                        required
                    />
                </div>
                <div className=' w-full'>
                    <label className='text-start text-xl text-[#1f3e72] font-sans'> Image Url :</label>
                    <Input
                        size="md"
                        radius="md"
                        placeholder="Enter Image Url"
                        value={image}
                        className='w-full'
                        onChange={(e) => { setImage(e.target.value) }}
                        required
                    />
                </div>
                <div className=' w-full'>
                    <label className='text-start text-xl text-[#1f3e72] font-sans'> Rent per Month :</label>
                    <Input
                        size="md"
                        radius="md"
                        placeholder="Enter Price in TK"
                        value={price}
                        className='w-full'
                        onChange={(e) => { setPrice(e.target.value) }}
                        required
                    />
                </div>
                <div className=' w-full'>
                    <label className='text-start text-xl text-[#1f3e72] font-sans'> Description :</label>
                    <Input
                        size="md"
                        radius="md"
                        placeholder="Enter Description"
                        value={description}
                        className='w-full'
                        onChange={(e) => { setDescription(e.target.value) }}
                        required
                    />
                </div>

            </div>
            <div className=' py-4'>
                <button onClick={handelSubmit} className="bg-[#1f3e72] hover:bg-blue-700 w-80  text-white p-2 rounded-md "> Submit</button>
            </div>

        </div>
    );
};

export default AddHouse;