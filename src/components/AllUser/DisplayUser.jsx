import { useEffect } from "react";
import { useState } from "react";
import UserInfo from "./UserInfo";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";

const DisplayUser = () => {
    // to set usersData
    const [users, setUsers] = useState([]);
    // get search value
    const [searchVal, setSearchVal] = useState("");
    // to handle loading
    const [isLoading, setIsLoading] = useState(false);

    // to navigate routes
    const navigate = useNavigate();

    useEffect(() => {
        //fetching data
        const getUsers = async () => {
            try {
                setIsLoading(true);
                const data = await fetch("https://dummyjson.com/users?limit=100");
                const res = await data.json();

                let allUser = [];
                // modifying response
                await res?.users?.map(each =>
                    allUser.push({
                        id: each?.id,
                        name: each?.firstName + " " + each?.lastName,
                        address: each?.address,
                        image: each?.image,
                        email: each?.email,
                        company: each?.company?.name,
                    })
                )
                setUsers(allUser);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        getUsers();
    }, [])

    // to stored sortedValues
    const [sortedUser, setSortedUser] = useState([]);

    // checked state
    const [defaultCheck, setDefaultCheck] = useState(true);
    const [nameCheck, setNameCheck] = useState(false);
    const [emailCheck, setEmailCheck] = useState(false);
    const [companyCheck, setCompanyCheck] = useState(false);

    const defaultSorted = () => {
        setSortedUser(users);
    }

    const sortByName = () => {
        setSortedUser(users);
        const nameSorted = users.toSorted((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            return 0;
        });
        setSortedUser(nameSorted);
    }

    const sortByEmail = () => {
        setSortedUser(users);
        const emailSorted = users.toSorted((a, b) => {
            const nameA = a.email.toLowerCase();
            const nameB = b.email.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            return 0;
        });
        setSortedUser(emailSorted);
    }

    const sortByCompanyName = () => {
        setSortedUser(users);
        const companySorted = users.toSorted((a, b) => {
            const nameA = a.company.toLowerCase();
            const nameB = b.company.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            return 0;
        });
        setSortedUser(companySorted);
    }

    return (
        <div className="m-5 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Users List</h1>
            <hr />

            <div className="flex items-center justify-between gap-1">

                {/* filter Option */}
                <div className="flex-1 flex flex-col gap-1 border-r-2">
                    <h1 className="text-gray-900 text-left mb-2 text-xl font-bold">Sort User:</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md-grid-cols-2 lg:grid-cols-4 xl-grid-cols-4 items-start justify-evenly gap-4">
                        <div className="flex gap-2">
                            <input type="checkbox" name="default" id="default" checked={defaultCheck}
                                onChange={() => {
                                    setDefaultCheck(true);
                                    setEmailCheck(false);
                                    setNameCheck(false);
                                    setCompanyCheck(false);
                                    defaultSorted();
                                }}
                            />
                            <label className="text-sm font-bold" htmlFor="default">Default</label>
                        </div>

                        <div className="flex gap-2">
                            <input type="checkbox" name="nameCheck" id="nameCheck" checked={nameCheck}
                                onChange={() => {
                                    setDefaultCheck(false);
                                    setEmailCheck(false);
                                    setNameCheck(true);
                                    setCompanyCheck(false);
                                    sortByName();
                                }}
                            />
                            <label className="text-sm font-bold" htmlFor="nameCheck">Name : [a to z]</label>
                        </div>

                        <div className="flex gap-2">
                            <input type="checkbox" name="emailCheck" id="emailCheck" checked={emailCheck}
                                onChange={() => {
                                    setDefaultCheck(false);
                                    setEmailCheck(true);
                                    setNameCheck(false);
                                    setCompanyCheck(false);
                                    sortByEmail();
                                }}
                            />
                            <label className="text-sm font-bold" htmlFor="emailCheck">Email : [a to z]</label>
                        </div>

                        <div className="flex gap-2">
                            <input type="checkbox" name="companyCheck" id="companyCheck" checked={companyCheck} onChange={() => {
                                setDefaultCheck(false);
                                setEmailCheck(false);
                                setNameCheck(false);
                                setCompanyCheck(true);
                                sortByCompanyName();
                            }} />
                            <label className="text-sm font-bold" htmlFor="companyCheck">Company Name : [a to z]</label>
                        </div>
                    </div>
                </div>

                {/* Add User */}
                <div className="w-fit">
                    <button className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border-2 border-indigo-600 flex items-center gap-2 mx-auto" onClick={() => navigate("/addUser")}>Add User <span className="text-2xl">+</span></button>
                </div>

            </div>
            <hr />

            {/* Search User */}
            <div>
                <label htmlFor="price" className="block text-lg leading-6 text-gray-900 text-left mb-2 font-bold">
                    Search User:
                </label>
                <input
                    type="text"
                    name="searchValue"
                    id="searchValue"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                    placeholder="Search user by name"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                />
            </div>
            <hr />

            {
                isLoading && <Loading />
            }
            {
                !isLoading &&
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                    {
                        sortedUser.length === 0 ?
                            users
                                .filter((user) =>
                                    user?.name.toLowerCase().includes(searchVal.toLowerCase())
                                )
                                .map((user) => (
                                    <UserInfo key={user?.id} value={user} />
                                ))
                            :
                            sortedUser
                                .filter((user) =>
                                    user?.name.toLowerCase().includes(searchVal.toLowerCase())
                                )
                                .map((user) => (
                                    <UserInfo key={user?.id} value={user} />
                                ))
                    }
                </div>
            }
        </div>
    );
};

export default DisplayUser;