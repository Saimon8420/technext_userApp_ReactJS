import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

const EachUser = () => {
    // getting routes parameter
    const params = useParams();
    // to set data
    const [user, setUser] = useState({});
    // to handle loading
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // fetching data
        const getData = async () => {
            try {
                setIsLoading(true);
                const data = await fetch(`https://dummyjson.com/users/${params?.userId}`);
                const res = await data.json();
                setUser({
                    name: await res?.firstName + " " + await res?.lastName,
                    image: await res?.image,
                    email: await res?.email,
                    company: await res?.company?.name,
                    address: await res?.address
                })
                setIsLoading(false);
            } catch (error) {
                console.log("Got Error while fetching Data: ", error.message);
            }
        }
        getData();
    }, [])

    // console.log(user);

    return (
        <div className="m-5 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">User Info</h1>
            <hr />
            {
                isLoading && <Loading />
            }

            {
                !isLoading && <h2>Hello User : {user?.name}</h2>
            }

            {
                !isLoading &&
                <div className='flex flex-col rounded-md shadow p-4 gap-2'>
                    <img className='w-1/6 rounded-lg shadow m-auto animate-bounce mt-2' src={user?.image} alt="user-image" />
                    <p>Name: {user?.name}</p>
                    <p>Email: {user?.email}</p>
                    <p>Company Name: {user?.company}</p>
                    <p>Address: {user?.address?.address}, {user?.address?.city}, {user?.address?.state}, {user?.address?.postalCode}.</p>

                    <button onClick={() => navigate("/")} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-auto">Go Back</button>
                </div>
            }
        </div>
    );
};

export default EachUser;