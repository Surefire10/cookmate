import { AlertTriangle } from "react-feather"

export default function NotFound(){

    return(
        <div className="flex flex-col gap-2 items-center justify-center h-screen">
            <div className="">
                <AlertTriangle stroke="white" width={200} height={50}/>
            </div>
            <div>
                Sorry&lsquo; Couldn&lsquo;t find the page you&lsquo;re looking for.
            </div>
        </div>
    )
}