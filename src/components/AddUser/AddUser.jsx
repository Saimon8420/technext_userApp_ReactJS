import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {

    // states for store user data
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState({
        address: "",
        postalCode: 0,
        city: "",
    })
    const [companyName, setCompanyName] = useState("");
    // to preview image
    const [image, setImage] = useState(null);
    // save image and send to server
    const [saveImg, setSaveImg] = useState(null);

    // to navigate routes
    const navigate = useNavigate();

    // handle file upload to preview image
    const imageUpload = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            const url = URL.createObjectURL(e.target.files[0]);
            setImage(url);
            setSaveImg(e.target.files[0]);
        }
    }

    // handling form submits
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (firstName.length !== 0 && lastName.length !== 0 && email.length !== 0 && address?.address?.length !== 0 && address?.city?.length !== 0 && address?.postalCode?.length !== 0 && companyName.length !== 0 && saveImg !== null) {
            const postData = async () => {
                try {
                    const sendData = await fetch('https://dummyjson.com/users/add', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            firstName, lastName, email,
                            company: { name: companyName }, image: saveImg.name, address: { address: address.address, city: address.city, postalCode: address.postalCode }
                        }),
                    });
                    const res = await sendData.json();
                    if (res) {
                        alert(`${res.id} User Successfully Added \n
                    Name: ${res.firstName + " " + res.lastName}\n
                    `);
                        navigate("/");
                    }
                } catch (error) {
                    console.log(error.message);
                    alert(error.message);
                }
            }
            postData();
        }

        else {
            alert("All the inputs are required!!");
        }

    }

    return (
        <div className="m-4 flex flex-col gap-4 lg:mx-20 xl:mx-20">
            <h1 className="text-2xl font-bold">Add User</h1>
            <p>Fill all the user credentials</p>
            <hr />

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name Inputs */}
                <div className="flex gap-4">
                    <div className="w-full">
                        <label htmlFor="first-name" className="block text-lg font-medium leading-6 text-gray-900 text-left">
                            First Name
                        </label>
                        <div className="mt-2 rounded-md shadow-sm w-full">
                            <input
                                required
                                type="text"
                                name="first-name"
                                id="first-name"
                                className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="last-name" className="block text-lg font-medium leading-6 text-gray-900 text-left">
                            Last Name
                        </label>
                        <div className="w-full mt-2 rounded-md shadow-sm">
                            <input
                                required
                                type="text"
                                name="last-name"
                                id="last-name"
                                className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                                placeholder="Enter last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Email & companyName Inputs */}
                <div className="flex gap-4">
                    <div className="w-full">
                        <label htmlFor="email" className="block text-lg font-medium leading-6 text-gray-900 text-left">
                            Email
                        </label>
                        <div className="mt-2 rounded-md shadow-sm w-full">
                            <input
                                required
                                type="email"
                                name="email"
                                id="email"
                                className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                                placeholder="Enter email here"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="CompanyName" className="block text-lg font-medium leading-6 text-gray-900 text-left">
                            Company Name
                        </label>
                        <div className="w-full mt-2 rounded-md shadow-sm">
                            <input
                                required
                                type="text"
                                name="company-name"
                                id="company-name"
                                className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                                placeholder="Enter company name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Address Inputs */}
                <div className="flex gap-4">
                    <div className="w-full">
                        <label htmlFor="city" className="block text-lg font-medium leading-6 text-gray-900 text-left">
                            City
                        </label>
                        <div className="mt-2 rounded-md shadow-sm w-full">
                            <input
                                required
                                type="city"
                                name="city"
                                id="city"
                                className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                                placeholder="Ex: Dhaka"
                                value={address?.city}
                                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="Postal Code" className="block text-lg font-medium leading-6 text-gray-900 text-left">
                            Postal Code
                        </label>
                        <div className="w-full mt-2 rounded-md shadow-sm">
                            <input
                                required
                                type="number"
                                name="postal-code"
                                id="postal-code"
                                className="w-full rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm outline-none lg:py-2"
                                placeholder="Enter postal code"
                                value={address?.postalCode}
                                onChange={(e) => {
                                    if (e.target.value >= 0) {
                                        setAddress({ ...address, postalCode: e.target.value })
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Full Address */}
                <div>
                    <div className="w-full">
                        <label htmlFor="address" className="block text-lg font-medium leading-6 text-gray-900 text-left">
                            Full Address
                        </label>
                        <div className="mt-2 rounded-md shadow-sm w-full">
                            <textarea
                                required
                                name="full-address" id="full-address" rows="5"
                                className="w-full rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                                placeholder="House no,street no,etc..."
                                style={{ resize: "none" }}
                                value={address?.address}
                                onChange={(e) => setAddress({ ...address, address: e.target.value })}
                            >
                            </textarea>
                        </div>
                    </div>
                </div>

                {/* Upload Image */}
                <div className="border-2 border-gray-300 rounded-md shadow-sm p-4 flex flex-col gap-4">
                    <div className="w-full">
                        <label htmlFor="image" className="block text-lg font-medium leading-6 text-gray-900 text-left">
                            Upload Image
                        </label>
                        <div className="mt-2 rounded-md shadow-sm w-1/2 mx-auto">
                            <input
                                required
                                type="file"
                                name="image" id="image"
                                className="w-full rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset outline-none"
                                accept="image/*"
                                onChange={imageUpload}
                            >
                            </input>
                        </div>
                    </div>
                    <hr />

                    {/* Preview Image */}
                    <div>
                        {
                            image !== null && <img src={image} alt="" className="rounded-md w-1/2 mx-auto" />
                        }

                    </div>
                </div>
                <hr />

                {/* Buttons */}
                <div className="flex items-end justify-end gap-4 mb-4">
                    <button onClick={() => navigate("/")} className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border-2 border-indigo-600">Cancel</button>

                    <button type="submit" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border-2 border-indigo-600">Submit</button>
                </div>
            </form>

        </div>
    );
};

export default AddUser;