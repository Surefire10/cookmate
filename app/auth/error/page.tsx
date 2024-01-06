import { AlertTriangle } from "react-feather"

export default function Error(){

    return(
        <div className="flex flex-col gap-2 items-center justify-center h-screen">
            <div className="">
                <AlertTriangle stroke="white" width={200} height={50}/>
            </div>
            <div>
                Sorry&lsquo; This request cannot be processed right now.
            </div>
        </div>
    )
}