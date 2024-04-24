import Trash from '@/components/icon/Trash';
import Plus from '@/components/icon/Plus';
import Down from '@/components/icon/Down.js'
import { useState } from 'react';
import Up from '../icon/Up';
export default function MenuItemPriceProps({name,addLable,props,setProps}) {
    
    const [isOpen, setIsOpen] = useState(false);

    function addProps() {
        setProps(oldProps => {
            // Kiểm tra nếu oldProps không tồn tại hoặc không phải là một mảng
            if (!oldProps || !Array.isArray(oldProps)) {
                return [{ name: '', price: 0 }]; // Trả về một mảng chứa một phần tử mới
            }
            // Nếu oldProps là một mảng, sử dụng toán tử spread
            return [...oldProps, { name: '', price: 0 }];
        });
    }
    
    function editProp(ev, index, prop) {
       const newValue = ev.target.value;
       setProps(preSizes => {
            const newSizes = [...preSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
       });
    }

    function removeProp(indexToRemove) {
        setProps(prev => prev.filter((v,index) => index !== indexToRemove));
    }
    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2">
                   
                            <button type="" onClick={() => setIsOpen(prev => !prev)} className='inline-flex p-1  border-0 justify-start' type="button">
                               {isOpen && (
                                <Up/>
                               )}
                               {!isOpen && (
                                <Down/>
                               )}
                                
                                <span>{name}</span>
                                <span>({props?.length})</span>
                                </button>
                               <div className={isOpen ? 'block' : 'hidden'}>
                               {props?.length > 0 && props.map((size, index) => (
                        <div className="flex items-end gap-2" key={index}>
                            <div>
                                <label for="">Size name</label>
                                 <input type="text" placeholder="Size name"  
                                 onChange={ev => editProp(ev,index, 'name')}
                            value={size.name}/>
                            </div>
                           <div>
                            <label for="">Extra price</label>
                            <input type="text" placeholder="Extra price" 
                             value={size.price}
                             onChange={ev => editProp(ev,index, 'price')}
                             />
                             
                             
                           </div>
                           <div>
                             <button
                             onClick={() => removeProp(index)}
                              type="button" className="bg-white mb-2 px-2"><Trash/></button> 
                             </div>
                        </div>
                    ))}

                    <button className="bg-white" type="button" onClick={addProps}><Plus/>
                    <label className='mt-1'>{addLable}</label>
                    </button>
                               </div>
                        
                        
                    
                   
                </div>
    );
}