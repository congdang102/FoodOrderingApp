import { useState } from "react";

export default function DeleteButton({label,onDelete}) {
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    if(showConfirmDelete) {
        return(
            <div className="fixed bg-black/80 inset-0 flex items-center justify-center h-full">
                 <div className=" bg-white p-4 rounded-lg">
                <div >
                    Do you want to delete this item?
                </div>
              <div className="flex gap-2 mt-1">
                <button type="button" onClick={() => setShowConfirmDelete(false)}>Cancle</button>
                <button type="button" onClick={() => {onDelete(); setShowConfirmDelete(false);}} className="bg-red-500">Yes, &nbsp; delete!</button>
            </div>
        </div>
            </div>
           
          
        );
    }

    return (
        
        <button type="button" onClick={() => setShowConfirmDelete(true)}>
            {label}
        </button>
    );
}