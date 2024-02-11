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
                const data = await fetch("https://dummyjson.com/users?limit=100", { cache: "no-cache" });
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

    // console.log(users);

    return (
        <div className="m-5 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Users List</h1>
            <hr />
            <div className="flex justify-end">
                <button className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border-2 border-indigo-600 flex items-center gap-2" onClick={() => navigate("/addUser")}>Add User <span className="text-2xl">+</span></button>
            </div>

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
                        users
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