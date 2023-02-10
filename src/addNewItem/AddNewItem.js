import { Component } from 'react'

import {CgMathPlus} from 'react-icons/cg'

import DataList from '../listItem/DataList/DataList';

import './addNewItem.css'


class AddNewItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            href: '',
            urlMarker: '',
            title: '',
            text: '',
            urlImg: '',
            lat: 0,
            lng: 0,
            
            links: [
                {url: '', name: ''}
            ]
        }
    }
    changeValue = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    onAddItem = (e) =>{
        e.preventDefault()
        this.props.onAddData({
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
                links: this.state.links
            }
        })
        this.setState({
            href: '',
            urlMarker: '',
            title: '',
            text: '',
            urlImg: '',
            lat: 0,
            lng: 0,
            links: [
                {url: '', name: ''}
            ]
        })
    }

    createId = () =>{
        return Math.random() * (10000 - -10000) + -10000;
    }

    getData = (value, id) =>{
        if(this.state.links){
            this.state.links.map(item =>{
                if(id === item.linkId){
                    item.url = value.url
                    item.name = value.name
                    return item
                } else return item
            })
        }
    }

    onAddLinks = (e) =>{
        e.preventDefault()
        let newArr = this.state.links
        let linkId = this.createId()
        newArr.push({url: '', name: '', linkId: `${linkId}`})
        this.setState({links: newArr})
    }
    
/* fsdbgnhmjgl;,hfknjbd hdjvgdjbfknglmh;,'''''' ksfn,dnt;kmehiprgbouewjsvnltnejoihprgobuelnwksm.vfnivougevwabsd */

    deleteListItem = (id) =>{
        this.setState(({links}) => {
            return {
                links: links.filter(item => item.linkId !== id)
            }
        })
    }
    

    render() {  
        const {href, urlMarker, title, text, urlImg, lat, lng, links} = this.state



        const elem = links.map((item, i) =>{
            let deleteItem;
            let label =false
            if(i< 1){
                label = true
            }
            if(i < 1){
                deleteItem = false;
            } else {deleteItem = true}
            if(!item.linkId){
                item.linkId = `${this.createId()}`
            }
            return(
                <DataList url={item.url} name={item.name} key={item.linkId} linkId={item.linkId} getData={this.getData} deleteItem={deleteItem} onDelete={this.deleteListItem} label={label}/>
            )
        })


        return(
            <div className="add__item">
                <form action="" >
                <ul className="list">
                    <li className="item">
                        <label htmlFor="href">Href</label>
                        <input type="text" id="href"
                            placeholder='href'
                            name='href'
                            value={href}
                            onChange={this.changeValue}
                        />
                    </li>
                    <li className="item">
                        <label htmlFor="url-marker">Url img marker</label>
                        <input type="text" id="url-marker"
                            placeholder='url-marker'
                            name='urlMarker'
                            value={urlMarker}
                            onChange={this.changeValue}
                        />
                    </li>
                    <li className="item">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title"
                            placeholder='title'
                            name='title'
                            value={title}
                            onChange={this.changeValue}
                        />
                    </li>
                    <li className="item">
                        <label htmlFor="text">Text</label>
                        <input type="text" id="text"
                            placeholder='text'
                            name='text'
                            value={text}
                            onChange={this.changeValue}
                        />
                    </li>
                    <li className="item">
                        <label htmlFor="url-img">Url img</label>
                        <input type="text" id="url-img"
                            placeholder='url-img'
                            name='urlImg'
                            value={urlImg}
                            onChange={this.changeValue}
                        />
                    </li>
                    <li className="item">
                        <label htmlFor="lat">Lat</label>
                        <input type="number" id="lat"
                            placeholder='lat'
                            name='lat'
                            value={lat}
                            onChange={this.changeValue}
                        />
                    </li>
                    <li className="item">
                        <label htmlFor="lng">Lng</label>
                        <input type="number" id="lng"
                            placeholder='lng'
                            name='lng'
                            value={lng}
                            onChange={this.changeValue}
                        />
                    </li>
                    <ul className="data__list">
                        {elem}
                    </ul>
                    <li className='buttons__block'>
                        <button className='add__item-button' onClick={this.onAddItem}>Save</button>
                        <button className="add__list-links" onClick={this.onAddLinks}><CgMathPlus/></button>
                    </li>
                </ul>
                </form>
            </div>
        )
    }
}


export default AddNewItem