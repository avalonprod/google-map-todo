
import { Component } from 'react'
import { CgMathPlus } from 'react-icons/cg'


import DataList from './DataList/DataList'
import './listItem.css'



class ListItem extends Component{
    constructor(props) {
        super(props)
        this.state = {
            href: this.props.href,
            urlMarker: this.props.urlImgMarker,
            title: this.props.dataPopup.title,
            text: this.props.dataPopup.text,
            urlImg: this.props.dataPopup.urlImg,
            lat: this.props.bangalore.lat,
            lng: this.props.bangalore.lng,
            links: this.props.dataPopup.links,
        }
    }



    onChangeValue = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    element

    onChangeData = () =>{
        this.props.onChangeData({
            href: this.state.href,
            urlImgMarker: this.state.urlMarker,

            bangalore: {
                lat: +this.state.lat,
                lng: +this.state.lng
            },
            dataPopup: {
                title: this.state.title,
                text: this.state.text,
                urlImg: this.state.urlImg,
                links: [
                    ...this.state.links
                ]
            }
        })
    }

    getData = (value, id) =>{
        if(this.state.links){
            this.setState(({links}) =>({
                links: links.map((item) =>{
                    if(item.linkId === id){
                        item.url = value.url
                        item.name = value.name
                        return value
                    } else return item
                })
            }))
        }
    }

    deleteListItem = (id) =>{
        this.setState(({links}) => {
            return {
                links: links.filter(item => item.linkId !== id)
            }
        })
    }


    onAddLinks = (e) =>{
        e.preventDefault()
        let newArr = this.state.links
        let linkId = this.createId()
        newArr.push({url: '', name: '', linkId: `${linkId}`})
        this.setState({links: newArr})
    }

    createId = () =>{
        return Math.random() * (10000 - -10000) + -10000;
    }


    render() {
        const {disabled, onToggleProp, deleteItem} = this.props
        const {href, urlMarker, title, text, urlImg, lat, lng, links} = this.state
    

        let editDisplay, saveDisplay, styles
        if(disabled){
            saveDisplay = 'none'
            styles = {display: 'none'}
        } else{
            saveDisplay = 'block'
            editDisplay = 'none'
        };


        let elem
        if(links){
            elem = links.map((item, i) =>{
                let deleteItem = true
                let label =false
                if(i< 1){
                    label = true
                }
                if(i < 1 || disabled){
                    deleteItem = false
                } 
                return(
                    <DataList key={item.linkId} url={item.url} name={item.name} disabled={disabled} getData={this.getData} linkId={item.linkId} deleteItem={deleteItem} onDelete={this.deleteListItem} label={label}/>
                )
            })
        } else{
            let linkId = this.maxID++
            elem = <DataList key={linkId} url='' name='' disabled={disabled} getData={this.getData} deleteItem={deleteItem} onDelete={this.deleteListItem}/>
        }


        return(
            <div className="list__item">
                <ul className="list" >
                    <li className="item">
                        <label htmlFor="href">Href</label>
                        <input type="text" 
                            id='href'
                            value={href}
                            disabled={disabled}
                            name='href'
                            onChange={this.onChangeValue}
                        />
                    </li>
                    <li className="item">
                        <label htmlFor="url-marker">Url img marker</label>
                        <input type="text" 
                            id='url-marker'
                            value={urlMarker}
                            disabled={disabled}
                            name='urlMarker'
                            onChange={this.onChangeValue}
                        />
                    </li>
                    <li className="item">
                        <label htmlFor="title">Title</label>
                        <input type="text" 
                            id='title'
                            value={title}
                            disabled={disabled}
                            name='title'
                            onChange={this.onChangeValue}
                        />
                    </li>
                    <li className="item">
                        <label htmlFor="text">Text</label>
                        <input type="text" 
                            id='text'
                            value={text}
                            disabled={disabled}
                            name='text'
                            onChange={this.onChangeValue}
                        />
                    </li>
                    <li className="item">
                        <label htmlFor="url-img">Url img</label>
                        <input type="text" 
                            id='url-img'
                            value={urlImg}
                            disabled={disabled}
                            name='urlImg'
                            onChange={this.onChangeValue}
                        />
                    </li>
                    <li className="item">
                        <label htmlFor="lat">Lat</label>
                        <input type="number"
                            id='lat'
                            disabled={disabled}
                            name='lat'
                            onChange={this.onChangeValue}
                            value={lat}
                        />
                    </li>
                    <li className="item">
                        <label htmlFor="lng">Lng</label>
                        <input type="number" 
                            id='lng'
                            value={lng}
                            disabled={disabled}
                            name='lng'
                            onChange={this.onChangeValue}
                        />
                    </li>
                    <ul className="data__list">
                        {elem}
                    </ul>
                    <li className='item'>

                        <button className="add__list-links" style={styles} onClick={this.onAddLinks}><CgMathPlus/></button>
                        <button className='edit list__item-btn'
                            data-toggle='disabled'
                            style={{display: editDisplay}}
                            onClick={onToggleProp}
                        >Edit</button>
                        <button className='save list__item-btn'
                            data-toggle='disabled'
                            style={{display: saveDisplay}}
                            onClick={this.onChangeData}
                        >Save</button>
                        <button className="delete list__item-btn"
                            onClick={deleteItem}
                        >
                            Delete
                        </button>
                    </li>
                </ul>
            </div>
        )
    }
}



export default ListItem;