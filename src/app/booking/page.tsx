import DateReserve from "@/components/DateReserve";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";

export default async function Booking() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const profile = await getUserProfile(session.user.token);

    return (
        <main className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
            {/* Profile */}
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mt-10">
            
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Profile</h2>

                <div className="space-y-3">
                    <div className="text-lg">
                        <span className="font-semibold text-gray-700">Name : </span> {profile.data.name}
                    </div>
                    <div className="text-lg">
                        <span className="font-semibold text-gray-700">Email : </span> {profile.data.email}
                    </div>
                    <div className="text-lg">
                        <span className="font-semibold text-gray-700">Tel. : </span> {profile.data.tel}
                    </div>
                    <div className="text-lg">
                        <span className="font-semibold text-gray-700">Member Since : </span> {new Date(profile.data.createdAt).toLocaleDateString()}
                    </div>
                </div>
            </div>

            {/* Booking */}
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mt-10">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Reserve Your Venue</h1>
                
                <div className="bg-gray-200 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2 text-gray-700">Select Date & Location</h2>
                    <DateReserve />
                </div>

                {/* Booking Button */}
                <button 
                    className="mt-6 w-full bg-green-500 hover:bg-green-600 transition text-white font-semibold py-3 rounded-lg shadow-md text-lg">
                    Book Venue
                </button>
            </div>

           
            
        </main>
    );
}
