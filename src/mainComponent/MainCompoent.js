import { useEffect, useState } from "react";
import axios from 'axios'


import List from "../list/List";
import AddNewItem from "../addNewItem/AddNewItem";
import Wrapper from "../wrapper/Wrapper";




const MainComponent = (props) =>{
    const {privateProps} = props

    const [useData, setData] = useState()
    const [loaded] = useState(false)
    useEffect(() =>{
        axios({
            url: 'https://google-map-prod.onrender.com/api/get-pages-data',
            headers:{
                'Content-Type': 'application/json',
            }
        })
        .then(data => {
            setData(data.data);
            onCreateData(data.data)
        })
        .catch(error => console.log(error))
    }, [loaded])

    const onCreateData = (data) =>{
        if(data || data.length > 0){
            data.map(item => {
                return item.disabled = true
            })
        }
    }



    const onAddData = (data) =>{
        data.private = privateProps
        axios.post('https://google-map-prod.onrender.com/api/post-pages-data', {
            ...data 
          })
        .then(function (response) {
            data.id = response.data.InsertedID
            data.disabled = true
            if(useData){
                let newData = [...useData, data]
                setData(newData)
            } else setData(data)
        });
    }

    const onToggleProp = (id, prop) =>{
        if(useData || useData.length > 0){
            setData(
                useData.map(item => {
                    if(item.id === id){
                        return item = {...item, [prop]: !item[prop]} 
                    } else return item
                })
            )
        }
    }

    const onChangeData = (data, id) =>{
        setData( 
            useData.map((item) => {
                if(item.id === id){
                    data.disabled = true
                    data.id = id
                    data.private = privateProps
                    onChangeDataReq(data)
                    return data
                } else return item
            })
        )
    }

    const onChangeDataReq = async (data) =>{
        await axios.patch('https://google-map-prod.onrender.com/api/update-page-data', {
            ...data
        })
    }


    const deleteItem = (id)=> {
        setData(
            useData.filter(item => item.id !== id)
        )
        axios({
            method: 'delete',
            url: 'https://google-map-prod.onrender.com/api/delete-page-id',
            headers:{
                'Content-Type': 'application/json',
            },
            data: `${id}`
        })
    }
    if(useData === null){
        setData([])
    }

    return(
        <div className="app">
            <Wrapper>
                <List data={useData} onToggleProp={onToggleProp} deleteItem={deleteItem} onChangeData={onChangeData} privateProps={privateProps}/>
                <AddNewItem onAddData={onAddData}/>
            </Wrapper>
        </div>
    )
  
}

export default MainComponent;
