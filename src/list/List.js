import ListItem from '../listItem/ListItem';





const List =  ({data, onToggleProp, deleteItem, onChangeData, privateProps}) =>{

    let element
    if(!data || data.length < 1){
        element = "  Нет Данных"
    } else {
        element = data.map(item =>{
           if(item && privateProps === item.private) {
               const {id, ...itemProps} = item
               const subFunction = (data) =>{
                   onChangeData(data, id)
               }
               return(
                   <ListItem {...itemProps} 
                       deleteItem={() => deleteItem(id)}
                       key={id}
                       onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
                       onChangeData={subFunction}
                   />
               )
           } 
       })
   }

    return(
        <div className="list-wrapper">
            {element}
        </div>
    );
};

export default List;
